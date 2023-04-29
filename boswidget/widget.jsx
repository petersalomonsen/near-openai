const secretKey = Storage.privateGet("secretKey");

State.init({airesponse: ''});

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
        case 'airesponse':
            State.update({airesponse: msg.airesponse});
            break;
    }
}

return <>
    <iframe message={iframeMessage} onMessage={handleMessage} src="IFRAME_DATA_URI" style={{width: '640px', height: '400px'}}></iframe>
    <Markdown text={state.airesponse} />
    <p><pre>{secretKey}</pre></p>
</>;