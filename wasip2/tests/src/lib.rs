use serde_json::json;
use spin_test_sdk::{
    bindings::{fermyon::spin_test_virt, wasi, wasi::http},
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
    assert!(response.body_as_string().unwrap().contains("Proxy OpenAI API"));
}

#[spin_test]
fn openai_request() {
    spin_test_virt::variables::set("openai_api_key", "hello");

    let request = http::types::OutgoingRequest::new(http::types::Headers::new());
    request.set_method(&http::types::Method::Post).unwrap();
    request.set_path_with_query(Some("/proxy-openai")).unwrap();
    request.body().unwrap().write_bytes(json!({
        "messages": []
    }).to_string().as_bytes());
    let response = spin_test_sdk::perform_request(request);

    assert_eq!(response.status(), 500);
    println!("{:?}", response.body_as_string());
    
}