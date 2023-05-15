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
            State.update({error: ''});
            Near.call('jsinrustnft.near', 'nft_mint',
                Object.assign({}, msg.args, {
                    title: msg.args.token_id,
                    description: state.aiquestion
                }),
                undefined, (1_000_00000_00000_00000_00000n).toString());
            break;
        case 'error':
            State.update({ error: msg.error });
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

const iframe = <iframe message={state.iframeMessage} onMessage={handleMessage} onLoad={init_iframe} src="data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgo8aGVhZD4KICAgIDxtZXRhIGNoYXJzZXQ9IlVURi04Ij4KICAgIDxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSIgLz4KICAgIDxzdHlsZT4KICAgICAgICBib2R5IHsKICAgICAgICAgICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsKICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4OwogICAgICAgIH0KCiAgICAgICAgaW5wdXQgewogICAgICAgICAgICBwYWRkaW5nOiA1cHg7CiAgICAgICAgICAgIGJvcmRlcjogIzU1YyBzb2xpZCA0cHg7CiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOwogICAgICAgICAgICBjb2xvcjogYmxhY2s7CiAgICAgICAgfQogICAgICAgIGlucHV0LmVycm9yIHsKICAgICAgICAgICAgYm9yZGVyOiByZWQgc29saWQgNnB4OyAgCiAgICAgICAgfQoKICAgICAgICBidXR0b24gewogICAgICAgICAgICBwYWRkaW5nOiAxMHB4OwogICAgICAgICAgICBib3JkZXI6IG5vbmU7CiAgICAgICAgICAgIGJvcmRlcjogIzExNCBzb2xpZCA0cHg7CiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOwogICAgICAgICAgICBjb2xvcjogYmxhY2s7CiAgICAgICAgfQoKICAgICAgICBidXR0b246aG92ZXIgewogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTU1OwogICAgICAgICAgICBjb2xvcjogd2hpdGU7CiAgICAgICAgfQoKCiAgICAgICAgI3ByZXZpZXdyZXN1bHR2aWV3IHsKICAgICAgICAgICAgd2lkdGg6IDUwMHB4OwogICAgICAgICAgICBtYXgtd2lkdGg6IDEwMCU7CiAgICAgICAgfQoKICAgICAgICBhOnZpc2l0ZWQsIGEgewogICAgICAgICAgICBjb2xvcjogd2hpdGU7CiAgICAgICAgfQoKICAgICAgICAjY29udHJhY3RpZHNwYW4gewogICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsKICAgICAgICAgICAgY29sb3I6IGJsYWNrOwogICAgICAgICAgICBwYWRkaW5nOiA1cHg7CiAgICAgICAgfQogICAgPC9zdHlsZT4KPC9oZWFkPgoKPGJvZHk+CiAgICA8cD4KICAgICAgICBUb2tlbiBpZDogPGlucHV0IHR5cGU9InRleHQiIGlkPSJ0b2tlbl9pZF9pbnB1dCIgdmFsdWU9IjIyIiAvPgogICAgICAgICZuYnNwOyBGb250IHNpemU6IDxpbnB1dCB0eXBlPSJudW1iZXIiIGlkPSJmb250X3NpemVfaW5wdXQiIHZhbHVlPSIzIiBtaW49IjEiIG1heD0iNCIgLz4KICAgIDwvcD4KICAgIDxwPgogICAgICAgIE93bmVyOiA8aW5wdXQgdHlwZT0idGV4dCIgaWQ9Im93bmVyX2lucHV0IiB2YWx1ZT0iIiAvPgogICAgPC9wPgogICAgPGJ1dHRvbiBpZD0ibWludF9idXR0b24iPk1pbnQ8L2J1dHRvbj4KICAgIDxidXR0b24gaWQ9InByZXZpZXdfYnV0dG9uIj5QcmV2aWV3PC9idXR0b24+CiAgICA8L3A+CiAgICA8ZGl2PgogICAgICAgIDxwcmUgaWQ9Im1pbnRyZXN1bHR2aWV3Ij48L3ByZT4KICAgIDwvZGl2PgogICAgPGlucHV0IHR5cGU9InRleHQiIGlkPSJjb2xvcl9pbnB1dCIgc3R5bGU9IndpZHRoOiA1MHB4O3Bvc2l0aW9uOiBhYnNvbHV0ZTsgZGlzcGxheTogbm9uZTsgei1pbmRleDogMTAwMDsiIC8+CiAgICA8ZGl2IGlkPSJwcmV2aWV3cmVzdWx0dmlldyI+CgogICAgPC9kaXY+CjwvYm9keT4KPHNjcmlwdCB0eXBlPSJtb2R1bGUiPmltcG9ydCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL25lYXItYXBpLWpzQDIuMS4zL2Rpc3QvbmVhci1hcGktanMubWluLmpzIjtpbXBvcnQiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9qcy1zaGEyNTZAMC45LjAvc3JjL3NoYTI1Ni5taW4uanMiO2NvbnN0IGU9Im1haW5uZXQiLHQ9bmV3IG5lYXJBcGkua2V5U3RvcmVzLkluTWVtb3J5S2V5U3RvcmU7bGV0IG47Y29uc3QgYT17a2V5U3RvcmU6dCxuZXR3b3JrSWQ6ZSxub2RlVXJsOmBodHRwczovL3JwYy4ke2V9Lm5lYXIub3JnYCx3YWxsZXRVcmw6YGh0dHBzOi8vd2FsbGV0LiR7ZX0ubmVhci5vcmdgLGhlbHBlclVybDpgaHR0cHM6Ly9oZWxwZXIuJHtlfS5uZWFyLm9yZ2AsZXhwbG9yZXJVcmw6YGh0dHBzOi8vZXhwbG9yZXIuJHtlfS5uZWFyLm9yZ2B9LHI9YXdhaXQgbmVhckFwaS5jb25uZWN0KGEpO2FzeW5jIGZ1bmN0aW9uIG8oYSl7Y29uc3Qgbz1uZWFyQXBpLnV0aWxzLktleVBhaXIuZnJvbVN0cmluZyhhKSxzPUJ1ZmZlci5mcm9tKG8ucHVibGljS2V5LmRhdGEpLnRvU3RyaW5nKCJoZXgiKTtyZXR1cm4gYXdhaXQgdC5zZXRLZXkoZSxzLG8pLG49YXdhaXQgci5hY2NvdW50KHMpLHN9YXN5bmMgZnVuY3Rpb24gcygpe2NvbnN0IGU9bmV3IG5lYXJBcGkuQ29udHJhY3QobixkLHt2aWV3TWV0aG9kczpbImNhbGxfanNfZnVuYyJdfSksdD1hd2FpdCBlLmNhbGxfanNfZnVuYyh7ZnVuY3Rpb25fbmFtZToic3ZnX3ByZXZpZXciLHRva2VuX2lkOmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJ0b2tlbl9pZF9pbnB1dCIpLnZhbHVlLGZvbnRfc2l6ZTpkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgiZm9udF9zaXplX2lucHV0IikudmFsdWUsY29sb3JzOmN9KTtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicHJldmlld3Jlc3VsdHZpZXciKS5pbm5lckhUTUw9dC5zdmd9YXN5bmMgZnVuY3Rpb24gaShlKXt3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhaXByb2dyZXNzIixwcm9ncmVzc21lc3NhZ2U6ImNyZWF0aW5nIHJlcXVlc3QifSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbik7Y29uc3QgdD1hd2FpdCBhc3luYyBmdW5jdGlvbihlKXtjb25zdCB0PW4uYWNjb3VudElkLGE9SlNPTi5zdHJpbmdpZnkoZSkscj1zaGEyNTYoYSksbz1hd2FpdCBuLmNvbm5lY3Rpb24uc2lnbmVyLmdldFB1YmxpY0tleShuLmFjY291bnRJZCxuLmNvbm5lY3Rpb24ubmV0d29ya0lkKSxzPWF3YWl0IG4uZmluZEFjY2Vzc0tleSgpO2lmKCFzKXRocm93IG5ldyBFcnJvcihgQWNjb3VudCBoYXMgbm8gZnVuZHMuIEZyb20geW91ciB3YWxsZXQsIHNlbmQgYSBzbWFsbCBhbW91bnQgdG8gJHtuLmFjY291bnRJZH1gKTtjb25zdCBpPXMuYWNjZXNzS2V5LGM9KytpLm5vbmNlLGw9bmVhckFwaS51dGlscy5zZXJpYWxpemUuYmFzZV9kZWNvZGUoaS5ibG9ja19oYXNoKSxkPW5lYXJBcGkudHJhbnNhY3Rpb25zLmNyZWF0ZVRyYW5zYWN0aW9uKG4uYWNjb3VudElkLG8sImpzaW5ydXN0Lm5lYXIiLGMsW25lYXJBcGkudHJhbnNhY3Rpb25zLmZ1bmN0aW9uQ2FsbCgiYXNrX2FpIix7bWVzc2FnZV9oYXNoOnJ9LCIzMDAwMDAwMDAwMDAwMCIsNTAwMDAwMDAwMDAwMDAwMDAwMDAwMG4pXSxsKSxbdSxwXT1hd2FpdCBuZWFyQXBpLnRyYW5zYWN0aW9ucy5zaWduVHJhbnNhY3Rpb24oZCxuLmNvbm5lY3Rpb24uc2lnbmVyLG4uYWNjb3VudElkLG4uY29ubmVjdGlvbi5uZXR3b3JrSWQpO3JldHVybiBKU09OLnN0cmluZ2lmeSh7c2lnbmVkX3RyYW5zYWN0aW9uOkJ1ZmZlci5mcm9tKHAuZW5jb2RlKCkpLnRvU3RyaW5nKCJiYXNlNjQiKSx0cmFuc2FjdGlvbl9oYXNoOm5lYXJBcGkudXRpbHMuc2VyaWFsaXplLmJhc2VfZW5jb2RlKHUpLHNlbmRlcl9hY2NvdW50X2lkOnQsbWVzc2FnZXM6ZX0pfShlKTt3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJhaXByb2dyZXNzIixwcm9ncmVzc21lc3NhZ2U6InNlbmRpbmcgcmVxdWVzdCJ9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKTtjb25zdCBhPWF3YWl0IGZldGNoKCJodHRwczovL25lYXItb3BlbmFpLnZlcmNlbC5hcHAvYXBpL29wZW5haXN0cmVhbSIse21ldGhvZDoiUE9TVCIsYm9keTp0fSk7aWYoIWEub2spdGhyb3cgbmV3IEVycm9yKGAke2Euc3RhdHVzfSAke2Euc3RhdHVzVGV4dH1cbiR7YXdhaXQgYS50ZXh0KCl9XG5gKTtjb25zdCByPWEuYm9keS5nZXRSZWFkZXIoKSxvPVtdO2Zvcig7Oyl7Y29uc3R7ZG9uZTplLHZhbHVlOnR9PWF3YWl0IHIucmVhZCgpO2lmKGUpYnJlYWs7Y29uc3Qgbj0obmV3IFRleHREZWNvZGVyKS5kZWNvZGUodCk7by5wdXNoKG4pLHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6ImFpcHJvZ3Jlc3MiLHByb2dyZXNzbWVzc2FnZTpufSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbik7bGV0IGE9by5qb2luKCIiKTtjb25zdCBzPWEuaW5kZXhPZigiWyIpO2lmKHM+LTEpe2E9YS5zdWJzdHJpbmcocyk7Y29uc3QgZT1hLmxhc3RJbmRleE9mKCciLCcpO2lmKGU+LTEpe2E9YS5zdWJzdHJpbmcoMCxlKzEpKyJdXSI7Y29uc3QgdD1BcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIiNwcmV2aWV3cmVzdWx0dmlldyBzdmcgcmVjdCIpKTtKU09OLnBhcnNlKGEpLmZsYXQoKS5mb3JFYWNoKCgoZSxuKT0+dFtuXS5hdHRyaWJ1dGVzLmZpbGwudmFsdWU9ZSkpfX19cmV0dXJuIG8uam9pbigiIil9bGV0IGM7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm1pbnRfYnV0dG9uIikuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLChhc3luYygpPT57Y29uc3QgZT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgib3duZXJfaW5wdXQiKSx0PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJvd25lcl9pbnB1dCIpLnZhbHVlLnRyaW0oKTtpZighdClyZXR1cm4gZS5jbGFzc0xpc3QuYWRkKCJlcnJvciIpLHZvaWQgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiZXJyb3IiLGVycm9yOiJZb3UgbXVzdCBwcm92aWRlIGFuIG93bmVyIGFjY291bnQgZm9yIHRoZSBORlQifSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbik7ZS5jbGFzc0xpc3QucmVtb3ZlKCJlcnJvciIpO3RyeXthd2FpdCByLmNvbm5lY3Rpb24ucHJvdmlkZXIucXVlcnkoe3JlcXVlc3RfdHlwZToidmlld19hY2NvdW50IixmaW5hbGl0eToiZmluYWwiLGFjY291bnRfaWQ6dH0pfWNhdGNoKG4pe3JldHVybiB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJlcnJvciIsZXJyb3I6YFVua25vd24gYWNjb3VudDogJHt0fWB9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKSx2b2lkIGUuY2xhc3NMaXN0LmFkZCgiZXJyb3IiKX1lLmNsYXNzTGlzdC5yZW1vdmUoImVycm9yIik7Y29uc3QgYT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgidG9rZW5faWRfaW5wdXQiKSxvPWEudmFsdWUudHJpbSgpO2lmKCFvKXJldHVybiBhLmNsYXNzTGlzdC5hZGQoImVycm9yIiksdm9pZCB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHtjb21tYW5kOiJlcnJvciIsZXJyb3I6IlRva2VuIElEIGNhbm5vdCBiZSBlbXB0eSJ9LGdsb2JhbFRoaXMucGFyZW50T3JpZ2luKTthLmNsYXNzTGlzdC5yZW1vdmUoImVycm9yIik7Y29uc3Qgcz1uZXcgbmVhckFwaS5Db250cmFjdChuLGQse3ZpZXdNZXRob2RzOlsibmZ0X3Rva2VuIl19KSxpPWF3YWl0IHMubmZ0X3Rva2VuKHt0b2tlbl9pZDpvfSk7aWYoY29uc29sZS5sb2coaSksaSlyZXR1cm4gYS5jbGFzc0xpc3QuYWRkKCJlcnJvciIpLHZvaWQgd2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoiZXJyb3IiLGVycm9yOmBUb2tlbiBJRCAiJHtvfSIgaXMgYWxyZWFkeSB0YWtlbiwgbXVzdCBiZSB1bmlxdWVgfSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbik7YS5jbGFzc0xpc3QucmVtb3ZlKCJlcnJvciIpLHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6Im1pbnQiLGFyZ3M6e3Rva2VuX2lkOm8sdG9rZW5fb3duZXJfaWQ6dCxmb250X3NpemU6ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImZvbnRfc2l6ZV9pbnB1dCIpLnZhbHVlLGNvbG9yczpjfX0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pfSkpO2NvbnN0IGw9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInByZXZpZXdfYnV0dG9uIiksZD0ianNpbnJ1c3RuZnQubmVhciI7bC5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsKGFzeW5jKCk9Pntkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicHJldmlld3Jlc3VsdHZpZXciKS5pbm5lckhUTUw9IlBsZWFzZSB3YWl0IHdoaWxlIGdlbmVyYXRpbmcgcHJldmlldyI7dHJ5e2F3YWl0IHMoKTtjb25zdCBlPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjb2xvcl9pbnB1dCIpO2M9W10sQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCIjcHJldmlld3Jlc3VsdHZpZXcgc3ZnIHJlY3QiKSkuZm9yRWFjaCgoKHQsbik9PntjLnB1c2godC5hdHRyaWJ1dGVzLmZpbGwudmFsdWUpLHQuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLChhPT57ZS5zdHlsZS50b3A9YCR7YS5jbGllbnRZfXB4YCxlLnN0eWxlLmxlZnQ9YCR7YS5jbGllbnRYfXB4YCxlLnZhbHVlPXQuYXR0cmlidXRlcy5maWxsLnZhbHVlLGUuc3R5bGUuZGlzcGxheT0iYmxvY2siLGNvbnNvbGUubG9nKGUpLGUub25ibHVyPSgpPT57dC5hdHRyaWJ1dGVzLmZpbGwudmFsdWU9ZS52YWx1ZSxjW25dPWUudmFsdWUsZS5zdHlsZS5kaXNwbGF5PSJub25lIn19KSl9KSl9Y2F0Y2goZSl7ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIm1pbnRyZXN1bHR2aWV3IikuaW5uZXJIVE1MPWUudG9TdHJpbmcoKX19KSksd2luZG93Lm9ubWVzc2FnZT1hc3luYyByPT57c3dpdGNoKGdsb2JhbFRoaXMucGFyZW50T3JpZ2luPXIub3JpZ2luLGNvbnNvbGUubG9nKCJpZnJhbWUgZ290IG1lc3NhZ2UiLHIuZGF0YSksci5kYXRhLmNvbW1hbmQpe2Nhc2UiY3JlYXRlYWNjb3VudCI6Y29uc3R7c2VjcmV0S2V5OmQsYWNjb3VudElkOnV9PWF3YWl0IGFzeW5jIGZ1bmN0aW9uKCl7Y29uc3Qgcj1uZWFyQXBpLnV0aWxzLktleVBhaXJFZDI1NTE5LmZyb21SYW5kb20oKSxvPUJ1ZmZlci5mcm9tKHIucHVibGljS2V5LmRhdGEpLnRvU3RyaW5nKCJoZXgiKTthd2FpdCB0LnNldEtleShlLG8scik7Y29uc3Qgcz1hd2FpdCBuZWFyQXBpLmNvbm5lY3QoYSk7cmV0dXJuIG49YXdhaXQgcy5hY2NvdW50KG8pLHtzZWNyZXRLZXk6ci5zZWNyZXRLZXksYWNjb3VudElkOm99fSgpO3dpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6ImFjY291bnRjcmVhdGVkIixzZWNyZXRLZXk6ZCxhY2NvdW50SWQ6dX0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pO2JyZWFrO2Nhc2UidXNlYWNjb3VudCI6d2luZG93LnBhcmVudC5wb3N0TWVzc2FnZSh7Y29tbWFuZDoidXNpbmdhY2NvdW50IixhY2NvdW50SWQ6YXdhaXQgbyhyLmRhdGEuc2VjcmV0S2V5KX0sZ2xvYmFsVGhpcy5wYXJlbnRPcmlnaW4pO2JyZWFrO2Nhc2UiYXNrX2FpIjpsZXQgcCxnO3RyeXtjPW5ldyBBcnJheSg4MSkuZmlsbCgiYmxhY2siKSxhd2FpdCBzKCksZz1hd2FpdCBpKFt7cm9sZToidXNlciIsY29udGVudDoiSW4gdGhlIG5leHQgbWVzc2FnZSB0aGVyZSB3aWxsIGJlIGEgZGVzY3JpcHRpb24gdGhhdCB5b3Ugc2hvdWxkIHVzZSB0byBjcmVhdGUgOXg5IHBpeGVsIGFydCwgYW5kIGFzIGluc3BpcmF0aW9uIGZvciBhIHdvcmQgdG8gYmUgdXNlZCBhcyBhIHRva2VuIGlkLiBJZiB0aGUgZGVzY3JpcHRpb24gaXMgd2VhaywgdGhlbiBiZSBjcmVhdGl2ZS4ifSx7cm9sZToidXNlciIsY29udGVudDpyLmRhdGEuYWlxdWVzdGlvbn0se3JvbGU6InVzZXIiLGNvbnRlbnQ6IlxuICAgICAgICAgICAgICAgICAgICBHaXZlIG1lIG9ubHkgYSBqc29uIHJlc3VsdCB0aGF0IEkgY2FuIHBhcnNlIGRpcmVjdGx5LCBhbmQgbm8gb3RoZXIgc3Vycm91bmRpbmcgY29udGV4dC4gVGhlIGpzb24gc2hvdWxkIGNvbnRhaW4gYSBwcm9wZXJ0eSBjYWxsZWQgaW1hZ2Ugd2hpY2ggaXMgYSA5eDkgYXJyYXkgd2l0aCBzdHJpbmcgb2YgQ1NTIGNvbG9yIGNvZGVzIHJlcHJlc2VudGluZyB0aGUgcGl4ZWwgYXJ0LiBUaGUgb3RoZXIgcHJvcGVydHkgc2hvdWxkIGJlIG5hbWVkIHRva2VuX2lkIGFuZCBjb250YWluIHRoZSB3b3JkIGZvciB0aGUgdG9rZW4gaWQuIn1dKTtjb25zdCBlPUpTT04ucGFyc2UoZyk7Yz1lLmltYWdlLmZsYXQoKSxkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgidG9rZW5faWRfaW5wdXQiKS52YWx1ZT1lLnRva2VuX2lkLGwuY2xpY2soKX1jYXRjaChlKXtwPWBFcnJvcjpcbiR7ZS5tZXNzYWdlPz8iIn1cblxuJHtnPz8iIn1cbiAgICAgICAgICAgICAgICBgfXdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2Uoe2NvbW1hbmQ6ImFpcmVzcG9uc2UiLGFpcmVzcG9uc2U6ZyxlcnJvcjpwfSxnbG9iYWxUaGlzLnBhcmVudE9yaWdpbil9fSxjb25zb2xlLmxvZygiaWZyYW1lIGxvYWRlZCIpOwo8L3NjcmlwdD4KPC9odG1sPg==" style={{ width: '100%', height: '700px', border: 'none' }}></iframe>;

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