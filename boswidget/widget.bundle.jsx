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
    State.update({ iframeMessage: { command: 'ask_ai', aiquestion: state.aiquestion } });
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
            State.update({ airesponse: msg.airesponse });
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

const iframe = <iframe message={state.iframeMessage} onMessage={handleMessage} src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgogICAgPGhlYWQ+CiAgICAgICAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiPgogICAgICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICAgIDwvaGVhZD4KICAgIDxib2R5PgogICAgPC9ib2R5PgogICAgPHNjcmlwdCB0eXBlPSJtb2R1bGUiPmltcG9ydCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL25lYXItYXBpLWpzQDIuMS4zL2Rpc3QvbmVhci1hcGktanMubWluLmpzIjtpbXBvcnQiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9qcy1zaGEyNTZAMC45LjAvc3JjL3NoYTI1Ni5taW4uanMiO2NvbnN0IGU9Im1haW5uZXQiLG49bmV3IG5lYXJBcGkua2V5U3RvcmVzLkluTWVtb3J5S2V5U3RvcmU7bGV0IGE7Y29uc3QgdD17a2V5U3RvcmU6bixuZXR3b3JrSWQ6ZSxub2RlVXJsOmBodHRwczovL3JwYy4ke2V9Lm5lYXIub3JnYCx3YWxsZXRVcmw6YGh0dHBzOi8vd2FsbGV0LiR7ZX0ubmVhci5vcmdgLGhlbHBlclVybDpgaHR0cHM6Ly9oZWxwZXIuJHtlfS5uZWFyLm9yZ2AsZXhwbG9yZXJVcmw6YGh0dHBzOi8vZXhwbG9yZXIuJHtlfS5uZWFyLm9yZ2B9O2FzeW5jIGZ1bmN0aW9uIHIocil7Y29uc3Qgcz1uZWFyQXBpLnV0aWxzLktleVBhaXIuZnJvbVN0cmluZyhyKSxvPUJ1ZmZlci5mcm9tKHMucHVibGljS2V5LmRhdGEpLnRvU3RyaW5nKCJoZXgiKTthd2FpdCBuLnNldEtleShlLG8scyk7Y29uc3QgaT1hd2FpdCBuZWFyQXBpLmNvbm5lY3QodCk7cmV0dXJuIGE9YXdhaXQgaS5hY2NvdW50KG8pLG99YXN5bmMgZnVuY3Rpb24gcyhlKXtjb25zdCBuPWEuYWNjb3VudElkLHQ9SlNPTi5zdHJpbmdpZnkoZSkscj1zaGEyNTYodCkscz1hd2FpdCBhLmNvbm5lY3Rpb24uc2lnbmVyLmdldFB1YmxpY0tleShhLmFjY291bnRJZCxhLmNvbm5lY3Rpb24ubmV0d29ya0lkKSxvPShhd2FpdCBhLmZpbmRBY2Nlc3NLZXkoKSkuYWNjZXNzS2V5O2NvbnNvbGUubG9nKG8pO2NvbnN0IGk9KytvLm5vbmNlLGM9bmVhckFwaS51dGlscy5zZXJpYWxpemUuYmFzZV9kZWNvZGUoby5ibG9ja19oYXNoKSxwPW5lYXJBcGkudHJhbnNhY3Rpb25zLmNyZWF0ZVRyYW5zYWN0aW9uKGEuYWNjb3VudElkLHMsImpzaW5ydXN0Lm5lYXIiLGksW25lYXJBcGkudHJhbnNhY3Rpb25zLmZ1bmN0aW9uQ2FsbCgiYXNrX2FpIix7bWVzc2FnZV9oYXNoOnJ9LCIzMDAwMDAwMDAwMDAwMCIsNTAwMDAwMDAwMDAwMDAwMDAwMDAwMG4pXSxjKSxbZCxsXT1hd2FpdCBuZWFyQXBpLnRyYW5zYWN0aW9ucy5zaWduVHJhbnNhY3Rpb24ocCxhLmNvbm5lY3Rpb24uc2lnbmVyLGEuYWNjb3VudElkLGEuY29ubmVjdGlvbi5uZXR3b3JrSWQpO3JldHVybiBKU09OLnN0cmluZ2lmeSh7c2lnbmVkX3RyYW5zYWN0aW9uOkJ1ZmZlci5mcm9tKGwuZW5jb2RlKCkpLnRvU3RyaW5nKCJiYXNlNjQiKSx0cmFuc2FjdGlvbl9oYXNoOm5lYXJBcGkudXRpbHMuc2VyaWFsaXplLmJhc2VfZW5jb2RlKGQpLHNlbmRlcl9hY2NvdW50X2lkOm4sbWVzc2FnZXM6ZX0pfWFzeW5jIGZ1bmN0aW9uIG8oZSl7dHJ5e2NvbnN0IG49YXdhaXQgZmV0Y2goImh0dHBzOi8vbmVhci1vcGVuYWktZ2l0LWJvc3dpZGdldC1wZXRlcnNhbG9tb25zZW4udmVyY2VsLmFwcC9hcGkvb3BlbmFpIix7bWV0aG9kOiJQT1NUIixib2R5OmV9KS50aGVuKChlPT5lLmpzb24oKSkpO2lmKG4uZXJyb3IpdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KG4uZXJyb3IsbnVsbCwxKSk7cmV0dXJuIG4uY2hvaWNlc1swXS5tZXNzYWdlLmNvbnRlbnR9Y2F0Y2goZSl7cmV0dXJuIGNvbnNvbGUubG9nKGUubWVzc2FnZSksYFVuZm9ydHVuYXRlbHksIHRoZXJlIHdhcyBhbiBlcnJvcjpcblxuXGBcYFxgXG4ke2UubWVzc2FnZX1cblxgXGBcYFxuYH19d2luZG93Lm9ubWVzc2FnZT1hc3luYyBpPT57c3dpdGNoKGdsb2JhbFRoaXMucGFyZW50T3JpZ2luPWkub3JpZ2luLGNvbnNvbGUubG9nKCJpZnJhbWUgZ290IG1lc3NhZ2UiLGkuZGF0YSksaS5kYXRhLmNvbW1hbmQpe2Nhc2UiY3JlYXRlYWNjb3VudCI6Y29uc3R7c2VjcmV0S2V5OmMsYWNjb3VudElkOnB9PWF3YWl0IGFzeW5jIGZ1bmN0aW9uKCl7Y29uc3Qgcj1uZWFyQXBpLnV0aWxzLktleVBhaXJFZDI1NTE5LmZyb21SYW5kb20oKSxzPUJ1ZmZlci5mcm9tKHIucHVibGljS2V5LmRhdGEpLnRvU3RyaW5nKCJoZXgiKTthd2FpdCBuLnNldEtleShlLHMscik7Y29uc3Qgbz1hd2FpdCBuZWFyQXBpLmNvbm5lY3QodCk7cmV0dXJuIGE9YXdhaXQgby5hY2NvdW50KHMpLHtzZWNyZXRLZXk6ci5zZWNyZXRLZXksYWNjb3VudElkOnN9fSgpO3dpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6ImFjY291bnRjcmVhdGVkIixzZWNyZXRLZXk6YyxhY2NvdW50SWQ6cH0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pO2JyZWFrO2Nhc2UidXNlYWNjb3VudCI6d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoidXNpbmdhY2NvdW50IixhY2NvdW50SWQ6YXdhaXQgcihpLmRhdGEuc2VjcmV0S2V5KX0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pO2JyZWFrO2Nhc2UiYXNrX2FpIjpjb25zdCBkPWF3YWl0IG8oYXdhaXQgcyhbe3JvbGU6InVzZXIiLGNvbnRlbnQ6aS5kYXRhLmFpcXVlc3Rpb259XSkpO3dpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6ImFpcmVzcG9uc2UiLGFpcmVzcG9uc2U6ZH0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pfX0sd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoicmVhZHkifSwiKiIpO2V4cG9ydHtzIGFzIGNyZWF0ZV9hc2tfYWlfcmVxdWVzdF9ib2R5LG8gYXMgc2VuZF9hc2tfYWlfcmVxdWVzdH07Cjwvc2NyaXB0Pgo8L2h0bWw+" style={{ width: '0px', height: '0px', border: 'none' }}></iframe>;

const secretKeyToggle = state.showSecretKey ? <>
    <button onClick={() => State.update({ showSecretKey: false })}>Hide</button>
    <input type="text" value={state.secretKey} onChange={e => changeSecretKey(e.target.value)}></input>
</> :
    <button onClick={() => State.update({ showSecretKey: true })}>Show</button>

return <>
    {iframe}
    <textarea style={{ width: '100%' }} onChange={e => State.update({ aiquestion: e.target.value })} value={state.aiquestion}></textarea>
    <button onClick={ask_ai}>Ask AI</button>
    <Markdown text={state.airesponse} />

    <p></p>
    <p>Spending account ID: <pre>{state.accountId}</pre></p>
    <p>Spending account secret key: {secretKeyToggle}</p>
</>;