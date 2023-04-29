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

const iframe = <iframe onLoad={init_iframe} message={state.iframeMessage} onMessage={handleMessage} src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgogICAgPGhlYWQ+CiAgICAgICAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiPgogICAgICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICAgIDwvaGVhZD4KICAgIDxib2R5PgogICAgPC9ib2R5PgogICAgPHNjcmlwdCB0eXBlPSJtb2R1bGUiPmltcG9ydCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL25lYXItYXBpLWpzQDIuMS4zL2Rpc3QvbmVhci1hcGktanMubWluLmpzIjtpbXBvcnQiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9qcy1zaGEyNTZAMC45LjAvc3JjL3NoYTI1Ni5taW4uanMiO2NvbnN0IGU9Im1haW5uZXQiLG49bmV3IG5lYXJBcGkua2V5U3RvcmVzLkluTWVtb3J5S2V5U3RvcmUsYT17a2V5U3RvcmU6bixuZXR3b3JrSWQ6ZSxub2RlVXJsOmBodHRwczovL3JwYy4ke2V9Lm5lYXIub3JnYCx3YWxsZXRVcmw6YGh0dHBzOi8vd2FsbGV0LiR7ZX0ubmVhci5vcmdgLGhlbHBlclVybDpgaHR0cHM6Ly9oZWxwZXIuJHtlfS5uZWFyLm9yZ2AsZXhwbG9yZXJVcmw6YGh0dHBzOi8vZXhwbG9yZXIuJHtlfS5uZWFyLm9yZ2B9O2FzeW5jIGZ1bmN0aW9uIHQoYSl7Y29uc3QgdD1uZWFyQXBpLnV0aWxzLktleVBhaXIuZnJvbVN0cmluZyhhKSxyPUJ1ZmZlci5mcm9tKHQucHVibGljS2V5LmRhdGEpLnRvU3RyaW5nKCJoZXgiKTtyZXR1cm4gYXdhaXQgbi5zZXRLZXkoZSxyLHQpLHJ9YXN5bmMgZnVuY3Rpb24gcih0KXtjb25zdCByPWF3YWl0IG5lYXJBcGkuY29ubmVjdChhKSxzPWF3YWl0IHIuYWNjb3VudCgoYXdhaXQgbi5nZXRBY2NvdW50cyhlKSlbMF0pLG89cy5hY2NvdW50SWQsaT1KU09OLnN0cmluZ2lmeSh0KSxjPXNoYTI1NihpKSxsPWF3YWl0IHMuY29ubmVjdGlvbi5zaWduZXIuZ2V0UHVibGljS2V5KHMuYWNjb3VudElkLHMuY29ubmVjdGlvbi5uZXR3b3JrSWQpLHA9KGF3YWl0IHMuZmluZEFjY2Vzc0tleSgpKS5hY2Nlc3NLZXk7Y29uc29sZS5sb2cocCk7Y29uc3QgZD0rK3Aubm9uY2UsZz1uZWFyQXBpLnV0aWxzLnNlcmlhbGl6ZS5iYXNlX2RlY29kZShwLmJsb2NrX2hhc2gpLHU9bmVhckFwaS50cmFuc2FjdGlvbnMuY3JlYXRlVHJhbnNhY3Rpb24ocy5hY2NvdW50SWQsbCwianNpbnJ1c3QubmVhciIsZCxbbmVhckFwaS50cmFuc2FjdGlvbnMuZnVuY3Rpb25DYWxsKCJhc2tfYWkiLHttZXNzYWdlX2hhc2g6Y30sIjMwMDAwMDAwMDAwMDAwIiw1MDAwMDAwMDAwMDAwMDAwMDAwMDAwbildLGcpLFttLGhdPWF3YWl0IG5lYXJBcGkudHJhbnNhY3Rpb25zLnNpZ25UcmFuc2FjdGlvbih1LHMuY29ubmVjdGlvbi5zaWduZXIscy5hY2NvdW50SWQscy5jb25uZWN0aW9uLm5ldHdvcmtJZCk7cmV0dXJuIEpTT04uc3RyaW5naWZ5KHtzaWduZWRfdHJhbnNhY3Rpb246QnVmZmVyLmZyb20oaC5lbmNvZGUoKSkudG9TdHJpbmcoImJhc2U2NCIpLHRyYW5zYWN0aW9uX2hhc2g6bmVhckFwaS51dGlscy5zZXJpYWxpemUuYmFzZV9lbmNvZGUobSksc2VuZGVyX2FjY291bnRfaWQ6byxtZXNzYWdlczp0fSl9YXN5bmMgZnVuY3Rpb24gcyhlKXt0cnl7Y29uc3Qgbj1hd2FpdCBmZXRjaCgiaHR0cHM6Ly9uZWFyLW9wZW5haS1naXQtYm9zd2lkZ2V0LXBldGVyc2Fsb21vbnNlbi52ZXJjZWwuYXBwL2FwaS9vcGVuYWkiLHttZXRob2Q6IlBPU1QiLGJvZHk6ZX0pLnRoZW4oKGU9PmUuanNvbigpKSk7aWYobi5lcnJvcil0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkobi5lcnJvcixudWxsLDEpKTtyZXR1cm4gbi5jaG9pY2VzWzBdLm1lc3NhZ2UuY29udGVudH1jYXRjaChlKXtyZXR1cm4gY29uc29sZS5sb2coZS5tZXNzYWdlKSxgVW5mb3J0dW5hdGVseSwgdGhlcmUgd2FzIGFuIGVycm9yOlxuXG5cYFxgXGBcbiR7ZS5tZXNzYWdlfVxuXGBcYFxgXG5gfX13aW5kb3cub25tZXNzYWdlPWFzeW5jIGE9Pntzd2l0Y2goZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW49YS5vcmlnaW4sY29uc29sZS5sb2coImlmcmFtZSBnb3QgbWVzc2FnZSIsYS5kYXRhKSxhLmRhdGEuY29tbWFuZCl7Y2FzZSJjcmVhdGVhY2NvdW50Ijpjb25zdHtzZWNyZXRLZXk6byxhY2NvdW50SWQ6aX09YXdhaXQgYXN5bmMgZnVuY3Rpb24oKXtjb25zdCBhPW5lYXJBcGkudXRpbHMuS2V5UGFpckVkMjU1MTkuZnJvbVJhbmRvbSgpLHQ9QnVmZmVyLmZyb20oYS5wdWJsaWNLZXkuZGF0YSkudG9TdHJpbmcoImhleCIpO3JldHVybiBhd2FpdCBuLnNldEtleShlLHQsYSkse3NlY3JldEtleTphLnNlY3JldEtleSxhY2NvdW50SWQ6dH19KCk7d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWNjb3VudGNyZWF0ZWQiLHNlY3JldEtleTpvLGFjY291bnRJZDppfSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbik7YnJlYWs7Y2FzZSJ1c2VhY2NvdW50Ijp3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJ1c2luZ2FjY291bnQiLGFjY291bnRJZDphd2FpdCB0KGEuZGF0YS5zZWNyZXRLZXkpfSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbik7YnJlYWs7Y2FzZSJhc2tfYWkiOmNvbnN0IGM9YXdhaXQgcyhhd2FpdCByKFt7cm9sZToidXNlciIsY29udGVudDphLmRhdGEuYWlxdWVzdGlvbn1dKSk7d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWlyZXNwb25zZSIsYWlyZXNwb25zZTpjfSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbil9fSxjb25zb2xlLmxvZygiaWZyYW1lIGxvYWRlZCIpO2V4cG9ydHtyIGFzIGNyZWF0ZV9hc2tfYWlfcmVxdWVzdF9ib2R5LHMgYXMgc2VuZF9hc2tfYWlfcmVxdWVzdH07Cjwvc2NyaXB0Pgo8L2h0bWw+" style={{ width: '0px', height: '0px', border: 'none' }}></iframe>;

const secretKeyToggle = state.showSecretKey ? <>
            <button onClick={() => State.update({showSecretKey: false})}>Hide</button><pre>{state.secretKey}</pre>
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