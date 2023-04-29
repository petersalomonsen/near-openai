import 'https://cdn.jsdelivr.net/npm/near-api-js@2.1.3/dist/near-api-js.min.js';

window.onmessage = (msg) => {  
    console.log(msg);
    switch(msg.data.command) {
        case 'createaccount':
            const accountkeypair = nearApi.utils.KeyPairEd25519.fromRandom();
            const accountid = Buffer.from(accountkeypair.publicKey.data).toString('hex');
            window.parent.postMessage({command: 'accountcreated', secretKey: accountkeypair.secretKey, accountid},msg.origin);
            break;
        case 'useaccount':
            console.log('use account', msg.data.secretKey);
            break;
    }
};

