State.init({
    secretKey: Storage.privateGet("secretKey"),
    airesponse: '',
    aiquestion: '',
    accountId: '',
    iframeMessage: null
});

function handleMessage(msg) {
    switch (msg.command) {
        case 'accountcreated':
            Storage.privateSet('secretKey', msg.secretKey);
            State.update({ accountId: msg.accountId, secretKey: msg.secretKey });
            break;
        case 'airesponse':
            State.update({ airesponse: msg.airesponse });
            break;
        case 'usingaccount':
            State.update({ accountId: msg.accountId });
    }
}

function ask_ai() {
    State.update({ iframeMessage: { command: 'ask_ai', aiquestion: state.aiquestion } });
    console.log('state updated', state.iframeMessage);
}

function init_iframe() {
    State.update({
        iframeMessage: state.secretKey ? {
            command: 'useaccount',
            secretKey: state.secretKey,
        } : {
            command: 'createaccount'
        }
    });
    console.log('init iframe');
}

function changeSecretKey(secretKey) {
    State.update({secretKey});
    init_iframe();
}

const iframe = <iframe onLoad={init_iframe} message={state.iframeMessage} onMessage={handleMessage} src="IFRAME_DATA_URI" style={{ width: '0px', height: '0px', border: 'none' }}></iframe>;

const secretKeyToggle = state.showSecretKey ? <>
            <button onClick={() => State.update({showSecretKey: false})}>Hide</button>
            <input type="text" value={state.secretKey} onChange={e => changeSecretKey(e.target.value)}></input>
        </> :
        <button onClick={() => State.update({showSecretKey: true})}>Show</button>

return <>
    {iframe}
    <textarea style={{ width: '100%' }} onChange={e => State.update({ aiquestion: e.target.value })} value={state.aiquestion}></textarea>
    <button onClick={ask_ai}>Ask AI</button>
    <Markdown text={state.airesponse} />

    <p></p>
    <p>Spending account ID: <pre>{state.accountId}</pre></p>
    <p>Spending account secret key: {secretKeyToggle}</p>
</>;