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
    State.update({ iframeMessage: { command: 'ask_ai', aiquestion: state.aiquestion, ts: new Date().getTime() }, progress: true });
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
            State.update({ airesponse: msg.airesponse, progress: false });
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

const iframe = <iframe message={state.iframeMessage} onMessage={handleMessage} src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgogICAgPGhlYWQ+CiAgICAgICAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiPgogICAgICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICAgIDwvaGVhZD4KICAgIDxib2R5PgogICAgPC9ib2R5PgogICAgPHNjcmlwdCB0eXBlPSJtb2R1bGUiPmltcG9ydCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL25lYXItYXBpLWpzQDIuMS4zL2Rpc3QvbmVhci1hcGktanMubWluLmpzIjtpbXBvcnQiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9qcy1zaGEyNTZAMC45LjAvc3JjL3NoYTI1Ni5taW4uanMiO2NvbnN0IGU9Im1haW5uZXQiLG49bmV3IG5lYXJBcGkua2V5U3RvcmVzLkluTWVtb3J5S2V5U3RvcmU7bGV0IGE7Y29uc3QgdD17a2V5U3RvcmU6bixuZXR3b3JrSWQ6ZSxub2RlVXJsOmBodHRwczovL3JwYy4ke2V9Lm5lYXIub3JnYCx3YWxsZXRVcmw6YGh0dHBzOi8vd2FsbGV0LiR7ZX0ubmVhci5vcmdgLGhlbHBlclVybDpgaHR0cHM6Ly9oZWxwZXIuJHtlfS5uZWFyLm9yZ2AsZXhwbG9yZXJVcmw6YGh0dHBzOi8vZXhwbG9yZXIuJHtlfS5uZWFyLm9yZ2B9O2FzeW5jIGZ1bmN0aW9uIHIocil7Y29uc3Qgcz1uZWFyQXBpLnV0aWxzLktleVBhaXIuZnJvbVN0cmluZyhyKSxvPUJ1ZmZlci5mcm9tKHMucHVibGljS2V5LmRhdGEpLnRvU3RyaW5nKCJoZXgiKTthd2FpdCBuLnNldEtleShlLG8scyk7Y29uc3QgaT1hd2FpdCBuZWFyQXBpLmNvbm5lY3QodCk7cmV0dXJuIGE9YXdhaXQgaS5hY2NvdW50KG8pLG99YXN5bmMgZnVuY3Rpb24gcyhlKXt0cnl7Y29uc3Qgbj1hd2FpdCBhc3luYyBmdW5jdGlvbihlKXtjb25zdCBuPWEuYWNjb3VudElkLHQ9SlNPTi5zdHJpbmdpZnkoZSkscj1zaGEyNTYodCkscz1hd2FpdCBhLmNvbm5lY3Rpb24uc2lnbmVyLmdldFB1YmxpY0tleShhLmFjY291bnRJZCxhLmNvbm5lY3Rpb24ubmV0d29ya0lkKSxvPShhd2FpdCBhLmZpbmRBY2Nlc3NLZXkoKSkuYWNjZXNzS2V5LGk9KytvLm5vbmNlLGM9bmVhckFwaS51dGlscy5zZXJpYWxpemUuYmFzZV9kZWNvZGUoby5ibG9ja19oYXNoKSxwPW5lYXJBcGkudHJhbnNhY3Rpb25zLmNyZWF0ZVRyYW5zYWN0aW9uKGEuYWNjb3VudElkLHMsImpzaW5ydXN0Lm5lYXIiLGksW25lYXJBcGkudHJhbnNhY3Rpb25zLmZ1bmN0aW9uQ2FsbCgiYXNrX2FpIix7bWVzc2FnZV9oYXNoOnJ9LCIzMDAwMDAwMDAwMDAwMCIsNTAwMDAwMDAwMDAwMDAwMDAwMDAwMG4pXSxjKSxbZCxsXT1hd2FpdCBuZWFyQXBpLnRyYW5zYWN0aW9ucy5zaWduVHJhbnNhY3Rpb24ocCxhLmNvbm5lY3Rpb24uc2lnbmVyLGEuYWNjb3VudElkLGEuY29ubmVjdGlvbi5uZXR3b3JrSWQpO3JldHVybiBKU09OLnN0cmluZ2lmeSh7c2lnbmVkX3RyYW5zYWN0aW9uOkJ1ZmZlci5mcm9tKGwuZW5jb2RlKCkpLnRvU3RyaW5nKCJiYXNlNjQiKSx0cmFuc2FjdGlvbl9oYXNoOm5lYXJBcGkudXRpbHMuc2VyaWFsaXplLmJhc2VfZW5jb2RlKGQpLHNlbmRlcl9hY2NvdW50X2lkOm4sbWVzc2FnZXM6ZX0pfShlKSx0PWF3YWl0IGZldGNoKCJodHRwczovL25lYXItb3BlbmFpLnZlcmNlbC5hcHAvYXBpL29wZW5haSIse21ldGhvZDoiUE9TVCIsYm9keTpufSkudGhlbigoZT0+ZS5qc29uKCkpKTtpZih0LmVycm9yKXRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeSh0LmVycm9yLG51bGwsMSkpO3JldHVybiB0LmNob2ljZXNbMF0ubWVzc2FnZS5jb250ZW50fWNhdGNoKGUpe3JldHVybiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpLGBVbmZvcnR1bmF0ZWx5LCB0aGVyZSB3YXMgYW4gZXJyb3I6XG5cblxgXGBcYFxuJHtlLm1lc3NhZ2V9XG5cYFxgXGBcbmB9fXdpbmRvdy5vbm1lc3NhZ2U9YXN5bmMgbz0+e3N3aXRjaChnbG9iYWxUaGlzLnBhcmVudE9yaWdpbj1vLm9yaWdpbixjb25zb2xlLmxvZygiaWZyYW1lIGdvdCBtZXNzYWdlIixvLmRhdGEpLG8uZGF0YS5jb21tYW5kKXtjYXNlImNyZWF0ZWFjY291bnQiOmNvbnN0e3NlY3JldEtleTppLGFjY291bnRJZDpjfT1hd2FpdCBhc3luYyBmdW5jdGlvbigpe2NvbnN0IHI9bmVhckFwaS51dGlscy5LZXlQYWlyRWQyNTUxOS5mcm9tUmFuZG9tKCkscz1CdWZmZXIuZnJvbShyLnB1YmxpY0tleS5kYXRhKS50b1N0cmluZygiaGV4Iik7YXdhaXQgbi5zZXRLZXkoZSxzLHIpO2NvbnN0IG89YXdhaXQgbmVhckFwaS5jb25uZWN0KHQpO3JldHVybiBhPWF3YWl0IG8uYWNjb3VudChzKSx7c2VjcmV0S2V5OnIuc2VjcmV0S2V5LGFjY291bnRJZDpzfX0oKTt3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhY2NvdW50Y3JlYXRlZCIsc2VjcmV0S2V5OmksYWNjb3VudElkOmN9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKTticmVhaztjYXNlInVzZWFjY291bnQiOndpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6InVzaW5nYWNjb3VudCIsYWNjb3VudElkOmF3YWl0IHIoby5kYXRhLnNlY3JldEtleSl9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKTticmVhaztjYXNlImFza19haSI6Y29uc3QgcD1hd2FpdCBzKFt7cm9sZToidXNlciIsY29udGVudDpvLmRhdGEuYWlxdWVzdGlvbn1dKTt3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhaXJlc3BvbnNlIixhaXJlc3BvbnNlOnB9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKX19LHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6InJlYWR5In0sIioiKTsKPC9zY3JpcHQ+CjwvaHRtbD4=" style={{ width: '0px', height: '0px', border: 'none' }}></iframe>;

const secretKeyToggle = state.showSecretKey ? <>
    <button onClick={() => State.update({ showSecretKey: false })}>Hide</button>
    <input type="text" value={state.secretKey} onChange={e => changeSecretKey(e.target.value)}></input>
</> :
    <button onClick={() => State.update({ showSecretKey: true })}>Show</button>

return <>
    <p><b>NOTE:</b> Each request costs about 0.005 NEAR. Make sure the spending account below is funded, and you can also get full access to
        that account by using the secret key. Only you have the key to this account, so don't loose it.</p>
    {iframe}
    <textarea style={{ width: '100%' }} onChange={e => State.update({ aiquestion: e.target.value })} value={state.aiquestion}></textarea>
    {state.progress ? <Progress.Root>
        <Progress.Indicator state="indeterminate" />
    </Progress.Root> : <button onClick={ask_ai}>Ask ChatGPT</button>}

    <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5' }}>
        <Markdown text={state.airesponse} />
    </div>

    <p><br /></p>

    <p></p>
    <p>Spending account ID: <pre>{state.accountId}</pre></p>
    <p>Spending account secret key: {secretKeyToggle}</p>
</>;