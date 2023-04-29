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

const iframe = <iframe onLoad={init_iframe} message={state.iframeMessage} onMessage={handleMessage} src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgogICAgPGhlYWQ+CiAgICAgICAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiPgogICAgICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICAgIDwvaGVhZD4KICAgIDxib2R5PgogICAgPC9ib2R5PgogICAgPHNjcmlwdCB0eXBlPSJtb2R1bGUiPmltcG9ydCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL25lYXItYXBpLWpzQDIuMS4zL2Rpc3QvbmVhci1hcGktanMubWluLmpzIjtpbXBvcnQiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9qcy1zaGEyNTZAMC45LjAvc3JjL3NoYTI1Ni5taW4uanMiO2NvbnN0IGU9Im1haW5uZXQiLG49bmV3IG5lYXJBcGkua2V5U3RvcmVzLkluTWVtb3J5S2V5U3RvcmUsYT17a2V5U3RvcmU6bixuZXR3b3JrSWQ6ZSxub2RlVXJsOmBodHRwczovL3JwYy4ke2V9Lm5lYXIub3JnYCx3YWxsZXRVcmw6YGh0dHBzOi8vd2FsbGV0LiR7ZX0ubmVhci5vcmdgLGhlbHBlclVybDpgaHR0cHM6Ly9oZWxwZXIuJHtlfS5uZWFyLm9yZ2AsZXhwbG9yZXJVcmw6YGh0dHBzOi8vZXhwbG9yZXIuJHtlfS5uZWFyLm9yZ2B9O2FzeW5jIGZ1bmN0aW9uIHQoKXtjb25zdCBhPW5lYXJBcGkudXRpbHMuS2V5UGFpckVkMjU1MTkuZnJvbVJhbmRvbSgpLHQ9QnVmZmVyLmZyb20oYS5wdWJsaWNLZXkuZGF0YSkudG9TdHJpbmcoImhleCIpO3JldHVybiBhd2FpdCBuLnNldEtleShlLHQsYSksYS5zZWNyZXRLZXl9YXN5bmMgZnVuY3Rpb24gcihhKXtjb25zdCB0PW5lYXJBcGkudXRpbHMuS2V5UGFpci5mcm9tU3RyaW5nKGEpLHI9QnVmZmVyLmZyb20odC5wdWJsaWNLZXkuZGF0YSkudG9TdHJpbmcoImhleCIpO3JldHVybiBhd2FpdCBuLnNldEtleShlLHIsdCkscn1hc3luYyBmdW5jdGlvbiBzKHQpe2NvbnN0IHI9YXdhaXQgbmVhckFwaS5jb25uZWN0KGEpLHM9YXdhaXQgci5hY2NvdW50KChhd2FpdCBuLmdldEFjY291bnRzKGUpKVswXSksbz1zLmFjY291bnRJZCxpPUpTT04uc3RyaW5naWZ5KHQpLGM9c2hhMjU2KGkpLGw9YXdhaXQgcy5jb25uZWN0aW9uLnNpZ25lci5nZXRQdWJsaWNLZXkocy5hY2NvdW50SWQscy5jb25uZWN0aW9uLm5ldHdvcmtJZCkscD0oYXdhaXQgcy5maW5kQWNjZXNzS2V5KCkpLmFjY2Vzc0tleTtjb25zb2xlLmxvZyhwKTtjb25zdCBkPSsrcC5ub25jZSxnPW5lYXJBcGkudXRpbHMuc2VyaWFsaXplLmJhc2VfZGVjb2RlKHAuYmxvY2tfaGFzaCksdT1uZWFyQXBpLnRyYW5zYWN0aW9ucy5jcmVhdGVUcmFuc2FjdGlvbihzLmFjY291bnRJZCxsLCJqc2lucnVzdC5uZWFyIixkLFtuZWFyQXBpLnRyYW5zYWN0aW9ucy5mdW5jdGlvbkNhbGwoImFza19haSIse21lc3NhZ2VfaGFzaDpjfSwiMzAwMDAwMDAwMDAwMDAiLDUwMDAwMDAwMDAwMDAwMDAwMDAwMDBuKV0sZyksW20saF09YXdhaXQgbmVhckFwaS50cmFuc2FjdGlvbnMuc2lnblRyYW5zYWN0aW9uKHUscy5jb25uZWN0aW9uLnNpZ25lcixzLmFjY291bnRJZCxzLmNvbm5lY3Rpb24ubmV0d29ya0lkKTtyZXR1cm4gSlNPTi5zdHJpbmdpZnkoe3NpZ25lZF90cmFuc2FjdGlvbjpCdWZmZXIuZnJvbShoLmVuY29kZSgpKS50b1N0cmluZygiYmFzZTY0IiksdHJhbnNhY3Rpb25faGFzaDpuZWFyQXBpLnV0aWxzLnNlcmlhbGl6ZS5iYXNlX2VuY29kZShtKSxzZW5kZXJfYWNjb3VudF9pZDpvLG1lc3NhZ2VzOnR9KX1hc3luYyBmdW5jdGlvbiBvKGUpe3RyeXtjb25zdCBuPWF3YWl0IGZldGNoKCJodHRwczovL25lYXItb3BlbmFpLWdpdC1ib3N3aWRnZXQtcGV0ZXJzYWxvbW9uc2VuLnZlcmNlbC5hcHAvYXBpL29wZW5haSIse21ldGhvZDoiUE9TVCIsYm9keTplfSkudGhlbigoZT0+ZS5qc29uKCkpKTtpZihuLmVycm9yKXRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShuLmVycm9yLG51bGwsMSkpO3JldHVybiBuLmNob2ljZXNbMF0ubWVzc2FnZS5jb250ZW50fWNhdGNoKGUpe3JldHVybiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpLGBVbmZvcnR1bmF0ZWx5LCB0aGVyZSB3YXMgYW4gZXJyb3I6XG5cblxgXGBcYFxuJHtlLm1lc3NhZ2V9XG5cYFxgXGBcbmB9fXdpbmRvdy5vbm1lc3NhZ2U9YXN5bmMgZT0+e3N3aXRjaChnbG9iYWxUaGlzLnBhcmVudE9yaWdpbj1lLm9yaWdpbixjb25zb2xlLmxvZygiaWZyYW1lIGdvdCBtZXNzYWdlIixlLmRhdGEpLGUuZGF0YS5jb21tYW5kKXtjYXNlImNyZWF0ZWFjY291bnQiOndpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6ImFjY291bnRjcmVhdGVkIixzZWNyZXRLZXk6YXdhaXQgdCgpfSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbik7YnJlYWs7Y2FzZSJ1c2VhY2NvdW50Ijp3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJ1c2luZ2FjY291bnQiLGFjY291bnRJZDphd2FpdCByKGUuZGF0YS5zZWNyZXRLZXkpfSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbik7YnJlYWs7Y2FzZSJhc2tfYWkiOmNvbnN0IG49YXdhaXQgbyhhd2FpdCBzKFt7cm9sZToidXNlciIsY29udGVudDplLmRhdGEuYWlxdWVzdGlvbn1dKSk7d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWlyZXNwb25zZSIsYWlyZXNwb25zZTpufSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbil9fSxjb25zb2xlLmxvZygiaWZyYW1lIGxvYWRlZCIpO2V4cG9ydHtzIGFzIGNyZWF0ZV9hc2tfYWlfcmVxdWVzdF9ib2R5LG8gYXMgc2VuZF9hc2tfYWlfcmVxdWVzdH07Cjwvc2NyaXB0Pgo8L2h0bWw+" style={{ width: '0px', height: '0px', border: 'none' }}></iframe>;

return <>
    <p>Using account {state.accountId}</p>
    <textarea style={{ width: '100%' }} onChange={e => State.update({ aiquestion: e.target.value })} value={state.aiquestion}></textarea>
    <button onClick={ask_ai}>Ask AI</button>
    <Markdown text={state.airesponse} />

    <p><pre>{secretKey}</pre></p>
    {iframe}
</>;