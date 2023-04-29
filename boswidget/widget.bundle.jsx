const secretKey = Storage.privateGet("secretKey");

let iframeMessage = {
    command: 'createaccount'
};

if (secretKey) {
    iframeMessage.command = 'useaccount'
    iframeMessage.secretKey = secretKey;
}

function handleMessage(msg) {
    switch (msg.command) {
        case 'accountcreated':
            Storage.privateSet('secretKey', msg.secretKey);
            break;
    }
}

return <>
    <iframe message={iframeMessage} onMessage={handleMessage} src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgogICAgPGhlYWQ+CiAgICAgICAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiPgogICAgICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICAgIDwvaGVhZD4KICAgIDxib2R5PgogICAgPC9ib2R5PgogICAgPHNjcmlwdCB0eXBlPSJtb2R1bGUiPmltcG9ydCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL25lYXItYXBpLWpzQDIuMS4zL2Rpc3QvbmVhci1hcGktanMubWluLmpzIjt3aW5kb3cub25tZXNzYWdlPWU9Pntzd2l0Y2goY29uc29sZS5sb2coZSksZS5kYXRhLmNvbW1hbmQpe2Nhc2UiY3JlYXRlYWNjb3VudCI6Y29uc3QgYT1uZWFyQXBpLnV0aWxzLktleVBhaXJFZDI1NTE5LmZyb21SYW5kb20oKSxjPUJ1ZmZlci5mcm9tKGEucHVibGljS2V5LmRhdGEpLnRvU3RyaW5nKCJoZXgiKTt3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhY2NvdW50Y3JlYXRlZCIsc2VjcmV0S2V5OmEuc2VjcmV0S2V5LGFjY291bnRpZDpjfSxlLm9yaWdpbik7YnJlYWs7Y2FzZSJ1c2VhY2NvdW50Ijpjb25zb2xlLmxvZygidXNlIGFjY291bnQiLGUuZGF0YS5zZWNyZXRLZXkpfX07Cjwvc2NyaXB0Pgo8L2h0bWw+"></iframe>
</>;