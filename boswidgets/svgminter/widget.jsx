const SECRET_KEY_STORAGE_KEY = 'secretKey';
Storage.privateGet(SECRET_KEY_STORAGE_KEY);

State.init({
    secretKey: null,
    airesponse: '',
    progressText: '',
    aiquestion: `A blue sky, and green fields`,
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
    State.update({ iframeMessage: { command: 'ask_ai', aiquestion: state.aiquestion, ts: new Date().getTime() } });
    console.log('state updated', state.iframeMessage);
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
        case 'mint':
            State.update({error: ''});
            Near.call('jsinrustnft.near', 'nft_mint',
                Object.assign({}, msg.args, {
                    title: msg.args.token_id,
                    description: state.aiquestion
                }),
                undefined, (1_000_00000_00000_00000_00000n).toString());
            break;
        case 'error':
            State.update({ error: msg.error });
            break;
    }
}

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

const progressIndicator = <>{state.progress ? <ProgressWrapper><div id="main-progress-bar" class="progress-border">
    <div class="progress-text">{state.progressText}</div>
    <div class="progress-fill"></div>
</div></ProgressWrapper> : <button onClick={ask_ai}>Ask ChatGPT</button>}</>;

const iframe = <iframe message={state.iframeMessage} onMessage={handleMessage} onLoad={init_iframe} src="IFRAME_DATA_URI" style={{ width: '100%', height: '700px', border: 'none' }}></iframe>;

const secretKeyToggle = state.showSecretKey ? <>
    <button onClick={() => State.update({ showSecretKey: false })}>Hide</button>
    <input type="text" value={state.secretKey} onChange={e => changeSecretKey(e.target.value)}></input>
</> :
    <button onClick={() => State.update({ showSecretKey: true })}>Show</button>

const responseArea = state.error ? <div style={{ color: 'red', backgroundColor: '#f8f8f8' }}>
    <Markdown text={state.error} />
</div> : '';

const accountArea = <><p>Spending account ID: <pre>{state.accountId}</pre></p>
    <p>Spending account secret key: {secretKeyToggle}</p></>;

const aiquestionarea = <textarea style={{ width: '100%' }} onChange={e => State.update({ aiquestion: e.target.value })} value={state.aiquestion}></textarea>;

return <>
    <p>Create some image and text and mint your own NFT that you can list and trade on <a href="https://www.mintbase.xyz/contract/jsinrustnft.near/nfts/all/0" target="_blank">Mintbase</a></p>

    <p>
        <b>NOTE:</b> Each request to ChatGPT costs about 0.005 NEAR. Make sure the spending account below is funded, and you can also get full access to
        that account by using the secret key. Only you have the key to this account, so don't loose it.</p>

    {aiquestionarea}
    {progressIndicator}
    {responseArea}

    {iframe}
    <p></p>

    {accountArea}
</>;