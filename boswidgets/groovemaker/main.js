import 'https://cdn.jsdelivr.net/npm/near-api-js@2.1.3/dist/near-api-js.min.js';
import 'https://cdn.jsdelivr.net/npm/js-sha256@0.9.0/src/sha256.min.js';

const networkId = 'mainnet';
const keyStore = new nearApi.keyStores.InMemoryKeyStore();
let account;
const config = {
    keyStore, // instance of UnencryptedFileSystemKeyStore
    networkId,
    nodeUrl: `https://rpc.${networkId}.near.org`,
    walletUrl: `https://wallet.${networkId}.near.org`,
    helperUrl: `https://helper.${networkId}.near.org`,
    explorerUrl: `https://explorer.${networkId}.near.org`
};


async function createAccount() {
    const keypair = nearApi.utils.KeyPairEd25519.fromRandom();
    const accountId = Buffer.from(keypair.publicKey.data).toString('hex');
    await keyStore.setKey(networkId, accountId, keypair);
    const near = await nearApi.connect(config);
    account = await near.account(accountId);
    return { secretKey: keypair.secretKey, accountId };
}

async function useAccount(secretKey) {
    const keypair = nearApi.utils.KeyPair.fromString(secretKey);
    const accountId = Buffer.from(keypair.publicKey.data).toString('hex');
    await keyStore.setKey(networkId, accountId, keypair);
    const near = await nearApi.connect(config);
    account = await near.account(accountId);
    return accountId;
}

async function create_ask_ai_request_body(messages) {
    const accountId = account.accountId;

    const messagesStringified = JSON.stringify(messages);
    const deposit = 50_00000_00000_00000_00000n;

    const message_hash = sha256(messagesStringified);

    const receiverId = 'jsinrust.near';
    const method_name = 'ask_ai';
    const gas = '30000000000000';
    const publicKey = await account.connection.signer.getPublicKey(account.accountId, account.connection.networkId);

    const accessKey = (await account.findAccessKey()).accessKey;

    const nonce = ++accessKey.nonce;
    const recentBlockHash = nearApi.utils.serialize.base_decode(
        accessKey.block_hash
    );

    const transaction = nearApi.transactions.createTransaction(
        account.accountId,
        publicKey,
        receiverId,
        nonce,
        [nearApi.transactions.functionCall(method_name, {
            message_hash
        }, gas, deposit)],
        recentBlockHash
    );
    const [txHash, signedTx] = await nearApi.transactions.signTransaction(transaction, account.connection.signer, account.accountId, account.connection.networkId);

    return JSON.stringify({
        signed_transaction: Buffer.from(signedTx.encode()).toString('base64'),
        transaction_hash: nearApi.utils.serialize.base_encode(txHash),
        sender_account_id: accountId,
        messages: messages
    });
}

async function create_and_send_ask_ai_request(messages) {
    try {
        const requestbody = await create_ask_ai_request_body(messages);
        const airesponse = await fetch(
            'https://near-openai.vercel.app/api/openai',
            {
                method: 'POST',
                body: requestbody
            }).then(r => r.json());
        if (airesponse.error) {
            throw new Error(JSON.stringify(airesponse.error, null, 1));
        }
        return airesponse.choices[0].message.content;
    } catch (e) {
        console.log(e.message);
        return `Unfortunately, there was an error:

\`\`\`
${e.message}
\`\`\`
`;
    }
}

async function rendermusic() {
    const wasmMusicContract = new nearApi.Contract(account, 'webassemblymusic.near', { viewMethods: ['web4_get'] });
    const web4getResponse = await wasmMusicContract.web4_get({ request: { 'path': '/musicwasms/grooveisinthecode.wasm' } });

    const wasmBytes = await fetch(`data:application/wasm;base64,${web4getResponse.body}`).then(r => r.arrayBuffer());

    const worker = new Worker(new URL('renderworker.js', import.meta.url));

    const bpm = 120;
    const patternBeats = 4;
    const patternLength = patternBeats * 4;
    const sampleRate = 44100;
    const durationMillis = patternBeats * 60000 / bpm;
    const durationFrames = durationMillis * sampleRate / 1000;

    const channelinstrmap = [
        'bell',
        'bass',
        'pad1',
        'pad2',
        'pad3',
        'kick',
        'snare',
        'lead',
        'hihat',
    ];
    const patterns = {
        bass: [
            32,1,0,0, 32,1,0,0, 30,1,32,0, 32,0,32,30        ],
        kick: [
            120, 0, 0, 0, 120, 0, 0, 0, 120, 0, 0, 0, 120, 0, 0, 0
        ],
        snare: [
            0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0
        ]
    };
    const patternsArray = new Array((channelinstrmap.length + 1) * patternLength);
    patternsArray.fill(0);
    channelinstrmap.forEach((instr, instrIndex) => {
        if (patterns[instr]) {
            patterns[instr].forEach((v, ndx) => patternsArray[(instrIndex + 1) * patternLength + ndx] = v);
        }
    });

    const { leftbuffer, rightbuffer } = await new Promise(async resolve => {
        worker.postMessage({
            wasm: wasmBytes, samplerate: sampleRate,
            songduration: durationMillis,
            bpm,
            patternLength,
            patterns: patternsArray,
            numInstruments: channelinstrmap.length
        });
        worker.onmessage = msg => {
            if (msg.data.leftbuffer) {
                resolve(msg.data);
            } else {
                document.querySelector('#loaderprogress').innerHTML = (msg.data.progress * 100).toFixed(2) + '%';
            }
        }
    });

    const playbutton = document.getElementById('playbutton');
    playbutton.addEventListener('click', () => {
        const audioCtx = new AudioContext();
        const audioBuf = audioCtx.createBuffer(2, durationFrames, sampleRate);
        audioBuf.getChannelData(0).set(new Float32Array(leftbuffer));
        audioBuf.getChannelData(1).set(new Float32Array(rightbuffer));
        const audioBufSrc = audioCtx.createBufferSource();
        audioBufSrc.buffer = audioBuf;

        audioBufSrc.connect(audioCtx.destination);
        audioBufSrc.loop = true;
        audioBufSrc.start(0);
    });
}


window.onmessage = async (msg) => {
    globalThis.parentOrigin = msg.origin;

    console.log('iframe got message', msg.data);
    switch (msg.data.command) {
        case 'createaccount':
            const { secretKey, accountId } = await createAccount();
            window.parent.postMessage({ command: 'accountcreated', secretKey, accountId }, globalThis.parentOrigin);
            break;
        case 'useaccount':
            window.parent.postMessage({ command: 'usingaccount', accountId: await useAccount(msg.data.secretKey) }, globalThis.parentOrigin);
            rendermusic();
            break;
        case 'ask_ai':
            const response = await create_and_send_ask_ai_request([{ role: 'user', content: msg.data.aiquestion }]);
            window.parent.postMessage({ command: 'airesponse', airesponse: response }, globalThis.parentOrigin);
            break;
    }
};

window.parent.postMessage({ command: 'ready' }, '*');