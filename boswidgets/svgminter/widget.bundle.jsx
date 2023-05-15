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
            Near.call('jsinrustnft.near', 'nft_mint',
                Object.assign({}, msg.args, {
                    title: msg.args.token_id,
                    description: state.aiquestion
                }),
                undefined, (1_000_00000_00000_00000_00000n).toString());
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

const iframe = <iframe message={state.iframeMessage} onMessage={handleMessage} onLoad={init_iframe} src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgo8aGVhZD4KICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICAgIDxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSIgLz4KICAgIDxzdHlsZT4KICAgICAgICBib2R5IHsKICAgICAgICAgICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsKICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4OwogICAgICAgIH0KCiAgICAgICAgaW5wdXQgewogICAgICAgICAgICBwYWRkaW5nOiA1cHg7CiAgICAgICAgICAgIGJvcmRlcjogIzU1YyBzb2xpZCA0cHg7CiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOwogICAgICAgICAgICBjb2xvcjogYmxhY2s7CiAgICAgICAgfQogICAgICAgIGlucHV0Lm1pc3Npbmdvd25lciB7CiAgICAgICAgICAgIGJvcmRlcjogcmVkIHNvbGlkIDZweDsgIAogICAgICAgIH0KCiAgICAgICAgYnV0dG9uIHsKICAgICAgICAgICAgcGFkZGluZzogMTBweDsKICAgICAgICAgICAgYm9yZGVyOiBub25lOwogICAgICAgICAgICBib3JkZXI6ICMxMTQgc29saWQgNHB4OwogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsKICAgICAgICAgICAgY29sb3I6IGJsYWNrOwogICAgICAgIH0KCiAgICAgICAgYnV0dG9uOmhvdmVyIHsKICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTsKICAgICAgICAgICAgY29sb3I6IHdoaXRlOwogICAgICAgIH0KCgogICAgICAgICNwcmV2aWV3cmVzdWx0dmlldyB7CiAgICAgICAgICAgIHdpZHRoOiA1MDBweDsKICAgICAgICAgICAgbWF4LXdpZHRoOiAxMDAlOwogICAgICAgIH0KCiAgICAgICAgYTp2aXNpdGVkLCBhIHsKICAgICAgICAgICAgY29sb3I6IHdoaXRlOwogICAgICAgIH0KCiAgICAgICAgI2NvbnRyYWN0aWRzcGFuIHsKICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7CiAgICAgICAgICAgIGNvbG9yOiBibGFjazsKICAgICAgICAgICAgcGFkZGluZzogNXB4OwogICAgICAgIH0KICAgIDwvc3R5bGU+CjwvaGVhZD4KCjxib2R5PgogICAgPHA+CiAgICAgICAgVG9rZW4gaWQ6IDxpbnB1dCB0eXBlPSJ0ZXh0IiBpZD0idG9rZW5faWRfaW5wdXQiIHZhbHVlPSIyMiIgLz4KICAgICAgICAmbmJzcDsgRm9udCBzaXplOiA8aW5wdXQgdHlwZT0ibnVtYmVyIiBpZD0iZm9udF9zaXplX2lucHV0IiB2YWx1ZT0iMyIgbWluPSIxIiBtYXg9IjQiIC8+CiAgICA8L3A+CiAgICA8cD4KICAgICAgICBPd25lcjogPGlucHV0IHR5cGU9InRleHQiIGlkPSJvd25lcl9pbnB1dCIgdmFsdWU9IiIgLz4KICAgIDwvcD4KICAgIDxidXR0b24gaWQ9Im1pbnRfYnV0dG9uIj5NaW50PC9idXR0b24+CiAgICA8YnV0dG9uIGlkPSJwcmV2aWV3X2J1dHRvbiI+UHJldmlldzwvYnV0dG9uPgogICAgPC9wPgogICAgPGRpdj4KICAgICAgICA8cHJlIGlkPSJtaW50cmVzdWx0dmlldyI+PC9wcmU+CiAgICA8L2Rpdj4KICAgIDxpbnB1dCB0eXBlPSJ0ZXh0IiBpZD0iY29sb3JfaW5wdXQiIHN0eWxlPSJ3aWR0aDogNTBweDtwb3NpdGlvbjogYWJzb2x1dGU7IGRpc3BsYXk6IG5vbmU7IHotaW5kZXg6IDEwMDA7IiAvPgogICAgPGRpdiBpZD0icHJldmlld3Jlc3VsdHZpZXciPgoKICAgIDwvZGl2Pgo8L2JvZHk+CjxzY3JpcHQgdHlwZT0ibW9kdWxlIj5pbXBvcnQiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9uZWFyLWFwaS1qc0AyLjEuMy9kaXN0L25lYXItYXBpLWpzLm1pbi5qcyI7aW1wb3J0Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vanMtc2hhMjU2QDAuOS4wL3NyYy9zaGEyNTYubWluLmpzIjtjb25zdCBlPSJtYWlubmV0Iix0PW5ldyBuZWFyQXBpLmtleVN0b3Jlcy5Jbk1lbW9yeUtleVN0b3JlO2xldCBuO2NvbnN0IGE9e2tleVN0b3JlOnQsbmV0d29ya0lkOmUsbm9kZVVybDpgaHR0cHM6Ly9ycGMuJHtlfS5uZWFyLm9yZ2Asd2FsbGV0VXJsOmBodHRwczovL3dhbGxldC4ke2V9Lm5lYXIub3JnYCxoZWxwZXJVcmw6YGh0dHBzOi8vaGVscGVyLiR7ZX0ubmVhci5vcmdgLGV4cGxvcmVyVXJsOmBodHRwczovL2V4cGxvcmVyLiR7ZX0ubmVhci5vcmdgfSxvPWF3YWl0IG5lYXJBcGkuY29ubmVjdChhKTthc3luYyBmdW5jdGlvbiBzKGEpe2NvbnN0IHM9bmVhckFwaS51dGlscy5LZXlQYWlyLmZyb21TdHJpbmcoYSkscj1CdWZmZXIuZnJvbShzLnB1YmxpY0tleS5kYXRhKS50b1N0cmluZygiaGV4Iik7cmV0dXJuIGF3YWl0IHQuc2V0S2V5KGUscixzKSxuPWF3YWl0IG8uYWNjb3VudChyKSxyfWFzeW5jIGZ1bmN0aW9uIHIoKXtjb25zdCBlPW5ldyBuZWFyQXBpLkNvbnRyYWN0KG4sZCx7dmlld01ldGhvZHM6WyJjYWxsX2pzX2Z1bmMiXX0pLHQ9YXdhaXQgZS5jYWxsX2pzX2Z1bmMoe2Z1bmN0aW9uX25hbWU6InN2Z19wcmV2aWV3Iix0b2tlbl9pZDpkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgidG9rZW5faWRfaW5wdXQiKS52YWx1ZSxmb250X3NpemU6ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImZvbnRfc2l6ZV9pbnB1dCIpLnZhbHVlLGNvbG9yczpjfSk7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInByZXZpZXdyZXN1bHR2aWV3IikuaW5uZXJIVE1MPXQuc3ZnfWFzeW5jIGZ1bmN0aW9uIGkoZSl7d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWlwcm9ncmVzcyIscHJvZ3Jlc3NtZXNzYWdlOiJjcmVhdGluZyByZXF1ZXN0In0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pO2NvbnN0IHQ9YXdhaXQgYXN5bmMgZnVuY3Rpb24oZSl7Y29uc3QgdD1uLmFjY291bnRJZCxhPUpTT04uc3RyaW5naWZ5KGUpLG89c2hhMjU2KGEpLHM9YXdhaXQgbi5jb25uZWN0aW9uLnNpZ25lci5nZXRQdWJsaWNLZXkobi5hY2NvdW50SWQsbi5jb25uZWN0aW9uLm5ldHdvcmtJZCkscj1hd2FpdCBuLmZpbmRBY2Nlc3NLZXkoKTtpZighcil0aHJvdyBuZXcgRXJyb3IoYEFjY291bnQgaGFzIG5vIGZ1bmRzLiBGcm9tIHlvdXIgd2FsbGV0LCBzZW5kIGEgc21hbGwgYW1vdW50IHRvICR7bi5hY2NvdW50SWR9YCk7Y29uc3QgaT1yLmFjY2Vzc0tleSxjPSsraS5ub25jZSxsPW5lYXJBcGkudXRpbHMuc2VyaWFsaXplLmJhc2VfZGVjb2RlKGkuYmxvY2tfaGFzaCksZD1uZWFyQXBpLnRyYW5zYWN0aW9ucy5jcmVhdGVUcmFuc2FjdGlvbihuLmFjY291bnRJZCxzLCJqc2lucnVzdC5uZWFyIixjLFtuZWFyQXBpLnRyYW5zYWN0aW9ucy5mdW5jdGlvbkNhbGwoImFza19haSIse21lc3NhZ2VfaGFzaDpvfSwiMzAwMDAwMDAwMDAwMDAiLDUwMDAwMDAwMDAwMDAwMDAwMDAwMDBuKV0sbCksW3UscF09YXdhaXQgbmVhckFwaS50cmFuc2FjdGlvbnMuc2lnblRyYW5zYWN0aW9uKGQsbi5jb25uZWN0aW9uLnNpZ25lcixuLmFjY291bnRJZCxuLmNvbm5lY3Rpb24ubmV0d29ya0lkKTtyZXR1cm4gSlNPTi5zdHJpbmdpZnkoe3NpZ25lZF90cmFuc2FjdGlvbjpCdWZmZXIuZnJvbShwLmVuY29kZSgpKS50b1N0cmluZygiYmFzZTY0IiksdHJhbnNhY3Rpb25faGFzaDpuZWFyQXBpLnV0aWxzLnNlcmlhbGl6ZS5iYXNlX2VuY29kZSh1KSxzZW5kZXJfYWNjb3VudF9pZDp0LG1lc3NhZ2VzOmV9KX0oZSk7d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWlwcm9ncmVzcyIscHJvZ3Jlc3NtZXNzYWdlOiJzZW5kaW5nIHJlcXVlc3QifSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbik7Y29uc3QgYT1hd2FpdCBmZXRjaCgiaHR0cHM6Ly9uZWFyLW9wZW5haS52ZXJjZWwuYXBwL2FwaS9vcGVuYWlzdHJlYW0iLHttZXRob2Q6IlBPU1QiLGJvZHk6dH0pO2lmKCFhLm9rKXRocm93IG5ldyBFcnJvcihgJHthLnN0YXR1c30gJHthLnN0YXR1c1RleHR9XG4ke2F3YWl0IGEudGV4dCgpfVxuYCk7Y29uc3Qgbz1hLmJvZHkuZ2V0UmVhZGVyKCkscz1bXTtmb3IoOzspe2NvbnN0e2RvbmU6ZSx2YWx1ZTp0fT1hd2FpdCBvLnJlYWQoKTtpZihlKWJyZWFrO2NvbnN0IG49KG5ldyBUZXh0RGVjb2RlcikuZGVjb2RlKHQpO3MucHVzaChuKSx3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhaXByb2dyZXNzIixwcm9ncmVzc21lc3NhZ2U6bn0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pO2xldCBhPXMuam9pbigiIik7Y29uc3Qgcj1hLmluZGV4T2YoIlsiKTtpZihyPi0xKXthPWEuc3Vic3RyaW5nKHIpO2NvbnN0IGU9YS5sYXN0SW5kZXhPZignIiwnKTtpZihlPi0xKXthPWEuc3Vic3RyaW5nKDAsZSsxKSsiXV0iO2NvbnN0IHQ9QXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCIjcHJldmlld3Jlc3VsdHZpZXcgc3ZnIHJlY3QiKSk7SlNPTi5wYXJzZShhKS5mbGF0KCkuZm9yRWFjaCgoKGUsbik9PnRbbl0uYXR0cmlidXRlcy5maWxsLnZhbHVlPWUpKX19fXJldHVybiBzLmpvaW4oIiIpfWxldCBjO2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJtaW50X2J1dHRvbiIpLmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwoYXN5bmMoKT0+e2NvbnN0IGU9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm93bmVyX2lucHV0IiksdD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgib3duZXJfaW5wdXQiKS52YWx1ZTt0PyhlLmNsYXNzTGlzdC5yZW1vdmUoIm1pc3Npbmdvd25lciIpLHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6Im1pbnQiLGFyZ3M6e3Rva2VuX2lkOmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJ0b2tlbl9pZF9pbnB1dCIpLnZhbHVlLHRva2VuX293bmVyX2lkOnQsZm9udF9zaXplOmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJmb250X3NpemVfaW5wdXQiKS52YWx1ZSxjb2xvcnM6Y319LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKSk6ZS5jbGFzc0xpc3QuYWRkKCJtaXNzaW5nb3duZXIiKX0pKTtjb25zdCBsPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJwcmV2aWV3X2J1dHRvbiIpLGQ9ImpzaW5ydXN0bmZ0Lm5lYXIiO2wuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLChhc3luYygpPT57ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInByZXZpZXdyZXN1bHR2aWV3IikuaW5uZXJIVE1MPSJQbGVhc2Ugd2FpdCB3aGlsZSBnZW5lcmF0aW5nIHByZXZpZXciO3RyeXthd2FpdCByKCk7Y29uc3QgZT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiY29sb3JfaW5wdXQiKTtjPVtdLEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgiI3ByZXZpZXdyZXN1bHR2aWV3IHN2ZyByZWN0IikpLmZvckVhY2goKCh0LG4pPT57Yy5wdXNoKHQuYXR0cmlidXRlcy5maWxsLnZhbHVlKSx0LmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwoYT0+e2Uuc3R5bGUudG9wPWAke2EuY2xpZW50WX1weGAsZS5zdHlsZS5sZWZ0PWAke2EuY2xpZW50WH1weGAsZS52YWx1ZT10LmF0dHJpYnV0ZXMuZmlsbC52YWx1ZSxlLnN0eWxlLmRpc3BsYXk9ImJsb2NrIixjb25zb2xlLmxvZyhlKSxlLm9uYmx1cj0oKT0+e3QuYXR0cmlidXRlcy5maWxsLnZhbHVlPWUudmFsdWUsY1tuXT1lLnZhbHVlLGUuc3R5bGUuZGlzcGxheT0ibm9uZSJ9fSkpfSkpfWNhdGNoKGUpe2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJtaW50cmVzdWx0dmlldyIpLmlubmVySFRNTD1lLnRvU3RyaW5nKCl9fSkpLHdpbmRvdy5vbm1lc3NhZ2U9YXN5bmMgbz0+e3N3aXRjaChnbG9iYWxUaGlzLnBhcmVudE9yaWdpbj1vLm9yaWdpbixjb25zb2xlLmxvZygiaWZyYW1lIGdvdCBtZXNzYWdlIixvLmRhdGEpLG8uZGF0YS5jb21tYW5kKXtjYXNlImNyZWF0ZWFjY291bnQiOmNvbnN0e3NlY3JldEtleTpkLGFjY291bnRJZDp1fT1hd2FpdCBhc3luYyBmdW5jdGlvbigpe2NvbnN0IG89bmVhckFwaS51dGlscy5LZXlQYWlyRWQyNTUxOS5mcm9tUmFuZG9tKCkscz1CdWZmZXIuZnJvbShvLnB1YmxpY0tleS5kYXRhKS50b1N0cmluZygiaGV4Iik7YXdhaXQgdC5zZXRLZXkoZSxzLG8pO2NvbnN0IHI9YXdhaXQgbmVhckFwaS5jb25uZWN0KGEpO3JldHVybiBuPWF3YWl0IHIuYWNjb3VudChzKSx7c2VjcmV0S2V5Om8uc2VjcmV0S2V5LGFjY291bnRJZDpzfX0oKTt3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhY2NvdW50Y3JlYXRlZCIsc2VjcmV0S2V5OmQsYWNjb3VudElkOnV9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKTticmVhaztjYXNlInVzZWFjY291bnQiOndpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6InVzaW5nYWNjb3VudCIsYWNjb3VudElkOmF3YWl0IHMoby5kYXRhLnNlY3JldEtleSl9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKTticmVhaztjYXNlImFza19haSI6bGV0IHAsZzt0cnl7Yz1uZXcgQXJyYXkoODEpLmZpbGwoImJsYWNrIiksYXdhaXQgcigpLGc9YXdhaXQgaShbe3JvbGU6InVzZXIiLGNvbnRlbnQ6IkluIHRoZSBuZXh0IG1lc3NhZ2UgdGhlcmUgd2lsbCBiZSBhIGRlc2NyaXB0aW9uIHRoYXQgeW91IHNob3VsZCB1c2UgdG8gY3JlYXRlIDl4OSBwaXhlbCBhcnQsIGFuZCBhcyBpbnNwaXJhdGlvbiBmb3IgYSB3b3JkIHRvIGJlIHVzZWQgYXMgYSB0b2tlbiBpZC4gSWYgdGhlIGRlc2NyaXB0aW9uIGlzIHdlYWssIHRoZW4gYmUgY3JlYXRpdmUuIn0se3JvbGU6InVzZXIiLGNvbnRlbnQ6by5kYXRhLmFpcXVlc3Rpb259LHtyb2xlOiJ1c2VyIixjb250ZW50OiJcbiAgICAgICAgICAgICAgICAgICAgR2l2ZSBtZSBvbmx5IGEganNvbiByZXN1bHQgdGhhdCBJIGNhbiBwYXJzZSBkaXJlY3RseSwgYW5kIG5vIG90aGVyIHN1cnJvdW5kaW5nIGNvbnRleHQuIFRoZSBqc29uIHNob3VsZCBjb250YWluIGEgcHJvcGVydHkgY2FsbGVkIGltYWdlIHdoaWNoIGlzIGEgOXg5IGFycmF5IHdpdGggc3RyaW5nIG9mIENTUyBjb2xvciBjb2RlcyByZXByZXNlbnRpbmcgdGhlIHBpeGVsIGFydC4gVGhlIG90aGVyIHByb3BlcnR5IHNob3VsZCBiZSBuYW1lZCB0b2tlbl9pZCBhbmQgY29udGFpbiB0aGUgd29yZCBmb3IgdGhlIHRva2VuIGlkLiJ9XSk7Y29uc3QgZT1KU09OLnBhcnNlKGcpO2M9ZS5pbWFnZS5mbGF0KCksZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInRva2VuX2lkX2lucHV0IikudmFsdWU9ZS50b2tlbl9pZCxsLmNsaWNrKCl9Y2F0Y2goZSl7cD1gRXJyb3I6XG4ke2UubWVzc2FnZT8/IiJ9XG5cbiR7Zz8/IiJ9XG4gICAgICAgICAgICAgICAgYH13aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhaXJlc3BvbnNlIixhaXJlc3BvbnNlOmcsZXJyb3I6cH0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pfX0sY29uc29sZS5sb2coImlmcmFtZSBsb2FkZWQiKTsKPC9zY3JpcHQ+CjwvaHRtbD4=" style={{ width: '100%', height: '700px', border: 'none' }}></iframe>;

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