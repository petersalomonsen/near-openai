use serde_json::json;
use spin_test_sdk::{
    bindings::{
        fermyon::{spin_test_virt, spin_wasi_virt::http_handler},
        wasi::{self, http},
    },
    spin_test,
};

#[spin_test]
fn test_hello_api() {
    // Perform the request
    let request = http::types::OutgoingRequest::new(http::types::Headers::new());
    request.set_path_with_query(Some("/")).unwrap();
    let response = spin_test_sdk::perform_request(request);

    // Assert response status and body is 404
    assert_eq!(response.status(), 200);
    assert!(response
        .body_as_string()
        .unwrap()
        .contains("Proxy OpenAI API"));
}

#[spin_test]
fn openai_request() {
    spin_test_virt::variables::set("openai_api_key", "hello");

    let openai_response = http::types::OutgoingResponse::new(http::types::Headers::new());
    openai_response.write_body("data: {\"id\":\"chatcmpl-AMaFCyZmtLWFTUrXg0ZyEI9gz0wbj\",\"object\":\"chat.completion.chunk\",\"created\":1729945902,\"model\":\"gpt-4o-2024-08-06\",\"system_fingerprint\":\"fp_72bbfa6014\",\"choices\":[{\"index\":0,\"delta\":{\"role\":\"assistant\",\"content\":\"\",\"refusal\":null},\"logprobs\":null,\"finish_reason\":null}],\"usage\":null}\n\ndata: {\"id\":\"chatcmpl-AMaFCyZmtLWFTUrXg0ZyEI9gz0wbj\",\"object\":\"chat.completion.chunk\",\"created\":1729945902,\"model\":\"gpt-4o-2024-08-06\",\"system_fingerprint\":\"fp_72bbfa6014\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"Hello\"},\"logprobs\":null,\"finish_reason\":null}],\"usage\":null}\n\n
data: {\"id\":\"chatcmpl-AMaFCyZmtLWFTUrXg0ZyEI9gz0wbj\",\"object\":\"chat.completion.chunk\",\"created\":1729945902,\"model\":\"gpt-4o-2024-08-06\",\"system_fingerprint\":\"fp_72bbfa6014\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"!\"},\"logprobs\":null,\"finish_reason\":null}],\"usage\":null}\n\ndata: {\"id\":\"chatcmpl-AMaFCyZmtLWFTUrXg0ZyEI9gz0wbj\",\"object\":\"chat.completion.chunk\",\"created\":1729945902,\"model\":\"gpt-4o-2024-08-06\",\"system_fingerprint\":\"fp_72bbfa6014\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\" How\"},\"logprobs\":null,\"finish_reason\":null}],\"usage\":null}\n\n
data: {\"id\":\"chatcmpl-AMaFCyZmtLWFTUrXg0ZyEI9gz0wbj\",\"object\":\"chat.completion.chunk\",\"created\":1729945902,\"model\":\"gpt-4o-2024-08-06\",\"system_fingerprint\":\"fp_72bbfa6014\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\" can\"},\"logprobs\":null,\"finish_reason\":null}],\"usage\":null}\n\ndata: {\"id\":\"chatcmpl-AMaFCyZmtLWFTUrXg0ZyEI9gz0wbj\",\"object\":\"chat.completion.chunk\",\"created\":1729945902,\"model\":\"gpt-4o-2024-08-06\",\"system_fingerprint\":\"fp_72bbfa6014\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\" I\"},\"logprobs\":null,\"finish_reason\":null}],\"usage\":null}\n\n
data: {\"id\":\"chatcmpl-AMaFCyZmtLWFTUrXg0ZyEI9gz0wbj\",\"object\":\"chat.completion.chunk\",\"created\":1729945902,\"model\":\"gpt-4o-2024-08-06\",\"system_fingerprint\":\"fp_72bbfa6014\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\" assist\"},\"logprobs\":null,\"finish_reason\":null}],\"usage\":null}\n\ndata: {\"id\":\"chatcmpl-AMaFCyZmtLWFTUrXg0ZyEI9gz0wbj\",\"object\":\"chat.completion.chunk\",\"created\":1729945902,\"model\":\"gpt-4o-2024-08-06\",\"system_fingerprint\":\"fp_72bbfa6014\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\" you\"},\"logprobs\":null,\"finish_reason\":null}],\"usage\":null}\n\n
data: {\"id\":\"chatcmpl-AMaFCyZmtLWFTUrXg0ZyEI9gz0wbj\",\"object\":\"chat.completion.chunk\",\"created\":1729945902,\"model\":\"gpt-4o-2024-08-06\",\"system_fingerprint\":\"fp_72bbfa6014\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\" today\"},\"logprobs\":null,\"finish_reason\":null}],\"usage\":null}\n\ndata: {\"id\":\"chatcmpl-AMaFCyZmtLWFTUrXg0ZyEI9gz0wbj\",\"object\":\"chat.completion.chunk\",\"created\":1729945902,\"model\":\"gpt-4o-2024-08-06\",\"system_fingerprint\":\"fp_72bbfa6014\",\"choices\":[{\"index\":0,\"delta\":{\"content\":\"?\"},\"logprobs\":null,\"finish_reason\":null}],\"usage\":null}\n\ndata: {\"id\":\"chatcmpl-AMaFCyZmtLWFTUrXg0ZyEI9gz0wbj\",\"object\":\"chat.completion.chunk\",\"created\":1729945902,\"model\":\"gpt-4o-2024-08-06\",\"system_fingerprint\":\"fp_72bbfa6014\",\"choices\":[{\"index\":0,\"delta\":{},\"logprobs\":null,\"finish_reason\":\"stop\"}],\"usage\":null}\n\ndata: {\"id\":\"chatcmpl-AMaFCyZmtLWFTUrXg0ZyEI9gz0wbj\",\"object\":\"chat.completion.chunk\",\"created\":1729945902,\"model\":\"gpt-4o-2024-08-06\",\"system_fingerprint\":\"fp_72bbfa6014\",\"choices\":[],\"usage\":{\"prompt_tokens\":18,\"completion_tokens\":9,\"total_tokens\":27,\"prompt_tokens_details\":{\"cached_tokens\":0},\"completion_tokens_details\":{\"reasoning_tokens\":0}}}\n\ndata: [DONE]\n\n
".as_bytes());

    http_handler::set_response(
        "https://api.openai.com/v1/chat/completions",
        http_handler::ResponseHandler::Response(openai_response),
    );

    let request = http::types::OutgoingRequest::new(http::types::Headers::new());
    request.set_method(&http::types::Method::Post).unwrap();
    request.set_path_with_query(Some("/proxy-openai")).unwrap();
    request.body().unwrap().write_bytes(json!(
        {"messages":[{"role":"system","content":"You are a helpful assistant."},{"role":"user","content":"hello"}]
    }).to_string().as_bytes());
    let response = spin_test_sdk::perform_request(request);

    assert_eq!(response.status(), 200);
}
