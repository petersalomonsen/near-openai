const SECRET_KEY_STORAGE_KEY = 'secretKey';
Storage.privateGet(SECRET_KEY_STORAGE_KEY);

State.init({
    secretKey: null,
    airesponse: '',
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
            State.update({ airesponse: msg.airesponse, progress: false, error: msg.error });
            break;
        case 'usingaccount':
            State.update({ accountId: msg.accountId });
            break;
        case 'ready':
            console.log('ready');
            init_iframe();
            break;
        case 'mint':
            Near.call('jsinrustnft.near', 'nft_mint', msg.args, undefined, (1_000_00000_00000_00000_00000n).toString());
    }
}

const iframe = <iframe message={state.iframeMessage} onMessage={handleMessage} src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgo8aGVhZD4KICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICAgIDxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSIgLz4KICAgIDxzdHlsZT4KICAgICAgICBib2R5IHsKICAgICAgICAgICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsKICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4OwogICAgICAgIH0KCiAgICAgICAgaW5wdXQgewogICAgICAgICAgICBwYWRkaW5nOiA1cHg7CiAgICAgICAgICAgIGJvcmRlcjogIzU1YyBzb2xpZCA0cHg7CiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOwogICAgICAgICAgICBjb2xvcjogYmxhY2s7CiAgICAgICAgfQogICAgICAgIGlucHV0Lm1pc3Npbmdvd25lciB7CiAgICAgICAgICAgIGJvcmRlcjogcmVkIHNvbGlkIDZweDsgIAogICAgICAgIH0KCiAgICAgICAgYnV0dG9uIHsKICAgICAgICAgICAgcGFkZGluZzogMTBweDsKICAgICAgICAgICAgYm9yZGVyOiBub25lOwogICAgICAgICAgICBib3JkZXI6ICMxMTQgc29saWQgNHB4OwogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsKICAgICAgICAgICAgY29sb3I6IGJsYWNrOwogICAgICAgIH0KCiAgICAgICAgYnV0dG9uOmhvdmVyIHsKICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzU1NTsKICAgICAgICAgICAgY29sb3I6IHdoaXRlOwogICAgICAgIH0KCgogICAgICAgICNwcmV2aWV3cmVzdWx0dmlldyB7CiAgICAgICAgICAgIHdpZHRoOiA1MDBweDsKICAgICAgICAgICAgbWF4LXdpZHRoOiAxMDAlOwogICAgICAgIH0KCiAgICAgICAgYTp2aXNpdGVkLCBhIHsKICAgICAgICAgICAgY29sb3I6IHdoaXRlOwogICAgICAgIH0KCiAgICAgICAgI2NvbnRyYWN0aWRzcGFuIHsKICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7CiAgICAgICAgICAgIGNvbG9yOiBibGFjazsKICAgICAgICAgICAgcGFkZGluZzogNXB4OwogICAgICAgIH0KICAgIDwvc3R5bGU+CjwvaGVhZD4KCjxib2R5PgogICAgPHA+CiAgICAgICAgVG9rZW4gaWQ6IDxpbnB1dCB0eXBlPSJ0ZXh0IiBpZD0idG9rZW5faWRfaW5wdXQiIHZhbHVlPSIyMiIgLz4KICAgICAgICAmbmJzcDsgRm9udCBzaXplOiA8aW5wdXQgdHlwZT0ibnVtYmVyIiBpZD0iZm9udF9zaXplX2lucHV0IiB2YWx1ZT0iMyIgbWluPSIxIiBtYXg9IjQiIC8+CiAgICA8L3A+CiAgICA8cD4KICAgICAgICBPd25lcjogPGlucHV0IHR5cGU9InRleHQiIGlkPSJvd25lcl9pbnB1dCIgdmFsdWU9IiIgLz4KICAgIDwvcD4KICAgIDxidXR0b24gaWQ9Im1pbnRfYnV0dG9uIj5NaW50PC9idXR0b24+CiAgICA8YnV0dG9uIGlkPSJwcmV2aWV3X2J1dHRvbiI+UHJldmlldzwvYnV0dG9uPgogICAgPC9wPgogICAgPGRpdj4KICAgICAgICA8cHJlIGlkPSJtaW50cmVzdWx0dmlldyI+PC9wcmU+CiAgICA8L2Rpdj4KICAgIDxpbnB1dCB0eXBlPSJ0ZXh0IiBpZD0iY29sb3JfaW5wdXQiIHN0eWxlPSJ3aWR0aDogNTBweDtwb3NpdGlvbjogYWJzb2x1dGU7IGRpc3BsYXk6IG5vbmU7IHotaW5kZXg6IDEwMDA7IiAvPgogICAgPGRpdiBpZD0icHJldmlld3Jlc3VsdHZpZXciPgoKICAgIDwvZGl2Pgo8L2JvZHk+CjxzY3JpcHQgdHlwZT0ibW9kdWxlIj5pbXBvcnQiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9uZWFyLWFwaS1qc0AyLjEuMy9kaXN0L25lYXItYXBpLWpzLm1pbi5qcyI7aW1wb3J0Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vanMtc2hhMjU2QDAuOS4wL3NyYy9zaGEyNTYubWluLmpzIjtjb25zdCBlPSJtYWlubmV0Iix0PW5ldyBuZWFyQXBpLmtleVN0b3Jlcy5Jbk1lbW9yeUtleVN0b3JlO2xldCBuO2NvbnN0IGE9e2tleVN0b3JlOnQsbmV0d29ya0lkOmUsbm9kZVVybDpgaHR0cHM6Ly9ycGMuJHtlfS5uZWFyLm9yZ2Asd2FsbGV0VXJsOmBodHRwczovL3dhbGxldC4ke2V9Lm5lYXIub3JnYCxoZWxwZXJVcmw6YGh0dHBzOi8vaGVscGVyLiR7ZX0ubmVhci5vcmdgLGV4cGxvcmVyVXJsOmBodHRwczovL2V4cGxvcmVyLiR7ZX0ubmVhci5vcmdgfSxvPWF3YWl0IG5lYXJBcGkuY29ubmVjdChhKTthc3luYyBmdW5jdGlvbiByKGEpe2NvbnN0IHI9bmVhckFwaS51dGlscy5LZXlQYWlyLmZyb21TdHJpbmcoYSksaT1CdWZmZXIuZnJvbShyLnB1YmxpY0tleS5kYXRhKS50b1N0cmluZygiaGV4Iik7cmV0dXJuIGF3YWl0IHQuc2V0S2V5KGUsaSxyKSxuPWF3YWl0IG8uYWNjb3VudChpKSxpfWFzeW5jIGZ1bmN0aW9uIGkoZSl7dHJ5e2NvbnN0IHQ9YXdhaXQgYXN5bmMgZnVuY3Rpb24oZSl7Y29uc3QgdD1uLmFjY291bnRJZCxhPUpTT04uc3RyaW5naWZ5KGUpLG89c2hhMjU2KGEpLHI9YXdhaXQgbi5jb25uZWN0aW9uLnNpZ25lci5nZXRQdWJsaWNLZXkobi5hY2NvdW50SWQsbi5jb25uZWN0aW9uLm5ldHdvcmtJZCksaT0oYXdhaXQgbi5maW5kQWNjZXNzS2V5KCkpLmFjY2Vzc0tleSxzPSsraS5ub25jZSxjPW5lYXJBcGkudXRpbHMuc2VyaWFsaXplLmJhc2VfZGVjb2RlKGkuYmxvY2tfaGFzaCksbD1uZWFyQXBpLnRyYW5zYWN0aW9ucy5jcmVhdGVUcmFuc2FjdGlvbihuLmFjY291bnRJZCxyLCJqc2lucnVzdC5uZWFyIixzLFtuZWFyQXBpLnRyYW5zYWN0aW9ucy5mdW5jdGlvbkNhbGwoImFza19haSIse21lc3NhZ2VfaGFzaDpvfSwiMzAwMDAwMDAwMDAwMDAiLDUwMDAwMDAwMDAwMDAwMDAwMDAwMDBuKV0sYyksW2QsdV09YXdhaXQgbmVhckFwaS50cmFuc2FjdGlvbnMuc2lnblRyYW5zYWN0aW9uKGwsbi5jb25uZWN0aW9uLnNpZ25lcixuLmFjY291bnRJZCxuLmNvbm5lY3Rpb24ubmV0d29ya0lkKTtyZXR1cm4gSlNPTi5zdHJpbmdpZnkoe3NpZ25lZF90cmFuc2FjdGlvbjpCdWZmZXIuZnJvbSh1LmVuY29kZSgpKS50b1N0cmluZygiYmFzZTY0IiksdHJhbnNhY3Rpb25faGFzaDpuZWFyQXBpLnV0aWxzLnNlcmlhbGl6ZS5iYXNlX2VuY29kZShkKSxzZW5kZXJfYWNjb3VudF9pZDp0LG1lc3NhZ2VzOmV9KX0oZSksYT1hd2FpdCBmZXRjaCgiaHR0cHM6Ly9uZWFyLW9wZW5haS52ZXJjZWwuYXBwL2FwaS9vcGVuYWkiLHttZXRob2Q6IlBPU1QiLGJvZHk6dH0pLnRoZW4oKGU9PmUuanNvbigpKSk7aWYoYS5lcnJvcil0aHJvdyBuZXcgRXJyb3IoSlNPTi5zdHJpbmdpZnkoYS5lcnJvcixudWxsLDEpKTtyZXR1cm4gYS5jaG9pY2VzWzBdLm1lc3NhZ2UuY29udGVudH1jYXRjaChlKXtyZXR1cm4gY29uc29sZS5sb2coZS5tZXNzYWdlKSxgVW5mb3J0dW5hdGVseSwgdGhlcmUgd2FzIGFuIGVycm9yOlxuXG5cYFxgXGBcbiR7ZS5tZXNzYWdlfVxuXGBcYFxgXG5gfX1sZXQgcztkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibWludF9idXR0b24iKS5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsKGFzeW5jKCk9Pntjb25zdCBlPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJvd25lcl9pbnB1dCIpLHQ9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm93bmVyX2lucHV0IikudmFsdWU7dD8oZS5jbGFzc0xpc3QucmVtb3ZlKCJtaXNzaW5nb3duZXIiKSx3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJtaW50IixhcmdzOnt0b2tlbl9pZDpkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgidG9rZW5faWRfaW5wdXQiKS52YWx1ZSx0b2tlbl9vd25lcl9pZDp0LGZvbnRfc2l6ZTpkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiZm9udF9zaXplX2lucHV0IikudmFsdWUsY29sb3JzOnN9fSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbikpOmUuY2xhc3NMaXN0LmFkZCgibWlzc2luZ293bmVyIil9KSk7Y29uc3QgYz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicHJldmlld19idXR0b24iKTtjLmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwoYXN5bmMoKT0+e2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJwcmV2aWV3cmVzdWx0dmlldyIpLmlubmVySFRNTD0iUGxlYXNlIHdhaXQgd2hpbGUgZ2VuZXJhdGluZyBwcmV2aWV3Ijtjb25zdCBlPW5ldyBuZWFyQXBpLkNvbnRyYWN0KG4sImpzaW5ydXN0bmZ0Lm5lYXIiLHt2aWV3TWV0aG9kczpbImNhbGxfanNfZnVuYyJdfSk7dHJ5e2NvbnN0IHQ9YXdhaXQgZS5jYWxsX2pzX2Z1bmMoe2Z1bmN0aW9uX25hbWU6InN2Z19wcmV2aWV3Iix0b2tlbl9pZDpkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgidG9rZW5faWRfaW5wdXQiKS52YWx1ZSxmb250X3NpemU6ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImZvbnRfc2l6ZV9pbnB1dCIpLnZhbHVlLGNvbG9yczpzfSk7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInByZXZpZXdyZXN1bHR2aWV3IikuaW5uZXJIVE1MPXQuc3ZnO2NvbnN0IG49ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImNvbG9yX2lucHV0Iik7cz1bXSxBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIiNwcmV2aWV3cmVzdWx0dmlldyBzdmcgcmVjdCIpKS5mb3JFYWNoKCgoZSx0KT0+e3MucHVzaChlLmF0dHJpYnV0ZXMuZmlsbC52YWx1ZSksZS5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsKGE9PntuLnN0eWxlLnRvcD1gJHthLmNsaWVudFl9cHhgLG4uc3R5bGUubGVmdD1gJHthLmNsaWVudFh9cHhgLG4udmFsdWU9ZS5hdHRyaWJ1dGVzLmZpbGwudmFsdWUsbi5zdHlsZS5kaXNwbGF5PSJibG9jayIsY29uc29sZS5sb2cobiksbi5vbmJsdXI9KCk9PntlLmF0dHJpYnV0ZXMuZmlsbC52YWx1ZT1uLnZhbHVlLHNbdF09bi52YWx1ZSxuLnN0eWxlLmRpc3BsYXk9Im5vbmUifX0pKX0pKX1jYXRjaChlKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibWludHJlc3VsdHZpZXciKS5pbm5lckhUTUw9ZS50b1N0cmluZygpfX0pKSx3aW5kb3cub25tZXNzYWdlPWFzeW5jIG89Pntzd2l0Y2goZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW49by5vcmlnaW4sY29uc29sZS5sb2coImlmcmFtZSBnb3QgbWVzc2FnZSIsby5kYXRhKSxvLmRhdGEuY29tbWFuZCl7Y2FzZSJjcmVhdGVhY2NvdW50Ijpjb25zdHtzZWNyZXRLZXk6bCxhY2NvdW50SWQ6ZH09YXdhaXQgYXN5bmMgZnVuY3Rpb24oKXtjb25zdCBvPW5lYXJBcGkudXRpbHMuS2V5UGFpckVkMjU1MTkuZnJvbVJhbmRvbSgpLHI9QnVmZmVyLmZyb20oby5wdWJsaWNLZXkuZGF0YSkudG9TdHJpbmcoImhleCIpO2F3YWl0IHQuc2V0S2V5KGUscixvKTtjb25zdCBpPWF3YWl0IG5lYXJBcGkuY29ubmVjdChhKTtyZXR1cm4gbj1hd2FpdCBpLmFjY291bnQocikse3NlY3JldEtleTpvLnNlY3JldEtleSxhY2NvdW50SWQ6cn19KCk7d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWNjb3VudGNyZWF0ZWQiLHNlY3JldEtleTpsLGFjY291bnRJZDpkfSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbik7YnJlYWs7Y2FzZSJ1c2VhY2NvdW50Ijp3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJ1c2luZ2FjY291bnQiLGFjY291bnRJZDphd2FpdCByKG8uZGF0YS5zZWNyZXRLZXkpfSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbik7YnJlYWs7Y2FzZSJhc2tfYWkiOmNvbnN0IHU9YXdhaXQgaShbe3JvbGU6InVzZXIiLGNvbnRlbnQ6IkluIHRoZSBuZXh0IG1lc3NhZ2UgdGhlcmUgd2lsbCBiZSBhIGRlc2NyaXB0aW9uIHRoYXQgeW91IHNob3VsZCB1c2UgdG8gY3JlYXRlIDl4OSBwaXhlbCBhcnQsIGFuZCBhcyBpbnNwaXJhdGlvbiBmb3IgYSB3b3JkIHRvIGJlIHVzZWQgYXMgYSB0b2tlbiBpZC4gSWYgdGhlIGRlc2NyaXB0aW9uIGlzIHdlYWssIHRoZW4gYmUgY3JlYXRpdmUuIn0se3JvbGU6InVzZXIiLGNvbnRlbnQ6by5kYXRhLmFpcXVlc3Rpb259LHtyb2xlOiJ1c2VyIixjb250ZW50OiJcbiAgICAgICAgICAgICAgICBHaXZlIG1lIG9ubHkgYSBqc29uIHJlc3VsdCB0aGF0IEkgY2FuIHBhcnNlIGRpcmVjdGx5LCBhbmQgbm8gb3RoZXIgc3Vycm91bmRpbmcgY29udGV4dC4gVGhlIGpzb24gc2hvdWxkIGNvbnRhaW4gYSBwcm9wZXJ0eSBjYWxsZWQgaW1hZ2Ugd2hpY2ggaXMgYSA5eDkgYXJyYXkgd2l0aCBzdHJpbmcgb2YgQ1NTIGNvbG9yIGNvZGVzIHJlcHJlc2VudGluZyB0aGUgcGl4ZWwgYXJ0LiBUaGUgb3RoZXIgcHJvcGVydHkgc2hvdWxkIGJlIG5hbWVkIHRva2VuX2lkIGFuZCBjb250YWluIHRoZSB3b3JkIGZvciB0aGUgdG9rZW4gaWQuIn1dKTtsZXQgcDt0cnl7Y29uc3QgZT1KU09OLnBhcnNlKHUpO3M9ZS5pbWFnZS5mbGF0KCksZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInRva2VuX2lkX2lucHV0IikudmFsdWU9ZS50b2tlbl9pZCxjLmNsaWNrKCl9Y2F0Y2goZSl7cD1lLm1lc3NhZ2V9d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiYWlyZXNwb25zZSIsYWlyZXNwb25zZTp1LGVycm9yOnB9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKX19LHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6InJlYWR5In0sIioiKTsKPC9zY3JpcHQ+CjwvaHRtbD4=" style={{ width: '100%', height: '700px', border: 'none' }}></iframe>;

