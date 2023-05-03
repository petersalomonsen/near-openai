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

const iframe = <iframe message={state.iframeMessage} onMessage={handleMessage} src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgogICAgPGhlYWQ+CiAgICAgICAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiPgogICAgICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICAgIDwvaGVhZD4KICAgIDxib2R5PgogICAgICAgIDxhdWRpbyBpZD0icGxheWVyIiBjb250cm9scyBjb250cm9sc0xpc3Q9Im5vZG93bmxvYWQiPjwvYXVkaW8+CiAgICAgICAgPGRpdiBpZD0ibG9hZGVycHJvZ3Jlc3MiPjwvZGl2PgogICAgPC9ib2R5PgogICAgPHNjcmlwdCB0eXBlPSJtb2R1bGUiPmltcG9ydCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL25lYXItYXBpLWpzQDIuMS4zL2Rpc3QvbmVhci1hcGktanMubWluLmpzIjtpbXBvcnQiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9qcy1zaGEyNTZAMC45LjAvc3JjL3NoYTI1Ni5taW4uanMiO2NvbnN0IGU9Im1haW5uZXQiLGE9bmV3IG5lYXJBcGkua2V5U3RvcmVzLkluTWVtb3J5S2V5U3RvcmU7bGV0IHQ7Y29uc3Qgbj17a2V5U3RvcmU6YSxuZXR3b3JrSWQ6ZSxub2RlVXJsOmBodHRwczovL3JwYy4ke2V9Lm5lYXIub3JnYCx3YWxsZXRVcmw6YGh0dHBzOi8vd2FsbGV0LiR7ZX0ubmVhci5vcmdgLGhlbHBlclVybDpgaHR0cHM6Ly9oZWxwZXIuJHtlfS5uZWFyLm9yZ2AsZXhwbG9yZXJVcmw6YGh0dHBzOi8vZXhwbG9yZXIuJHtlfS5uZWFyLm9yZ2B9O2FzeW5jIGZ1bmN0aW9uIHMocyl7Y29uc3Qgcj1uZWFyQXBpLnV0aWxzLktleVBhaXIuZnJvbVN0cmluZyhzKSxvPUJ1ZmZlci5mcm9tKHIucHVibGljS2V5LmRhdGEpLnRvU3RyaW5nKCJoZXgiKTthd2FpdCBhLnNldEtleShlLG8scik7Y29uc3QgaT1hd2FpdCBuZWFyQXBpLmNvbm5lY3Qobik7cmV0dXJuIHQ9YXdhaXQgaS5hY2NvdW50KG8pLG99YXN5bmMgZnVuY3Rpb24gcihlKXt0cnl7Y29uc3QgYT1hd2FpdCBhc3luYyBmdW5jdGlvbihlKXtjb25zdCBhPXQuYWNjb3VudElkLG49SlNPTi5zdHJpbmdpZnkoZSkscz1zaGEyNTYobikscj1hd2FpdCB0LmNvbm5lY3Rpb24uc2lnbmVyLmdldFB1YmxpY0tleSh0LmFjY291bnRJZCx0LmNvbm5lY3Rpb24ubmV0d29ya0lkKSxvPShhd2FpdCB0LmZpbmRBY2Nlc3NLZXkoKSkuYWNjZXNzS2V5LGk9KytvLm5vbmNlLGM9bmVhckFwaS51dGlscy5zZXJpYWxpemUuYmFzZV9kZWNvZGUoby5ibG9ja19oYXNoKSxsPW5lYXJBcGkudHJhbnNhY3Rpb25zLmNyZWF0ZVRyYW5zYWN0aW9uKHQuYWNjb3VudElkLHIsImpzaW5ydXN0Lm5lYXIiLGksW25lYXJBcGkudHJhbnNhY3Rpb25zLmZ1bmN0aW9uQ2FsbCgiYXNrX2FpIix7bWVzc2FnZV9oYXNoOnN9LCIzMDAwMDAwMDAwMDAwMCIsNTAwMDAwMDAwMDAwMDAwMDAwMDAwMG4pXSxjKSxbZCxwXT1hd2FpdCBuZWFyQXBpLnRyYW5zYWN0aW9ucy5zaWduVHJhbnNhY3Rpb24obCx0LmNvbm5lY3Rpb24uc2lnbmVyLHQuYWNjb3VudElkLHQuY29ubmVjdGlvbi5uZXR3b3JrSWQpO3JldHVybiBKU09OLnN0cmluZ2lmeSh7c2lnbmVkX3RyYW5zYWN0aW9uOkJ1ZmZlci5mcm9tKHAuZW5jb2RlKCkpLnRvU3RyaW5nKCJiYXNlNjQiKSx0cmFuc2FjdGlvbl9oYXNoOm5lYXJBcGkudXRpbHMuc2VyaWFsaXplLmJhc2VfZW5jb2RlKGQpLHNlbmRlcl9hY2NvdW50X2lkOmEsbWVzc2FnZXM6ZX0pfShlKSxuPWF3YWl0IGZldGNoKCJodHRwczovL25lYXItb3BlbmFpLnZlcmNlbC5hcHAvYXBpL29wZW5haSIse21ldGhvZDoiUE9TVCIsYm9keTphfSkudGhlbigoZT0+ZS5qc29uKCkpKTtpZihuLmVycm9yKXRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShuLmVycm9yLG51bGwsMSkpO3JldHVybiBuLmNob2ljZXNbMF0ubWVzc2FnZS5jb250ZW50fWNhdGNoKGUpe3JldHVybiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpLGBVbmZvcnR1bmF0ZWx5LCB0aGVyZSB3YXMgYW4gZXJyb3I6XG5cblxgXGBcYFxuJHtlLm1lc3NhZ2V9XG5cYFxgXGBcbmB9fXdpbmRvdy5vbm1lc3NhZ2U9YXN5bmMgbz0+e3N3aXRjaChnbG9iYWxUaGlzLnBhcmVudE9yaWdpbj1vLm9yaWdpbixjb25zb2xlLmxvZygiaWZyYW1lIGdvdCBtZXNzYWdlIixvLmRhdGEpLG8uZGF0YS5jb21tYW5kKXtjYXNlImNyZWF0ZWFjY291bnQiOmNvbnN0e3NlY3JldEtleTppLGFjY291bnRJZDpjfT1hd2FpdCBhc3luYyBmdW5jdGlvbigpe2NvbnN0IHM9bmVhckFwaS51dGlscy5LZXlQYWlyRWQyNTUxOS5mcm9tUmFuZG9tKCkscj1CdWZmZXIuZnJvbShzLnB1YmxpY0tleS5kYXRhKS50b1N0cmluZygiaGV4Iik7YXdhaXQgYS5zZXRLZXkoZSxyLHMpO2NvbnN0IG89YXdhaXQgbmVhckFwaS5jb25uZWN0KG4pO3JldHVybiB0PWF3YWl0IG8uYWNjb3VudChyKSx7c2VjcmV0S2V5OnMuc2VjcmV0S2V5LGFjY291bnRJZDpyfX0oKTt3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhY2NvdW50Y3JlYXRlZCIsc2VjcmV0S2V5OmksYWNjb3VudElkOmN9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKTticmVhaztjYXNlInVzZWFjY291bnQiOndpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6InVzaW5nYWNjb3VudCIsYWNjb3VudElkOmF3YWl0IHMoby5kYXRhLnNlY3JldEtleSl9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKSxhc3luYyBmdW5jdGlvbigpe2NvbnN0IGU9bmV3IG5lYXJBcGkuQ29udHJhY3QodCwid2ViYXNzZW1ibHltdXNpYy5uZWFyIix7dmlld01ldGhvZHM6WyJ3ZWI0X2dldCJdfSksYT1hd2FpdCBlLndlYjRfZ2V0KHtyZXF1ZXN0OntwYXRoOiIvbXVzaWN3YXNtcy9ncm9vdmVpc2ludGhlY29kZS53YXNtIn19KSxuPWF3YWl0IGZldGNoKGBkYXRhOmFwcGxpY2F0aW9uL3dhc207YmFzZTY0LCR7YS5ib2R5fWApLnRoZW4oKGU9PmUuYXJyYXlCdWZmZXIoKSkpLHM9bmV3IFdvcmtlcihVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFsoKCk9Pntjb25zdCBlPWZ1bmN0aW9uKCl7b25tZXNzYWdlPWFzeW5jIGU9PntpZihlLmRhdGEud2FzbSl7Y29uc3Qgbz1lLmRhdGEuc2FtcGxlcmF0ZSxpPVdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKGUuZGF0YS53YXNtLHtlbnZpcm9ubWVudDp7U0FNUExFUkFURTpvfX0pLGM9KGF3YWl0IGkpLmluc3RhbmNlLmV4cG9ydHMsbD1lLmRhdGEucGF0dGVybnNjaGVkdWxlO2lmKGwpZm9yKGxldCBVPTA7VTxsLmxlbmd0aDtVKyspYy5zZXRNaWRpUGFydFNjaGVkdWxlKFUsbFtVXS5wYXR0ZXJuaW5kZXgsbFtVXS5zdGFydHRpbWUpO2NvbnN0IGQ9ZS5kYXRhLnNvbmdkdXJhdGlvbixwPTEyOCx1PWQqby8xZTMsbT1jLmFsbG9jYXRlU2FtcGxlQnVmZmVyP2MuYWxsb2NhdGVTYW1wbGVCdWZmZXIocCk6Yy5zYW1wbGVidWZmZXIsdz1uZXcgRmxvYXQzMkFycmF5KGMubWVtb3J5LmJ1ZmZlcixtLHApLGY9bmV3IEZsb2F0MzJBcnJheShjLm1lbW9yeS5idWZmZXIsbSs0KnAscCksZz0xMDAseT0zMixoPTI7dmFyIGE9eS84LHQ9aCphO2NvbnN0IGI9aCphKiguMDAxKmQqbytnKnApO3ZhciBuPW5ldyBBcnJheUJ1ZmZlcig0NCtiKSxzPW5ldyBEYXRhVmlldyhuKTtmdW5jdGlvbiByKGUsYSx0KXtmb3IodmFyIG49MDtuPHQubGVuZ3RoO24rKyllLnNldFVpbnQ4KGErbix0LmNoYXJDb2RlQXQobikpfXIocywwLCJSSUZGIikscy5zZXRVaW50MzIoNCwzNitiLCEwKSxyKHMsOCwiV0FWRSIpLHIocywxMiwiZm10ICIpLHMuc2V0VWludDMyKDE2LDE2LCEwKSxzLnNldFVpbnQxNigyMCwzLCEwKSxzLnNldFVpbnQxNigyMixoLCEwKSxzLnNldFVpbnQzMigyNCxvLCEwKSxzLnNldFVpbnQzMigyOCxvKnQsITApLHMuc2V0VWludDE2KDMyLHQsITApLHMuc2V0VWludDE2KDM0LHksITApLHIocywzNiwiZGF0YSIpLHMuc2V0VWludDMyKDQwLGIsITApO2xldCBBPTQ0LFM9MDtmb3IoO1M8dTspe2ZvcihsZXQgST0wO0k8ZztJKyspe251bGwhPWMucGxheUV2ZW50c0FuZEZpbGxTYW1wbGVCdWZmZXI/Yy5wbGF5RXZlbnRzQW5kRmlsbFNhbXBsZUJ1ZmZlcigpOmMuZmlsbFNhbXBsZUJ1ZmZlcigpO2ZvcihsZXQgSz0wO0s8cDtLKyspcy5zZXRGbG9hdDMyKEEsd1tLXSwhMCksQSs9NCxzLnNldEZsb2F0MzIoQSxmW0tdLCEwKSxBKz00O1MrPXB9cG9zdE1lc3NhZ2Uoe3Byb2dyZXNzOlMvdX0pLGF3YWl0IG5ldyBQcm9taXNlKChlPT5zZXRUaW1lb3V0KGUsMCkpKX1wb3N0TWVzc2FnZSh7bXVzaWNkYXRhOm59LFtuXSl9fX0udG9TdHJpbmcoKTtyZXR1cm4gZS5zdWJzdHJpbmcoZS5pbmRleE9mKCJ7IikrMSxlLmxhc3RJbmRleE9mKCJ9IikpfSkoKV0se3R5cGU6InRleHQvamF2YXNjcmlwdCJ9KSkpLHI9YXdhaXQgbmV3IFByb21pc2UoKGFzeW5jIGU9PntzLnBvc3RNZXNzYWdlKHt3YXNtOm4sc2FtcGxlcmF0ZTo0NDEwMCxzb25nZHVyYXRpb246NmU0fSkscy5vbm1lc3NhZ2U9YT0+e2EuZGF0YS5tdXNpY2RhdGE/ZShhLmRhdGEubXVzaWNkYXRhKTpkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjbG9hZGVycHJvZ3Jlc3MiKS5pbm5lckhUTUw9KDEwMCphLmRhdGEucHJvZ3Jlc3MpLnRvRml4ZWQoMikrIiUifX0pKSxvPWF3YWl0IG5ldyBQcm9taXNlKChlPT57Y29uc3QgYT1uZXcgRmlsZVJlYWRlcjthLm9ubG9hZD0oKT0+ZShhLnJlc3VsdCksYS5yZWFkQXNEYXRhVVJMKG5ldyBCbG9iKFtyXSx7dHlwZToiYXVkaW8vd2F2In0pKX0pKSxpPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJwbGF5ZXIiKSxjPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNvdXJjZSIpO2Muc3JjPW8sYy50eXBlPSJhdWRpby93YXYiLGkuYXBwZW5kQ2hpbGQoYyl9KCk7YnJlYWs7Y2FzZSJhc2tfYWkiOmNvbnN0IGw9YXdhaXQgcihbe3JvbGU6InVzZXIiLGNvbnRlbnQ6by5kYXRhLmFpcXVlc3Rpb259XSk7d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWlyZXNwb25zZSIsYWlyZXNwb25zZTpsfSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbil9fSx3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJyZWFkeSJ9LCIqIik7Cjwvc2NyaXB0Pgo8L2h0bWw+" style={{ width: '400px', height: '200px', border: 'none' }}></iframe>;

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