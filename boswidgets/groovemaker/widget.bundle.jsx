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

const iframe = <iframe message={state.iframeMessage} onMessage={handleMessage} src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgogICAgPGhlYWQ+CiAgICAgICAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiPgogICAgICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICAgIDwvaGVhZD4KICAgIDxib2R5PgogICAgICAgIDxidXR0b24gaWQ9InBsYXlidXR0b24iPnBsYXk8L2J1dHRvbj4KICAgICAgICA8ZGl2IGlkPSJsb2FkZXJwcm9ncmVzcyI+PC9kaXY+CiAgICA8L2JvZHk+CiAgICA8c2NyaXB0IHR5cGU9Im1vZHVsZSI+aW1wb3J0Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbmVhci1hcGktanNAMi4xLjMvZGlzdC9uZWFyLWFwaS1qcy5taW4uanMiO2ltcG9ydCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2pzLXNoYTI1NkAwLjkuMC9zcmMvc2hhMjU2Lm1pbi5qcyI7Y29uc3QgZT0ibWFpbm5ldCIsYT1uZXcgbmVhckFwaS5rZXlTdG9yZXMuSW5NZW1vcnlLZXlTdG9yZTtsZXQgdDtjb25zdCBuPXtrZXlTdG9yZTphLG5ldHdvcmtJZDplLG5vZGVVcmw6YGh0dHBzOi8vcnBjLiR7ZX0ubmVhci5vcmdgLHdhbGxldFVybDpgaHR0cHM6Ly93YWxsZXQuJHtlfS5uZWFyLm9yZ2AsaGVscGVyVXJsOmBodHRwczovL2hlbHBlci4ke2V9Lm5lYXIub3JnYCxleHBsb3JlclVybDpgaHR0cHM6Ly9leHBsb3Jlci4ke2V9Lm5lYXIub3JnYH07YXN5bmMgZnVuY3Rpb24gcihyKXtjb25zdCBzPW5lYXJBcGkudXRpbHMuS2V5UGFpci5mcm9tU3RyaW5nKHIpLG89QnVmZmVyLmZyb20ocy5wdWJsaWNLZXkuZGF0YSkudG9TdHJpbmcoImhleCIpO2F3YWl0IGEuc2V0S2V5KGUsbyxzKTtjb25zdCBpPWF3YWl0IG5lYXJBcGkuY29ubmVjdChuKTtyZXR1cm4gdD1hd2FpdCBpLmFjY291bnQobyksb31hc3luYyBmdW5jdGlvbiBzKGUpe3RyeXtjb25zdCBhPWF3YWl0IGFzeW5jIGZ1bmN0aW9uKGUpe2NvbnN0IGE9dC5hY2NvdW50SWQsbj1KU09OLnN0cmluZ2lmeShlKSxyPXNoYTI1NihuKSxzPWF3YWl0IHQuY29ubmVjdGlvbi5zaWduZXIuZ2V0UHVibGljS2V5KHQuYWNjb3VudElkLHQuY29ubmVjdGlvbi5uZXR3b3JrSWQpLG89KGF3YWl0IHQuZmluZEFjY2Vzc0tleSgpKS5hY2Nlc3NLZXksaT0rK28ubm9uY2UsYz1uZWFyQXBpLnV0aWxzLnNlcmlhbGl6ZS5iYXNlX2RlY29kZShvLmJsb2NrX2hhc2gpLGw9bmVhckFwaS50cmFuc2FjdGlvbnMuY3JlYXRlVHJhbnNhY3Rpb24odC5hY2NvdW50SWQscywianNpbnJ1c3QubmVhciIsaSxbbmVhckFwaS50cmFuc2FjdGlvbnMuZnVuY3Rpb25DYWxsKCJhc2tfYWkiLHttZXNzYWdlX2hhc2g6cn0sIjMwMDAwMDAwMDAwMDAwIiw1MDAwMDAwMDAwMDAwMDAwMDAwMDAwbildLGMpLFt1LGRdPWF3YWl0IG5lYXJBcGkudHJhbnNhY3Rpb25zLnNpZ25UcmFuc2FjdGlvbihsLHQuY29ubmVjdGlvbi5zaWduZXIsdC5hY2NvdW50SWQsdC5jb25uZWN0aW9uLm5ldHdvcmtJZCk7cmV0dXJuIEpTT04uc3RyaW5naWZ5KHtzaWduZWRfdHJhbnNhY3Rpb246QnVmZmVyLmZyb20oZC5lbmNvZGUoKSkudG9TdHJpbmcoImJhc2U2NCIpLHRyYW5zYWN0aW9uX2hhc2g6bmVhckFwaS51dGlscy5zZXJpYWxpemUuYmFzZV9lbmNvZGUodSksc2VuZGVyX2FjY291bnRfaWQ6YSxtZXNzYWdlczplfSl9KGUpLG49YXdhaXQgZmV0Y2goImh0dHBzOi8vbmVhci1vcGVuYWkudmVyY2VsLmFwcC9hcGkvb3BlbmFpIix7bWV0aG9kOiJQT1NUIixib2R5OmF9KS50aGVuKChlPT5lLmpzb24oKSkpO2lmKG4uZXJyb3IpdGhyb3cgbmV3IEVycm9yKEpTT04uc3RyaW5naWZ5KG4uZXJyb3IsbnVsbCwxKSk7cmV0dXJuIG4uY2hvaWNlc1swXS5tZXNzYWdlLmNvbnRlbnR9Y2F0Y2goZSl7cmV0dXJuIGNvbnNvbGUubG9nKGUubWVzc2FnZSksYFVuZm9ydHVuYXRlbHksIHRoZXJlIHdhcyBhbiBlcnJvcjpcblxuXGBcYFxgXG4ke2UubWVzc2FnZX1cblxgXGBcYFxuYH19d2luZG93Lm9ubWVzc2FnZT1hc3luYyBvPT57c3dpdGNoKGdsb2JhbFRoaXMucGFyZW50T3JpZ2luPW8ub3JpZ2luLGNvbnNvbGUubG9nKCJpZnJhbWUgZ290IG1lc3NhZ2UiLG8uZGF0YSksby5kYXRhLmNvbW1hbmQpe2Nhc2UiY3JlYXRlYWNjb3VudCI6Y29uc3R7c2VjcmV0S2V5OmksYWNjb3VudElkOmN9PWF3YWl0IGFzeW5jIGZ1bmN0aW9uKCl7Y29uc3Qgcj1uZWFyQXBpLnV0aWxzLktleVBhaXJFZDI1NTE5LmZyb21SYW5kb20oKSxzPUJ1ZmZlci5mcm9tKHIucHVibGljS2V5LmRhdGEpLnRvU3RyaW5nKCJoZXgiKTthd2FpdCBhLnNldEtleShlLHMscik7Y29uc3Qgbz1hd2FpdCBuZWFyQXBpLmNvbm5lY3Qobik7cmV0dXJuIHQ9YXdhaXQgby5hY2NvdW50KHMpLHtzZWNyZXRLZXk6ci5zZWNyZXRLZXksYWNjb3VudElkOnN9fSgpO3dpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6ImFjY291bnRjcmVhdGVkIixzZWNyZXRLZXk6aSxhY2NvdW50SWQ6Y30sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pO2JyZWFrO2Nhc2UidXNlYWNjb3VudCI6d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoidXNpbmdhY2NvdW50IixhY2NvdW50SWQ6YXdhaXQgcihvLmRhdGEuc2VjcmV0S2V5KX0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pLGFzeW5jIGZ1bmN0aW9uKCl7Y29uc3QgZT1uZXcgbmVhckFwaS5Db250cmFjdCh0LCJ3ZWJhc3NlbWJseW11c2ljLm5lYXIiLHt2aWV3TWV0aG9kczpbIndlYjRfZ2V0Il19KSxhPWF3YWl0IGUud2ViNF9nZXQoe3JlcXVlc3Q6e3BhdGg6Ii9tdXNpY3dhc21zL2dyb292ZWlzaW50aGVjb2RlLndhc20ifX0pLG49YXdhaXQgZmV0Y2goYGRhdGE6YXBwbGljYXRpb24vd2FzbTtiYXNlNjQsJHthLmJvZHl9YCkudGhlbigoZT0+ZS5hcnJheUJ1ZmZlcigpKSkscj1uZXcgV29ya2VyKFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoWygoKT0+e2NvbnN0IGU9ZnVuY3Rpb24oKXtvbm1lc3NhZ2U9YXN5bmMgZT0+e2lmKGUuZGF0YS53YXNtKXtjb25zdCBhPWUuZGF0YS5zYW1wbGVyYXRlLHQ9V2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoZS5kYXRhLndhc20se2Vudmlyb25tZW50OntTQU1QTEVSQVRFOmF9fSksbj0oYXdhaXQgdCkuaW5zdGFuY2UuZXhwb3J0cyxyPW4uYWxsb2NhdGVQYXR0ZXJucyhlLmRhdGEucGF0dGVybnMubGVuZ3RoLzE2KTtuZXcgVWludDhBcnJheShuLm1lbW9yeS5idWZmZXIscixlLmRhdGEucGF0dGVybnMubGVuZ3RoKS5zZXQoZS5kYXRhLnBhdHRlcm5zKTtjb25zdCBzPWUuZGF0YS5wYXR0ZXJuTGVuZ3RoLzE2LG89bi5hbGxvY2F0ZUluc3RydW1lbnRQYXR0ZXJuTGlzdChzLGUuZGF0YS5udW1JbnN0cnVtZW50cyksaT1uZXcgVWludDhBcnJheShuLm1lbW9yeS5idWZmZXIsbyxlLmRhdGEubnVtSW5zdHJ1bWVudHMqcyk7Zm9yKGxldCBlPTA7ZTxpLmxlbmd0aDtlKyspaVtlXT1lO2NvbnNvbGUubG9nKGkpLG4uc2V0QlBNKGUuZGF0YS5icG0pO2NvbnN0IGM9MTI4LGw9ZS5kYXRhLnNvbmdkdXJhdGlvbiphLzFlMyx1PW4uYWxsb2NhdGVTYW1wbGVCdWZmZXI/bi5hbGxvY2F0ZVNhbXBsZUJ1ZmZlcihjKTpuLnNhbXBsZWJ1ZmZlcixkPW5ldyBGbG9hdDMyQXJyYXkobi5tZW1vcnkuYnVmZmVyLHUsYyksZj1uZXcgRmxvYXQzMkFycmF5KG4ubWVtb3J5LmJ1ZmZlcix1KzQqYyxjKTtsZXQgcD0wO2NvbnN0IG09bmV3IEFycmF5QnVmZmVyKDQqbCksZz1uZXcgRGF0YVZpZXcobSksdz1uZXcgQXJyYXlCdWZmZXIoNCpsKSx5PW5ldyBEYXRhVmlldyh3KSxoPTE9PT1uZXcgVWludDhBcnJheShuZXcgVWludDE2QXJyYXkoWzFdKS5idWZmZXIpWzBdO2Zvcig7cDxsOyl7bnVsbCE9bi5wbGF5RXZlbnRzQW5kRmlsbFNhbXBsZUJ1ZmZlcj9uLnBsYXlFdmVudHNBbmRGaWxsU2FtcGxlQnVmZmVyKCk6bi5maWxsU2FtcGxlQnVmZmVyKCk7Zm9yKGxldCBlPTA7ZTxjJiZwPGw7ZSsrKWcuc2V0RmxvYXQzMig0KnAsZFtlXSxoKSx5LnNldEZsb2F0MzIoNCpwLGZbZV0saCkscCsrO3Bvc3RNZXNzYWdlKHtwcm9ncmVzczpwL2x9KX1wb3N0TWVzc2FnZSh7bGVmdGJ1ZmZlcjptLHJpZ2h0YnVmZmVyOnd9LFttLHddKX19fS50b1N0cmluZygpO3JldHVybiBlLnN1YnN0cmluZyhlLmluZGV4T2YoInsiKSsxLGUubGFzdEluZGV4T2YoIn0iKSl9KSgpXSx7dHlwZToidGV4dC9qYXZhc2NyaXB0In0pKSkscz00NDEwMCxvPVsiYmVsbCIsImJhc3MiLCJwYWQxIiwicGFkMiIsInBhZDMiLCJraWNrIiwic25hcmUiLCJsZWFkIiwiaGloYXQiXSxpPXtiZWxsOls1NiwwLDY4LDAsNjYsMCw2OCwwLDYxLDAsNjMsMCw1OSwwLDU2LDAsNTQsMCw2NiwwLDY0LDAsNjYsMCw1OSwwLDYxLDAsNTgsMCw1NCwwLDYxLDAsNzMsMCw3MSwwLDczLDAsNjYsMCw2OCwwLDU0LDAsNjEsMCw1OSwwLDcxLDAsNzAsMCw3MSwwLDY2LDAsNzEsMCw2NiwwLDU5LDBdLGJhc3M6WzMyLDEsMCwwLDMyLDEsMCwwLDMwLDEsMzIsMCwzMiwwLDMyLDMwLDMwLDEsMCwwLDMwLDEsMCwwLDI4LDEsMzAsMCwzMCwwLDMwLDI4LDM3LDEsMCwwLDM3LDEsMCwwLDM1LDEsMzcsMCwzNywwLDM3LDM1LDM1LDEsMCwwLDM1LDEsMCwwLDMyLDEsMzUsMCwzNSwwLDM1LDMyXSxraWNrOlsxMjAsMCwwLDAsMTIwLDAsMCwwLDEyMCwwLDAsMCwxMjAsMCwwLDAsMTIwLDAsMCwwLDEyMCwwLDAsMCwxMjAsMCwwLDAsMTIwLDAsMCwwLDEyMCwwLDAsMCwxMjAsMCwwLDAsMTIwLDAsMCwwLDEyMCwwLDAsMCwxMjAsMCwwLDAsMTIwLDAsMCw1MCwxMjAsMCwxMDAsMCwxMjAsMCwwLDBdLGxlYWQ6WzAsMCw2MywwLDY4LDEsMSwwLDcwLDEsNzEsMSwwLDAsMCwwLDAsMCw2MSwwLDY2LDEsMSwwLDY4LDEsNzAsMSwwLDAsMCwwLDAsMCw2OCwwLDczLDEsMSwwLDc1LDEsNzYsMSwwLDAsMCwwLDc1LDEsMCwwLDc1LDEsMSwwLDc0LDEsNzUsMSw3MSwxLDY2LDFdLHNuYXJlOlswLDAsMCwwLDEwMCwwLDAsMCwwLDAsMCwwLDEwMCwwLDAsMCwwLDAsMCwwLDEwMCwwLDAsMCwwLDAsMCwwLDEwMCwwLDAsMCwwLDAsMCwwLDEwMCwwLDAsMCwwLDAsMCwwLDEwMCwwLDAsMCwwLDAsMCwwLDEwMCwwLDAsMCwwLDAsODAsMCwxMDAsMCwwLDUwXSxoaWhhdDpbMzAsMCwzMCwwLDYwLDAsMzAsMCwzMCwwLDMwLDAsNjAsMCwzMCwwLDMwLDAsMzAsMCw2MCwwLDMwLDAsMzAsMCwzMCwwLDYwLDAsMzAsMCwzMCwwLDMwLDAsNjAsMCwzMCwwLDMwLDAsMzAsMCw2MCwwLDMwLDAsMzAsMCwzMCwwLDYwLDAsMzAsMCwzMCwwLDMwLDAsNjAsNDAsNjAsMzBdfSxjPW5ldyBBcnJheSg2NCpvLmxlbmd0aCk7Yy5maWxsKDApLG8uZm9yRWFjaCgoKGUsYSk9PntpW2VdJiZpW2VdLmZvckVhY2goKChlLHQpPT5jWzY0KmErdF09ZSkpfSkpO2NvbnN0e2xlZnRidWZmZXI6bCxyaWdodGJ1ZmZlcjp1fT1hd2FpdCBuZXcgUHJvbWlzZSgoYXN5bmMgZT0+e3IucG9zdE1lc3NhZ2Uoe3dhc206bixzYW1wbGVyYXRlOnMsc29uZ2R1cmF0aW9uOjhlMyxicG06MTIwLHBhdHRlcm5MZW5ndGg6NjQscGF0dGVybnM6YyxudW1JbnN0cnVtZW50czpvLmxlbmd0aH0pLHIub25tZXNzYWdlPWE9PnthLmRhdGEubGVmdGJ1ZmZlcj9lKGEuZGF0YSk6ZG9jdW1lbnQucXVlcnlTZWxlY3RvcigiI2xvYWRlcnByb2dyZXNzIikuaW5uZXJIVE1MPSgxMDAqYS5kYXRhLnByb2dyZXNzKS50b0ZpeGVkKDIpKyIlIn19KSk7bGV0IGQ7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInBsYXlidXR0b24iKS5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsKCgpPT57aWYoZClyZXR1cm4gZC5jbG9zZSgpLHZvaWQoZD1udWxsKTtkPW5ldyBBdWRpb0NvbnRleHQ7Y29uc3QgZT1kLmNyZWF0ZUJ1ZmZlcigyLDM1MjgwMCxzKTtlLmdldENoYW5uZWxEYXRhKDApLnNldChuZXcgRmxvYXQzMkFycmF5KGwpKSxlLmdldENoYW5uZWxEYXRhKDEpLnNldChuZXcgRmxvYXQzMkFycmF5KHUpKTtjb25zdCBhPWQuY3JlYXRlQnVmZmVyU291cmNlKCk7YS5idWZmZXI9ZSxhLmNvbm5lY3QoZC5kZXN0aW5hdGlvbiksYS5sb29wPSEwLGEuc3RhcnQoMCl9KSl9KCk7YnJlYWs7Y2FzZSJhc2tfYWkiOmNvbnN0IGw9YXdhaXQgcyhbe3JvbGU6InVzZXIiLGNvbnRlbnQ6by5kYXRhLmFpcXVlc3Rpb259XSk7d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWlyZXNwb25zZSIsYWlyZXNwb25zZTpsfSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbil9fSx3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJyZWFkeSJ9LCIqIik7Cjwvc2NyaXB0Pgo8L2h0bWw+" style={{ width: '400px', height: '200px', border: 'none' }}></iframe>;

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