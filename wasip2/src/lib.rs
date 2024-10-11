use futures::{SinkExt, StreamExt};
use spin_sdk::{
    http::{self, Headers, IncomingResponse, Method, OutgoingResponse, Request, ResponseOutparam},
    http_component, variables,
};

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
            // Pipe the request body to the OpenAI API and stream the response back to the client

            match proxy_openai(request).await {
                Ok(incoming_response) => {
                    let mut incoming_response_body = incoming_response.take_body_stream();

                    let outgoing_response = OutgoingResponse::new(headers);
                    let mut outgoing_response_body = outgoing_response.take_body();

                    // Send the response headers back to the client
                    response_out.set(outgoing_response);

                    // Stream the OpenAI response chunks back to the client
                    while let Some(chunk) = incoming_response_body.next().await {
                        if let Err(e) = outgoing_response_body.send(chunk.unwrap()).await {
                            eprintln!("Error sending response chunk: {e}");
                            return;
                        }
                    }
                }
                Err(_e) => {
                    server_error(response_out);
                }
            }
        }
        // Handle GET requests to return a simple HTML page
        (Method::Get, _) => {
            let response = OutgoingResponse::new(Headers::new());
            response.set_status_code(200).unwrap();

            // Return a basic HTML page
            let body_content = b"<html><body><h1>Proxy OpenAI API</h1></body></html>";
            let mut body = response.take_body();
            if let Err(e) = body.send(body_content.to_vec()).await {
                eprintln!("Error writing body content: {e}");
                server_error(response_out);
                return;
            }

            response_out.set(response);
        }
        // Return 405 for other methods
        _ => {
            eprintln!("Method not allowed");
            method_not_allowed(response_out);
        }
    }
}

// Function to handle the actual proxy logic
async fn proxy_openai(incoming_request: Request) -> anyhow::Result<IncomingResponse> {
    // Prepare the outgoing request to OpenAI API
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

    // Send the outgoing request to the OpenAI API
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
