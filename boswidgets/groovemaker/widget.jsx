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
    State.update({ iframeMessage: { command: 'ask_ai', aiquestion: state.aiquestion, ts: new Date().getTime() }, airesponse: '', progress: true });
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
            State.update({ airesponse: msg.airesponse, progress: false });
            break;
        case 'aiprogress':
            State.update({ progressText: msg.progressmessage, progress: true });
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

const iframe = <iframe message={state.iframeMessage} onMessage={handleMessage} src="IFRAME_DATA_URI" style={{ width: '400px', height: '200px', border: 'none' }}></iframe>;


const ProgressWrapper = styled.div`
.progress-border {
    border: green solid 1px;
    height: 50px;
    width: 100%;
}

.progress-text {
    position: absolute;
    color: #666;
    text-align: center;
    width: 100%;
    height: 100%;
    font-size: 22px;
}

.progress-fill {
    background-color: rgba(0,255,0, 0.7);
    height: 50px;    
    width: 10%;
    animation-name: indeterminate;
    animation-duration: 2s;
    animation-iteration-count: infinite;
}

@keyframes indeterminate {
    0% { margin-left: 0%; width: 10%;}
    25% { width: 20%; }
    50% { margin-left: 90%; width: 10%; }
    75% { width: 20%; }
    100% { margin-left: 0%; width: 10%; }
}
`;

const progressIndicator = state.progress ? <ProgressWrapper><div id="main-progress-bar" class="progress-border">
    <div class="progress-text">{state.progressText}</div>
    <div class="progress-fill"></div>
</div></ProgressWrapper> : <button onClick={ask_ai}>Ask ChatGPT</button>;

const responseArea = <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5' }}>
    <Markdown text={state.airesponse} />
</div>;

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
    {responseArea}

    {iframe}


    <p><br /></p>

    <p></p>
    <p>Spending account ID: <pre>{state.accountId}</pre></p>
    <p>Spending account secret key: {secretKeyToggle}</p>
</>;