const secretKey = Storage.privateGet("secretKey");

State.init({airesponse: ''});

let iframeMessage = {
    command: 'createaccount'
};

if (secretKey) {
    iframeMessage.command = 'useaccount'
    iframeMessage.secretKey = secretKey;
}

function handleMessage(msg) {
    switch (msg.command) {
        case 'accountcreated':
            Storage.privateSet('secretKey', msg.secretKey);
            break;
        case 'airesponse':
            State.update({airesponse: msg.airesponse});
            break;
    }
}

return <>
    <iframe message={iframeMessage} onMessage={handleMessage} src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgogICAgPGhlYWQ+CiAgICAgICAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiPgogICAgICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICAgIDwvaGVhZD4KICAgIDxib2R5PgogICAgICAgIDx0ZXh0YXJlYSBpZD0icXVlc3Rpb250ZXh0YXJlYSI+PC90ZXh0YXJlYT4KICAgICAgICA8YnV0dG9uIGlkPSJhc2tfYWlfYnV0dG9uIj5Bc2sgQUk8L2J1dHRvbj4KICAgICAgICA8cD4KICAgICAgICAgICAgU3BlbmRpbmcgZnVuZHMgZnJvbSBhY2NvdW50OiA8c3BhbiBpZD0iYWNjb3VudGlkc3BhbiI+PC9zcGFuPgogICAgICAgIDwvcD4KICAgIDwvYm9keT4KICAgIDxzY3JpcHQgdHlwZT0ibW9kdWxlIj5pbXBvcnQiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9uZWFyLWFwaS1qc0AyLjEuMy9kaXN0L25lYXItYXBpLWpzLm1pbi5qcyI7aW1wb3J0Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vanMtc2hhMjU2QDAuOS4wL3NyYy9zaGEyNTYubWluLmpzIjtjb25zdCBlPSJtYWlubmV0IixuPW5ldyBuZWFyQXBpLmtleVN0b3Jlcy5Jbk1lbW9yeUtleVN0b3JlLHQ9e2tleVN0b3JlOm4sbmV0d29ya0lkOmUsbm9kZVVybDpgaHR0cHM6Ly9ycGMuJHtlfS5uZWFyLm9yZ2Asd2FsbGV0VXJsOmBodHRwczovL3dhbGxldC4ke2V9Lm5lYXIub3JnYCxoZWxwZXJVcmw6YGh0dHBzOi8vaGVscGVyLiR7ZX0ubmVhci5vcmdgLGV4cGxvcmVyVXJsOmBodHRwczovL2V4cGxvcmVyLiR7ZX0ubmVhci5vcmdgfTthc3luYyBmdW5jdGlvbiBhKCl7Y29uc3QgdD1uZWFyQXBpLnV0aWxzLktleVBhaXJFZDI1NTE5LmZyb21SYW5kb20oKSxhPUJ1ZmZlci5mcm9tKHQucHVibGljS2V5LmRhdGEpLnRvU3RyaW5nKCJoZXgiKTtyZXR1cm4gYXdhaXQgbi5zZXRLZXkoZSxhLHQpLHQuc2VjcmV0S2V5fWFzeW5jIGZ1bmN0aW9uIHIoYSl7Y29uc3Qgcj1hd2FpdCBuZWFyQXBpLmNvbm5lY3QodCkscz1hd2FpdCByLmFjY291bnQoKGF3YWl0IG4uZ2V0QWNjb3VudHMoZSkpWzBdKSxvPXMuYWNjb3VudElkLGk9SlNPTi5zdHJpbmdpZnkoYSksYz0xMDAwMDAwMDAwMDAwMDAwMDAwMG4qQmlnSW50KGkubGVuZ3RoKSxsPXNoYTI1NihpKSxkPWF3YWl0IHMuY29ubmVjdGlvbi5zaWduZXIuZ2V0UHVibGljS2V5KHMuYWNjb3VudElkLHMuY29ubmVjdGlvbi5uZXR3b3JrSWQpLHA9KGF3YWl0IHMuZmluZEFjY2Vzc0tleSgpKS5hY2Nlc3NLZXk7Y29uc29sZS5sb2cocCk7Y29uc3QgZz0rK3Aubm9uY2UsdT1uZWFyQXBpLnV0aWxzLnNlcmlhbGl6ZS5iYXNlX2RlY29kZShwLmJsb2NrX2hhc2gpLG09bmVhckFwaS50cmFuc2FjdGlvbnMuY3JlYXRlVHJhbnNhY3Rpb24ocy5hY2NvdW50SWQsZCwianNpbnJ1c3QubmVhciIsZyxbbmVhckFwaS50cmFuc2FjdGlvbnMuZnVuY3Rpb25DYWxsKCJhc2tfYWkiLHttZXNzYWdlX2hhc2g6bH0sIjMwMDAwMDAwMDAwMDAwIixjKV0sdSksW2gseV09YXdhaXQgbmVhckFwaS50cmFuc2FjdGlvbnMuc2lnblRyYW5zYWN0aW9uKG0scy5jb25uZWN0aW9uLnNpZ25lcixzLmFjY291bnRJZCxzLmNvbm5lY3Rpb24ubmV0d29ya0lkKTtyZXR1cm4gSlNPTi5zdHJpbmdpZnkoe3NpZ25lZF90cmFuc2FjdGlvbjpCdWZmZXIuZnJvbSh5LmVuY29kZSgpKS50b1N0cmluZygiYmFzZTY0IiksdHJhbnNhY3Rpb25faGFzaDpuZWFyQXBpLnV0aWxzLnNlcmlhbGl6ZS5iYXNlX2VuY29kZShoKSxzZW5kZXJfYWNjb3VudF9pZDpvLG1lc3NhZ2VzOmF9KX1hc3luYyBmdW5jdGlvbiBzKGUpe3RyeXtjb25zdCBuPWF3YWl0IGZldGNoKCJodHRwczovL25lYXItb3BlbmFpLWdpdC1ib3N3aWRnZXQtcGV0ZXJzYWxvbW9uc2VuLnZlcmNlbC5hcHAvYXBpL29wZW5haSIse21ldGhvZDoiUE9TVCIsYm9keTplfSkudGhlbigoZT0+ZS5qc29uKCkpKTtpZihuLmVycm9yKXRocm93IG5ldyBFcnJvcihKU09OLnN0cmluZ2lmeShuLmVycm9yLG51bGwsMSkpO3JldHVybiBuLmNob2ljZXNbMF0ubWVzc2FnZS5jb250ZW50fWNhdGNoKGUpe3JldHVybiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpLGBVbmZvcnR1bmF0ZWx5LCB0aGVyZSB3YXMgYW4gZXJyb3I6XG5cblxgXGBcYFxuJHtlLm1lc3NhZ2V9XG5cYFxgXGBcbmB9fXdpbmRvdy5vbm1lc3NhZ2U9YXN5bmMgdD0+e3N3aXRjaChnbG9iYWxUaGlzLnBhcmVudE9yaWdpbj10Lm9yaWdpbix0LmRhdGEuY29tbWFuZCl7Y2FzZSJjcmVhdGVhY2NvdW50Ijp3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhY2NvdW50Y3JlYXRlZCIsc2VjcmV0S2V5OmF3YWl0IGEoKX0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pO2JyZWFrO2Nhc2UidXNlYWNjb3VudCI6IWFzeW5jIGZ1bmN0aW9uKHQpe2NvbnN0IGE9bmVhckFwaS51dGlscy5LZXlQYWlyLmZyb21TdHJpbmcodCkscj1CdWZmZXIuZnJvbShhLnB1YmxpY0tleS5kYXRhKS50b1N0cmluZygiaGV4Iik7YXdhaXQgbi5zZXRLZXkoZSxyLGEpLGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJhY2NvdW50aWRzcGFuIikuaW5uZXJIVE1MPXJ9KHQuZGF0YS5zZWNyZXRLZXkpfX0sZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImFza19haV9idXR0b24iKS5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsKGFzeW5jKCk9Pntjb25zdCBlPWF3YWl0IHIoW3tyb2xlOiJ1c2VyIixjb250ZW50OmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJxdWVzdGlvbnRleHRhcmVhIikudmFsdWV9XSk7Y29uc29sZS5sb2coZSk7Y29uc3Qgbj1hd2FpdCBzKGUpO2NvbnNvbGUubG9nKG4pLHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6ImFpcmVzcG9uc2UiLGFpcmVzcG9uc2U6bn0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pfSkpO2V4cG9ydHtyIGFzIGNyZWF0ZV9hc2tfYWlfcmVxdWVzdF9ib2R5LHMgYXMgc2VuZF9hc2tfYWlfcmVxdWVzdH07Cjwvc2NyaXB0Pgo8L2h0bWw+" style={{width: '640px', height: '400px'}}></iframe>
    <Markdown text={state.airesponse} />
    <p><pre>{secretKey}</pre></p>
</>;