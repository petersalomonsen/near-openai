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

const iframe = <iframe message={state.iframeMessage} onMessage={handleMessage} src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgogICAgPGhlYWQ+CiAgICAgICAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiPgogICAgICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICAgIDwvaGVhZD4KICAgIDxib2R5PgogICAgICAgIDxidXR0b24gaWQ9InBsYXlidXR0b24iPnBsYXk8L2J1dHRvbj4KICAgICAgICA8ZGl2IGlkPSJsb2FkZXJwcm9ncmVzcyI+PC9kaXY+CiAgICA8L2JvZHk+CiAgICA8c2NyaXB0IHR5cGU9Im1vZHVsZSI+aW1wb3J0Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbmVhci1hcGktanNAMi4xLjMvZGlzdC9uZWFyLWFwaS1qcy5taW4uanMiO2ltcG9ydCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2pzLXNoYTI1NkAwLjkuMC9zcmMvc2hhMjU2Lm1pbi5qcyI7Y29uc3QgZT0ibWFpbm5ldCIsdD1uZXcgbmVhckFwaS5rZXlTdG9yZXMuSW5NZW1vcnlLZXlTdG9yZTtsZXQgYTtjb25zdCBuPXtrZXlTdG9yZTp0LG5ldHdvcmtJZDplLG5vZGVVcmw6YGh0dHBzOi8vcnBjLiR7ZX0ubmVhci5vcmdgLHdhbGxldFVybDpgaHR0cHM6Ly93YWxsZXQuJHtlfS5uZWFyLm9yZ2AsaGVscGVyVXJsOmBodHRwczovL2hlbHBlci4ke2V9Lm5lYXIub3JnYCxleHBsb3JlclVybDpgaHR0cHM6Ly9leHBsb3Jlci4ke2V9Lm5lYXIub3JnYH07YXN5bmMgZnVuY3Rpb24gcihyKXtjb25zdCBzPW5lYXJBcGkudXRpbHMuS2V5UGFpci5mcm9tU3RyaW5nKHIpLG89QnVmZmVyLmZyb20ocy5wdWJsaWNLZXkuZGF0YSkudG9TdHJpbmcoImhleCIpO2F3YWl0IHQuc2V0S2V5KGUsbyxzKTtjb25zdCBpPWF3YWl0IG5lYXJBcGkuY29ubmVjdChuKTtyZXR1cm4gYT1hd2FpdCBpLmFjY291bnQobyksb31hc3luYyBmdW5jdGlvbiBzKGUpe3RyeXtjb25zdCB0PWF3YWl0IGFzeW5jIGZ1bmN0aW9uKGUpe2NvbnN0IHQ9YS5hY2NvdW50SWQsbj1KU09OLnN0cmluZ2lmeShlKSxyPXNoYTI1NihuKSxzPWF3YWl0IGEuY29ubmVjdGlvbi5zaWduZXIuZ2V0UHVibGljS2V5KGEuYWNjb3VudElkLGEuY29ubmVjdGlvbi5uZXR3b3JrSWQpLG89KGF3YWl0IGEuZmluZEFjY2Vzc0tleSgpKS5hY2Nlc3NLZXksaT0rK28ubm9uY2UsYz1uZWFyQXBpLnV0aWxzLnNlcmlhbGl6ZS5iYXNlX2RlY29kZShvLmJsb2NrX2hhc2gpLGw9bmVhckFwaS50cmFuc2FjdGlvbnMuY3JlYXRlVHJhbnNhY3Rpb24oYS5hY2NvdW50SWQscywianNpbnJ1c3QubmVhciIsaSxbbmVhckFwaS50cmFuc2FjdGlvbnMuZnVuY3Rpb25DYWxsKCJhc2tfYWkiLHttZXNzYWdlX2hhc2g6cn0sIjMwMDAwMDAwMDAwMDAwIiw1MDAwMDAwMDAwMDAwMDAwMDAwMDAwbildLGMpLFt1LGRdPWF3YWl0IG5lYXJBcGkudHJhbnNhY3Rpb25zLnNpZ25UcmFuc2FjdGlvbihsLGEuY29ubmVjdGlvbi5zaWduZXIsYS5hY2NvdW50SWQsYS5jb25uZWN0aW9uLm5ldHdvcmtJZCk7cmV0dXJuIEpTT04uc3RyaW5naWZ5KHtzaWduZWRfdHJhbnNhY3Rpb246QnVmZmVyLmZyb20oZC5lbmNvZGUoKSkudG9TdHJpbmcoImJhc2U2NCIpLHRyYW5zYWN0aW9uX2hhc2g6bmVhckFwaS51dGlscy5zZXJpYWxpemUuYmFzZV9lbmNvZGUodSksc2VuZGVyX2FjY291bnRfaWQ6dCxtZXNzYWdlczplfSl9KGUpLG49YXdhaXQgZmV0Y2goImh0dHBzOi8vbmVhci1vcGVuYWkudmVyY2VsLmFwcC9hcGkvb3BlbmFpIix7bWV0aG9kOiJQT1NUIixib2R5OnR9KS50aGVuKChlPT5lLmpzb24oKSkpO2lmKG4uZXJyb3IpdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KG4uZXJyb3IsbnVsbCwxKSk7cmV0dXJuIG4uY2hvaWNlc1swXS5tZXNzYWdlLmNvbnRlbnR9Y2F0Y2goZSl7cmV0dXJuIGNvbnNvbGUubG9nKGUubWVzc2FnZSksYFVuZm9ydHVuYXRlbHksIHRoZXJlIHdhcyBhbiBlcnJvcjpcblxuXGBcYFxgXG4ke2UubWVzc2FnZX1cblxgXGBcYFxuYH19d2luZG93Lm9ubWVzc2FnZT1hc3luYyBvPT57c3dpdGNoKGdsb2JhbFRoaXMucGFyZW50T3JpZ2luPW8ub3JpZ2luLGNvbnNvbGUubG9nKCJpZnJhbWUgZ290IG1lc3NhZ2UiLG8uZGF0YSksby5kYXRhLmNvbW1hbmQpe2Nhc2UiY3JlYXRlYWNjb3VudCI6Y29uc3R7c2VjcmV0S2V5OmksYWNjb3VudElkOmN9PWF3YWl0IGFzeW5jIGZ1bmN0aW9uKCl7Y29uc3Qgcj1uZWFyQXBpLnV0aWxzLktleVBhaXJFZDI1NTE5LmZyb21SYW5kb20oKSxzPUJ1ZmZlci5mcm9tKHIucHVibGljS2V5LmRhdGEpLnRvU3RyaW5nKCJoZXgiKTthd2FpdCB0LnNldEtleShlLHMscik7Y29uc3Qgbz1hd2FpdCBuZWFyQXBpLmNvbm5lY3Qobik7cmV0dXJuIGE9YXdhaXQgby5hY2NvdW50KHMpLHtzZWNyZXRLZXk6ci5zZWNyZXRLZXksYWNjb3VudElkOnN9fSgpO3dpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6ImFjY291bnRjcmVhdGVkIixzZWNyZXRLZXk6aSxhY2NvdW50SWQ6Y30sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pO2JyZWFrO2Nhc2UidXNlYWNjb3VudCI6d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoidXNpbmdhY2NvdW50IixhY2NvdW50SWQ6YXdhaXQgcihvLmRhdGEuc2VjcmV0S2V5KX0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pLGFzeW5jIGZ1bmN0aW9uKCl7Y29uc3QgZT1uZXcgbmVhckFwaS5Db250cmFjdChhLCJ3ZWJhc3NlbWJseW11c2ljLm5lYXIiLHt2aWV3TWV0aG9kczpbIndlYjRfZ2V0Il19KSx0PWF3YWl0IGUud2ViNF9nZXQoe3JlcXVlc3Q6e3BhdGg6Ii9tdXNpY3dhc21zL2dyb292ZWlzaW50aGVjb2RlLndhc20ifX0pLG49YXdhaXQgZmV0Y2goYGRhdGE6YXBwbGljYXRpb24vd2FzbTtiYXNlNjQsJHt0LmJvZHl9YCkudGhlbigoZT0+ZS5hcnJheUJ1ZmZlcigpKSkscj1uZXcgV29ya2VyKFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoWygoKT0+e2NvbnN0IGU9ZnVuY3Rpb24oKXtvbm1lc3NhZ2U9YXN5bmMgZT0+e2lmKGUuZGF0YS53YXNtKXtjb25zdCB0PWUuZGF0YS5zYW1wbGVyYXRlLGE9V2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoZS5kYXRhLndhc20se2Vudmlyb25tZW50OntTQU1QTEVSQVRFOnR9fSksbj0oYXdhaXQgYSkuaW5zdGFuY2UuZXhwb3J0cyxyPW4uYWxsb2NhdGVQYXR0ZXJucyhlLmRhdGEucGF0dGVybnMubGVuZ3RoL2UuZGF0YS5wYXR0ZXJuTGVuZ3RoKTtuZXcgVWludDhBcnJheShuLm1lbW9yeS5idWZmZXIsciwoMStlLmRhdGEubnVtSW5zdHJ1bWVudHMpKmUuZGF0YS5wYXR0ZXJuTGVuZ3RoKS5zZXQoZS5kYXRhLnBhdHRlcm5zKTtjb25zdCBzPW4uYWxsb2NhdGVJbnN0cnVtZW50UGF0dGVybkxpc3QoMSxlLmRhdGEubnVtSW5zdHJ1bWVudHMpLG89bmV3IFVpbnQ4QXJyYXkobi5tZW1vcnkuYnVmZmVyLHMsZS5kYXRhLm51bUluc3RydW1lbnRzKTtmb3IobGV0IGU9MDtlPG8ubGVuZ3RoO2UrKylvW2VdPWUrMTtuLnNldEJQTShlLmRhdGEuYnBtKTtjb25zdCBpPTEyOCxjPWUuZGF0YS5zb25nZHVyYXRpb24qdC8xZTMsbD1uLmFsbG9jYXRlU2FtcGxlQnVmZmVyP24uYWxsb2NhdGVTYW1wbGVCdWZmZXIoaSk6bi5zYW1wbGVidWZmZXIsdT1uZXcgRmxvYXQzMkFycmF5KG4ubWVtb3J5LmJ1ZmZlcixsLGkpLGQ9bmV3IEZsb2F0MzJBcnJheShuLm1lbW9yeS5idWZmZXIsbCs0KmksaSk7bGV0IGY9MDtjb25zdCBwPW5ldyBBcnJheUJ1ZmZlcig0KmMpLG09bmV3IERhdGFWaWV3KHApLHc9bmV3IEFycmF5QnVmZmVyKDQqYyksZz1uZXcgRGF0YVZpZXcodykseT0xPT09bmV3IFVpbnQ4QXJyYXkobmV3IFVpbnQxNkFycmF5KFsxXSkuYnVmZmVyKVswXTtmb3IoO2Y8Yzspe251bGwhPW4ucGxheUV2ZW50c0FuZEZpbGxTYW1wbGVCdWZmZXI/bi5wbGF5RXZlbnRzQW5kRmlsbFNhbXBsZUJ1ZmZlcigpOm4uZmlsbFNhbXBsZUJ1ZmZlcigpO2ZvcihsZXQgZT0wO2U8aSYmZjxjO2UrKyltLnNldEZsb2F0MzIoNCpmLHVbZV0seSksZy5zZXRGbG9hdDMyKDQqZixkW2VdLHkpLGYrKztwb3N0TWVzc2FnZSh7cHJvZ3Jlc3M6Zi9jfSl9cG9zdE1lc3NhZ2Uoe2xlZnRidWZmZXI6cCxyaWdodGJ1ZmZlcjp3fSxbcCx3XSl9fX0udG9TdHJpbmcoKTtyZXR1cm4gZS5zdWJzdHJpbmcoZS5pbmRleE9mKCJ7IikrMSxlLmxhc3RJbmRleE9mKCJ9IikpfSkoKV0se3R5cGU6InRleHQvamF2YXNjcmlwdCJ9KSkpLHM9NDQxMDAsbz1bImJlbGwiLCJiYXNzIiwicGFkMSIsInBhZDIiLCJwYWQzIiwia2ljayIsInNuYXJlIiwibGVhZCIsImhpaGF0Il0saT17YmVsbDpbNTYsMCw2OCwwLDY2LDAsNjgsMCw2MSwwLDYzLDAsNTksMCw1NiwwXSxiYXNzOlszMiwxLDAsMCwzMiwxLDAsMCwzMCwxLDMyLDAsMzIsMCwzMiwzMF0sa2ljazpbMTIwLDAsMCwwLDEyMCwwLDAsMCwxMjAsMCwwLDAsMTIwLDAsMCwwXSxzbmFyZTpbMCwwLDAsMCwxMDAsMCwwLDAsMCwwLDAsMCwxMDAsMCwwLDBdLGhpaGF0OlszMCwwLDMwLDAsNjAsMCwzMCwwLDMwLDAsMzAsMCw2MCwwLDMwLDBdfSxjPW5ldyBBcnJheSgxNiooby5sZW5ndGgrMSkpO2MuZmlsbCgwKSxvLmZvckVhY2goKChlLHQpPT57aVtlXSYmaVtlXS5mb3JFYWNoKCgoZSxhKT0+Y1sxNioodCsxKSthXT1lKSl9KSk7Y29uc3R7bGVmdGJ1ZmZlcjpsLHJpZ2h0YnVmZmVyOnV9PWF3YWl0IG5ldyBQcm9taXNlKChhc3luYyBlPT57ci5wb3N0TWVzc2FnZSh7d2FzbTpuLHNhbXBsZXJhdGU6cyxzb25nZHVyYXRpb246MmUzLGJwbToxMjAscGF0dGVybkxlbmd0aDoxNixwYXR0ZXJuczpjLG51bUluc3RydW1lbnRzOm8ubGVuZ3RofSksci5vbm1lc3NhZ2U9dD0+e3QuZGF0YS5sZWZ0YnVmZmVyP2UodC5kYXRhKTpkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjbG9hZGVycHJvZ3Jlc3MiKS5pbm5lckhUTUw9KDEwMCp0LmRhdGEucHJvZ3Jlc3MpLnRvRml4ZWQoMikrIiUifX0pKTtsZXQgZDtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicGxheWJ1dHRvbiIpLmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwoKCk9PntpZihkKXJldHVybiBkLmNsb3NlKCksdm9pZChkPW51bGwpO2Q9bmV3IEF1ZGlvQ29udGV4dDtjb25zdCBlPWQuY3JlYXRlQnVmZmVyKDIsODgyMDAscyk7ZS5nZXRDaGFubmVsRGF0YSgwKS5zZXQobmV3IEZsb2F0MzJBcnJheShsKSksZS5nZXRDaGFubmVsRGF0YSgxKS5zZXQobmV3IEZsb2F0MzJBcnJheSh1KSk7Y29uc3QgdD1kLmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO3QuYnVmZmVyPWUsdC5jb25uZWN0KGQuZGVzdGluYXRpb24pLHQubG9vcD0hMCx0LnN0YXJ0KDApfSkpfSgpO2JyZWFrO2Nhc2UiYXNrX2FpIjpjb25zdCBsPWF3YWl0IHMoW3tyb2xlOiJ1c2VyIixjb250ZW50Om8uZGF0YS5haXF1ZXN0aW9ufV0pO3dpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6ImFpcmVzcG9uc2UiLGFpcmVzcG9uc2U6bH0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pfX0sd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoicmVhZHkifSwiKiIpOwo8L3NjcmlwdD4KPC9odG1sPg==" style={{ width: '400px', height: '200px', border: 'none' }}></iframe>;

const secretKeyToggle = state.showSecretKey ? <>
    <button onClick={() => State.update({ showSecretKey: false })}>Hide</button>
    <input type="text" value={state.secretKey} onChange={e => changeSecretKey(e.target.value)}></input>
</> :
    <button onClick={() => State.update({ showSecretKey: true })}>Show</button>

return <>
    <p><b>NOTE:</b> Each request costs about 0.005 NEAR. Make sure the spending account below is funded, and you can also get full access to
        that account by using the secret key. Only you have the key to this account, so don't loose it.</p>
    
    <textarea style={{ width: '100%' }} onChange={e => State.update({ aiquestion: e.target.value })} value={state.aiquestion}></textarea>
    {state.progress ? <Progress.Root>
        <Progress.Indicator state="indeterminate" />
    </Progress.Root> : <button onClick={ask_ai}>Ask ChatGPT</button>}

    <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5' }}>
        <Markdown text={state.airesponse} />
    </div>

    {iframe}
    <p><br /></p>

    <p></p>
    <p>Spending account ID: <pre>{state.accountId}</pre></p>
    <p>Spending account secret key: {secretKeyToggle}</p>
</>;