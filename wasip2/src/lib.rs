use futures::{SinkExt, StreamExt};
use spin_sdk::{
    http::{self, Headers, IncomingResponse, Method, OutgoingResponse, Request, ResponseOutparam},
    http_component, variables,
};
use serde_json::Value;

#[http_component]
async fn handle_request(request: Request, response_out: ResponseOutparam) {
    let headers = Headers::from_list(&[
        (
            "Access-Control-Allow-Origin".to_string(),
            "*".to_string().into_bytes(),
        ),
        (
            "Access-Control-Allow-Methods".to_string(),
            "POST, GET, OPTIONS".to_string().into_bytes(),
        ),
        (
            "Access-Control-Allow-Headers".to_string(),
            "Content-Type, Authorization".to_string().into_bytes(),
        ),
    ])
    .unwrap();
    match (request.method(), request.path_and_query().as_deref()) {
        (Method::Options, Some("/proxy-openai")) => {
            let response = OutgoingResponse::new(headers);
            response.set_status_code(200).unwrap();
            response_out.set(response);
        }
        (Method::Post, Some("/proxy-openai")) => {
            match proxy_openai(request).await {
                Ok(incoming_response) => {
                    let mut incoming_response_body = incoming_response.take_body_stream();
                    let outgoing_response = OutgoingResponse::new(headers);
                    let mut outgoing_response_body = outgoing_response.take_body();

                    response_out.set(outgoing_response);

                    let mut complete_response = String::new();
                    let mut completion_id = String::new();
                    let mut usage_info: Option<Value> = None;

                    // Stream the OpenAI response chunks back to the client
                    while let Some(chunk) = incoming_response_body.next().await {
                        match chunk {
                            Ok(data) => {
                                // Clone the chunk for further processing to avoid move errors
                                let data_clone = data.clone();

                                // Convert the chunk to a string
                                if let Ok(chunk_str) = String::from_utf8(data_clone) {
                                    // Split the chunk string by lines
                                    for line in chunk_str.lines() {
                                        if line.starts_with("data: ") {
                                            let json_str = &line[6..];
                                            if json_str.trim() == "[DONE]" {
                                                break;
                                            }
                                            complete_response.push_str(json_str);
                                            complete_response.push('\n');

                                            // Extract completion ID from the first chunk containing metadata
                                            if completion_id.is_empty() {
                                                if let Ok(json_value) = serde_json::from_str::<Value>(json_str) {
                                                    if let Some(id) = json_value.get("id").and_then(Value::as_str) {
                                                        completion_id = id.to_string();
                                                    }
                                                }
                                            }

                                            // Extract usage information if present
                                            if let Ok(json_value) = serde_json::from_str::<Value>(json_str) {
                                                let usage_info_in_json = json_value.get("usage");
                                                if usage_info_in_json.is_some() {
                                                    usage_info = json_value.get("usage").cloned();
                                                }
                                            }
                                        }
                                    }
                                }

                                // Stream the response chunk back to the client
                                if let Err(e) = outgoing_response_body.send(data).await {
                                    eprintln!("Error sending response chunk: {e}");
                                    return;
                                }
                            }
                            Err(e) => {
                                eprintln!("Error reading response chunk: {e}");
                                return;
                            }
                        }
                    }

                    // Log usage information if available
                    if let Some(usage) = usage_info {
                        if let Some(total_tokens) = usage.get("total_tokens") {
                            let total_tokens = total_tokens.as_u64().unwrap_or(0);
                            let model = usage.get("model").and_then(Value::as_str).unwrap_or("gpt-3.5-turbo");

                            // Calculate the cost based on the model used
                            let cost_per_1k_tokens = match model {
                                "gpt-4" => 0.03,
                                _ => 0.002,
                            };
                            let cost = (total_tokens as f64 / 1000.0) * cost_per_1k_tokens;

                            // Log the token usage and cost
                            eprintln!("Total tokens used: {}", total_tokens);
                            eprintln!("Model: {}", model);
                            eprintln!("Cost for this request: ${:.4}", cost);
                        }
                    }
                }
                Err(_e) => {
                    server_error(response_out);
                }
            }
        }
        (Method::Get, _) => {
            let response = OutgoingResponse::new(Headers::new());
            response.set_status_code(200).unwrap();

            let body_content = b"<html><body><h1>Proxy OpenAI API</h1></body></html>";
            let mut body = response.take_body();
            if let Err(e) = body.send(body_content.to_vec()).await {
                eprintln!("Error writing body content: {e}");
                server_error(response_out);
                return;
            }

            response_out.set(response);
        }
        _ => {
            eprintln!("Method not allowed");
            method_not_allowed(response_out);
        }
    }
}

// Function to handle the actual proxy logic
async fn proxy_openai(incoming_request: Request) -> anyhow::Result<IncomingResponse> {
    let outgoing_request = Request::builder()
        .method(Method::Post)
        .uri("https://api.openai.com/v1/chat/completions")
        .header(
            "Authorization",
            format!("Bearer {}", variables::get("openai_api_key").unwrap()),
        )
        .header("Content-Type", "application/json")
        .body(incoming_request.into_body())
        .build();

    let response = match http::send::<_, IncomingResponse>(outgoing_request).await {
        Ok(resp) => resp,
        Err(e) => {
            eprintln!("Error sending request to OpenAI: {e}");
            return Err(anyhow::anyhow!("Error sending request to OpenAI: {e}"));
        }
    };

    Ok(response)
}

// Helper functions for error responses
fn server_error(response_out: ResponseOutparam) {
    eprintln!("Internal server error");
    respond(500, response_out)
}

fn method_not_allowed(response_out: ResponseOutparam) {
    eprintln!("Method not allowed");
    respond(405, response_out)
}

fn respond(status: u16, response_out: ResponseOutparam) {
    let response = OutgoingResponse::new(Headers::new());
    response.set_status_code(status).unwrap();

    response_out.set(response);
}
