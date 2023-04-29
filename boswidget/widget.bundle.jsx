const secretKey = Storage.privateGet("secretKey");

State.init({
    airesponse: '',
    aiquestion: '',
    accountId: '',
    iframeMessage: null
});

function handleMessage(msg) {
    switch (msg.command) {
        case 'accountcreated':
            Storage.privateSet('secretKey', msg.secretKey);
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
        iframeMessage: secretKey ? {
            command: 'useaccount',
            secretKey: secretKey,
        } : {
            command: 'createaccount'
        }
    });
    console.log('init iframe');
}

const iframe = <iframe onLoad={init_iframe} message={state.iframeMessage} onMessage={handleMessage} src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgogICAgPGhlYWQ+CiAgICAgICAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiPgogICAgICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICAgIDwvaGVhZD4KICAgIDxib2R5PgogICAgPC9ib2R5PgogICAgPHNjcmlwdCB0eXBlPSJtb2R1bGUiPmltcG9ydCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL25lYXItYXBpLWpzQDIuMS4zL2Rpc3QvbmVhci1hcGktanMubWluLmpzIjtpbXBvcnQiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9qcy1zaGEyNTZAMC45LjAvc3JjL3NoYTI1Ni5taW4uanMiO2NvbnN0IGU9Im1haW5uZXQiLG49bmV3IG5lYXJBcGkua2V5U3RvcmVzLkluTWVtb3J5S2V5U3RvcmUsYT17a2V5U3RvcmU6bixuZXR3b3JrSWQ6ZSxub2RlVXJsOmBodHRwczovL3JwYy4ke2V9Lm5lYXIub3JnYCx3YWxsZXRVcmw6YGh0dHBzOi8vd2FsbGV0LiR7ZX0ubmVhci5vcmdgLGhlbHBlclVybDpgaHR0cHM6Ly9oZWxwZXIuJHtlfS5uZWFyLm9yZ2AsZXhwbG9yZXJVcmw6YGh0dHBzOi8vZXhwbG9yZXIuJHtlfS5uZWFyLm9yZ2B9O2FzeW5jIGZ1bmN0aW9uIHQoKXtjb25zdCBhPW5lYXJBcGkudXRpbHMuS2V5UGFpckVkMjU1MTkuZnJvbVJhbmRvbSgpLHQ9QnVmZmVyLmZyb20oYS5wdWJsaWNLZXkuZGF0YSkudG9TdHJpbmcoImhleCIpO3JldHVybiBhd2FpdCBuLnNldEtleShlLHQsYSksYS5zZWNyZXRLZXl9YXN5bmMgZnVuY3Rpb24gcihhKXtjb25zdCB0PW5lYXJBcGkudXRpbHMuS2V5UGFpci5mcm9tU3RyaW5nKGEpLHI9QnVmZmVyLmZyb20odC5wdWJsaWNLZXkuZGF0YSkudG9TdHJpbmcoImhleCIpO3JldHVybiBhd2FpdCBuLnNldEtleShlLHIsdCkscn1hc3luYyBmdW5jdGlvbiBzKHQpe2NvbnN0IHI9YXdhaXQgbmVhckFwaS5jb25uZWN0KGEpLHM9YXdhaXQgci5hY2NvdW50KChhd2FpdCBuLmdldEFjY291bnRzKGUpKVswXSksbz1zLmFjY291bnRJZCxpPUpTT04uc3RyaW5naWZ5KHQpLGM9MTAwMDAwMDAwMDAwMDAwMDAwMDBuKkJpZ0ludChpLmxlbmd0aCksbD1zaGEyNTYoaSkscD1hd2FpdCBzLmNvbm5lY3Rpb24uc2lnbmVyLmdldFB1YmxpY0tleShzLmFjY291bnRJZCxzLmNvbm5lY3Rpb24ubmV0d29ya0lkKSxnPShhd2FpdCBzLmZpbmRBY2Nlc3NLZXkoKSkuYWNjZXNzS2V5O2NvbnNvbGUubG9nKGcpO2NvbnN0IGQ9KytnLm5vbmNlLHU9bmVhckFwaS51dGlscy5zZXJpYWxpemUuYmFzZV9kZWNvZGUoZy5ibG9ja19oYXNoKSxoPW5lYXJBcGkudHJhbnNhY3Rpb25zLmNyZWF0ZVRyYW5zYWN0aW9uKHMuYWNjb3VudElkLHAsImpzaW5ydXN0Lm5lYXIiLGQsW25lYXJBcGkudHJhbnNhY3Rpb25zLmZ1bmN0aW9uQ2FsbCgiYXNrX2FpIix7bWVzc2FnZV9oYXNoOmx9LCIzMDAwMDAwMDAwMDAwMCIsYyldLHUpLFttLHddPWF3YWl0IG5lYXJBcGkudHJhbnNhY3Rpb25zLnNpZ25UcmFuc2FjdGlvbihoLHMuY29ubmVjdGlvbi5zaWduZXIscy5hY2NvdW50SWQscy5jb25uZWN0aW9uLm5ldHdvcmtJZCk7cmV0dXJuIEpTT04uc3RyaW5naWZ5KHtzaWduZWRfdHJhbnNhY3Rpb246QnVmZmVyLmZyb20ody5lbmNvZGUoKSkudG9TdHJpbmcoImJhc2U2NCIpLHRyYW5zYWN0aW9uX2hhc2g6bmVhckFwaS51dGlscy5zZXJpYWxpemUuYmFzZV9lbmNvZGUobSksc2VuZGVyX2FjY291bnRfaWQ6byxtZXNzYWdlczp0fSl9YXN5bmMgZnVuY3Rpb24gbyhlKXt0cnl7Y29uc3Qgbj1hd2FpdCBmZXRjaCgiaHR0cHM6Ly9uZWFyLW9wZW5haS1naXQtYm9zd2lkZ2V0LXBldGVyc2Fsb21vbnNlbi52ZXJjZWwuYXBwL2FwaS9vcGVuYWkiLHttZXRob2Q6IlBPU1QiLGJvZHk6ZX0pLnRoZW4oKGU9PmUuanNvbigpKSk7aWYobi5lcnJvcil0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkobi5lcnJvcixudWxsLDEpKTtyZXR1cm4gbi5jaG9pY2VzWzBdLm1lc3NhZ2UuY29udGVudH1jYXRjaChlKXtyZXR1cm4gY29uc29sZS5sb2coZS5tZXNzYWdlKSxgVW5mb3J0dW5hdGVseSwgdGhlcmUgd2FzIGFuIGVycm9yOlxuXG5cYFxgXGBcbiR7ZS5tZXNzYWdlfVxuXGBcYFxgXG5gfX13aW5kb3cub25tZXNzYWdlPWFzeW5jIGU9Pntzd2l0Y2goZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW49ZS5vcmlnaW4sY29uc29sZS5sb2coImlmcmFtZSBnb3QgbWVzc2FnZSIsZS5kYXRhKSxlLmRhdGEuY29tbWFuZCl7Y2FzZSJjcmVhdGVhY2NvdW50Ijp3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhY2NvdW50Y3JlYXRlZCIsc2VjcmV0S2V5OmF3YWl0IHQoKX0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pO2JyZWFrO2Nhc2UidXNlYWNjb3VudCI6d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoidXNpbmdhY2NvdW50IixhY2NvdW50SWQ6YXdhaXQgcihlLmRhdGEuc2VjcmV0S2V5KX0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pO2JyZWFrO2Nhc2UiYXNrX2FpIjpjb25zdCBuPWF3YWl0IG8oYXdhaXQgcyhbe3JvbGU6InVzZXIiLGNvbnRlbnQ6ZS5kYXRhLmFpcXVlc3Rpb259XSkpO3dpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6ImFpcmVzcG9uc2UiLGFpcmVzcG9uc2U6bn0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pfX0sY29uc29sZS5sb2coImlmcmFtZSBsb2FkZWQiKTtleHBvcnR7cyBhcyBjcmVhdGVfYXNrX2FpX3JlcXVlc3RfYm9keSxvIGFzIHNlbmRfYXNrX2FpX3JlcXVlc3R9Owo8L3NjcmlwdD4KPC9odG1sPg==" style={{ width: '0px', height: '0px', border: 'none' }}></iframe>;

return <>
    <p>Using account {state.accountId}</p>
    <textarea style={{ width: '100%' }} onChange={e => State.update({ aiquestion: e.target.value })} value={state.aiquestion}></textarea>
    <button onClick={ask_ai}>Ask AI</button>
    <Markdown text={state.airesponse} />

    <p><pre>{secretKey}</pre></p>
    {iframe}
</>;