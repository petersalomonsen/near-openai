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
    <iframe message={iframeMessage} onMessage={handleMessage} src="IFRAME_DATA_URI"></iframe>
</>;