const secretKeyToggle = state.showSecretKey ? <>
    <button onClick={() => State.update({ showSecretKey: false })}>Hide</button>
    <input type="text" value={state.secretKey} onChange={e => changeSecretKey(e.target.value)}></input>
</> :
    <button onClick={() => State.update({ showSecretKey: true })}>Show</button>

return <>
    <p>Create some image and text and mint your own NFT that you can list and trade on <a href="https://www.mintbase.xyz/contract/jsinrustnft.near/nfts/all/0" target="_blank">Mintbase</a></p>

    <p>
        <b>NOTE:</b> Each request to ChatGPT costs about 0.005 NEAR. Make sure the spending account below is funded, and you can also get full access to
        that account by using the secret key. Only you have the key to this account, so don't loose it.</p>

    <textarea style={{ width: '100%' }} onChange={e => State.update({ aiquestion: e.target.value })} value={state.aiquestion}></textarea>
    {
        state.progress ?
            <Progress.Root>
                <Progress.Indicator state="indeterminate" />
            </Progress.Root> :
            <button onClick={ask_ai}>Ask ChatGPT</button>
    }
    {state.error ? <div style={{ color: 'red' }}>{state.error}</div> : ''}

    <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5' }}>
        {iframe}
    </div>


    <p><br /></p>

    <p></p>
    <p>Spending account ID: <pre>{state.accountId}</pre></p>
    <p>Spending account secret key: {secretKeyToggle}</p>
</>;