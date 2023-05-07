const SECRET_KEY_STORAGE_KEY = 'secretKey';
Storage.privateGet(SECRET_KEY_STORAGE_KEY);

State.init({
    secretKey: null,
    airesponse: '',
    aiquestion: '',
    accountId: '',
    iframeMessage: null
});

function init_iframe() {
    const secretKey = Storage.privateGet(SECRET_KEY_STORAGE_KEY);

    State.update({
        secretKey,
        iframeMessage: secretKey ? {
            command: 'useaccount',
            secretKey: secretKey,
        } : {
            command: 'createaccount'
        }
    });
}

function ask_ai() {
    State.update({ iframeMessage: { command: 'ask_ai', aiquestion: state.aiquestion, ts: new Date().getTime() }, airesponse: '', progress: true, progressText: '' });
}

function changeSecretKey(secretKey) {
    State.update({ secretKey });
    Storage.privateSet(SECRET_KEY_STORAGE_KEY, secretKey);
    init_iframe();
}

function handleMessage(msg) {
    switch (msg.command) {
        case 'accountcreated':
            Storage.privateSet(SECRET_KEY_STORAGE_KEY, msg.secretKey);
            State.update({ accountId: msg.accountId, secretKey: msg.secretKey });
            break;
        case 'airesponse':
            State.update({ airesponse: msg.airesponse, progress: false, error: msg.error });
            break;
        case 'aiprogress':
            State.update({ progressText: state.progressText + msg.progressmessage, progress: true });
            break;
        case 'usingaccount':
            State.update({ accountId: msg.accountId });
            break;
        case 'ready':
            console.log('ready');
            init_iframe();
            break;
    }
}

const iframe = <iframe message={state.iframeMessage} onMessage={handleMessage} src="IFRAME_DATA_URI" style={{ width: '400px', height: '100px', border: 'none' }}></iframe>;


const ProgressWrapper = styled.div`
.progress-border {
    height: 50px;
    width: 100%;
}

.progress-text {
    position: absolute;
    right: 0px;
    white-space: nowrap;
    color: #fff;
    padding-top: 6px;
    font-size: 20px;
}

.progress-fill {
    background-color: rgba(0,130,0, 0.5);
    z-index: 100;
    height: 50px;    
    width: 25%;
    animation-name: indeterminate;
    animation-duration: 2s;
    animation-iteration-count: infinite;
}

@keyframes indeterminate {
    0% { margin-left: 0%; width: 25%;}
    25% { width: 40%; }
    50% { margin-left: 75%; width: 25%; }
    75% { width: 40%; }
    100% { margin-left: 0%; width: 25%; }
}
`;

const progressIndicator = state.progress ? <ProgressWrapper><div id="main-progress-bar" class="progress-border">
    <div class="progress-text">{state.progressText}</div>
    <div class="progress-fill"></div>
</div></ProgressWrapper> : <button onClick={ask_ai}>Ask ChatGPT</button>;

const responseArea =  state.error ? <div style={{ color: 'red', backgroundColor: '#f8f8f8', width: '100%' }}>
<Markdown text={state.error} />
</div> : '';

const secretKeyToggle = state.showSecretKey ? <>
    <button onClick={() => State.update({ showSecretKey: false })}>Hide</button>
    <input type="text" value={state.secretKey} onChange={e => changeSecretKey(e.target.value)}></input>
</> :
    <button onClick={() => State.update({ showSecretKey: true })}>Show</button>

return <>
    <p><b>NOTE:</b> Each request costs about 0.005 NEAR. Make sure the spending account below is funded, and you can also get full access to
        that account by using the secret key. Only you have the key to this account, so don't loose it.</p>

    <textarea style={{ width: '100%' }} onChange={e => State.update({ aiquestion: e.target.value })} value={state.aiquestion}></textarea>
    {progressIndicator}
    <br />
    {responseArea}

    {iframe}

    <p></p>
    <p>Spending account ID: <pre>{state.accountId}</pre></p>
    <p>Spending account secret key: {secretKeyToggle}</p>
</>;