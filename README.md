OpenAI API client with NEAR
===========================

```
NEAR_ACCOUNT_ID=petersalomonsen.near node client.js "what now?"                                           
As an AI language model, I am a machine and do not have the ability to provide personalized advice without more information about your situation. Can you please provide more context or details about what you are seeking advice on?
```

This is a simple experiment to pay for OpenAI API requests using NEAR. Transactions are created and signed on the client and sent to the edge server that will post it ( or reject if it finds that the transaction was already posted ).

**NOTE**: This is very much work in progress and the payment model and API contract may change without notice.

# WASI Preview 2

The [wasip2](./wasip2) folder contains a [Spin](https://www.fermyon.com/spin) application, based on the WASI 2 and the WebAssembly Component Model ( https://component-model.bytecodealliance.org/ ). It is implemented in Rust as a serverless proxy for the OpenAI API.