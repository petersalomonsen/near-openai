import 'https://cdn.jsdelivr.net/npm/near-api-js@2.1.3/dist/near-api-js.min.js';
import 'https://cdn.jsdelivr.net/npm/js-sha256@0.9.0/src/sha256.min.js';

const EXAMPLE_MUSIC = {
    bell: [
        56, 0, 68, 0, 66, 0, 68, 0, 61, 0, 63, 0, 59, 0, 56, 0,
        54, 0, 66, 0, 64, 0, 66, 0, 59, 0, 61, 0, 58, 0, 54, 0,
        61, 0, 73, 0, 71, 0, 73, 0, 66, 0, 68, 0, 54, 0, 61, 0,
        59, 0, 71, 0, 70, 0, 71, 0, 66, 0, 71, 0, 66, 0, 59, 0,
    ],
    bass: [
        32, 1, 0, 0, 32, 1, 0, 0, 30, 1, 32, 0, 32, 0, 32, 30,
        30, 1, 0, 0, 30, 1, 0, 0, 28, 1, 30, 0, 30, 0, 30, 28,
        37, 1, 0, 0, 37, 1, 0, 0, 35, 1, 37, 0, 37, 0, 37, 35,
        35, 1, 0, 0, 35, 1, 0, 0, 32, 1, 35, 0, 35, 0, 35, 32,
    ],
    kick: [
        120, 0, 0, 0, 120, 0, 0, 0, 120, 0, 0, 0, 120, 0, 0, 0,
        120, 0, 0, 0, 120, 0, 0, 0, 120, 0, 0, 0, 120, 0, 0, 0,
        120, 0, 0, 0, 120, 0, 0, 0, 120, 0, 0, 0, 120, 0, 0, 0,
        120, 0, 0, 0, 120, 0, 0, 50, 120, 0, 100, 0, 120, 0, 0, 0
    ],
    pad1: [
        63, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        61, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        64, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        63, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ],
    pad2: [
        68, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        66, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        68, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        66, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ],
    pad3: [
        71, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        70, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        73, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        71, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ],
    lead: [
        0, 0, 63, 0, 68, 1, 1, 0, 70, 1, 71, 1, 0, 0, 0, 0,
        0, 0, 61, 0, 66, 1, 1, 0, 68, 1, 70, 1, 0, 0, 0, 0,
        0, 0, 68, 0, 73, 1, 1, 0, 75, 1, 76, 1, 0, 0, 0, 0,
        75, 1, 0, 0, 75, 1, 1, 0, 73, 1, 75, 1, 71, 1, 66, 1
    ],
    snare: [
        0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0,
        0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0,
        0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0,
        0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 80, 0, 100, 0, 0, 50
    ],
    hihat: [
        30, 0, 30, 0, 60, 0, 30, 0, 30, 0, 30, 0, 60, 0, 30, 0,
        30, 0, 30, 0, 60, 0, 30, 0, 30, 0, 30, 0, 60, 0, 30, 0,
        30, 0, 30, 0, 60, 0, 30, 0, 30, 0, 30, 0, 60, 0, 30, 0,
        30, 0, 30, 0, 60, 0, 30, 0, 30, 0, 30, 0, 60, 40, 60, 30
    ],
    bpm: 120
};


const networkId = 'mainnet';
const keyStore = new nearApi.keyStores.InMemoryKeyStore();
let account;
let audioCtx;
let audioBufSrcNode;

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
        window.parent.postMessage({ command: 'aiprogress', progressmessage: 'creating request' }, globalThis.parentOrigin);
        const requestbody = await create_ask_ai_request_body(messages);

        window.parent.postMessage({ command: 'aiprogress', progressmessage: 'sending request' }, globalThis.parentOrigin);
        const airesponse = await fetch('https://near-openai-git-boswidget-groovemaker-petersalomonsen.vercel.app/api/openaistream',
            { method: 'POST', body: requestbody }
        );
        const responsebody = airesponse.body;
        const reader = responsebody.getReader();

        const chunks = [];
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            const chunk = new TextDecoder().decode(value);

            chunks.push(chunk);
            window.parent.postMessage({ command: 'aiprogress', progressmessage: chunk }, globalThis.parentOrigin);
        }
        return chunks.join('');
    } catch (e) {
        console.log(e.message);
        return `Unfortunately, there was an error:

\`\`\`
${e.message}
\`\`\`
`;
    }
}

async function rendermusic(patterns) {
    const wasmMusicContract = new nearApi.Contract(account, 'webassemblymusic.near', { viewMethods: ['web4_get'] });
    const web4getResponse = await wasmMusicContract.web4_get({ request: { 'path': '/musicwasms/grooveisinthecode.wasm' } });

    const wasmBytes = await fetch(`data:application/wasm;base64,${web4getResponse.body}`).then(r => r.arrayBuffer());

    const worker = new Worker(new URL('renderworker.js', import.meta.url));

    const bpm = patterns.bpm;

    const patternBeats = 16;
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

    const patternsArray = new Array(channelinstrmap.length * patternLength);
    patternsArray.fill(0);
    channelinstrmap.forEach((instr, instrIndex) => {
        if (patterns[instr]) {
            patterns[instr].forEach((v, ndx) => patternsArray[instrIndex * patternLength + ndx] = v);
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

    const startAudioBufSrcNode = () => {
        const audioBuf = audioCtx.createBuffer(2, durationFrames, sampleRate);
        audioBuf.getChannelData(0).set(new Float32Array(leftbuffer));
        audioBuf.getChannelData(1).set(new Float32Array(rightbuffer));
        audioBufSrcNode = audioCtx.createBufferSource();
        audioBufSrcNode.buffer = audioBuf;

        audioBufSrcNode.connect(audioCtx.destination);
        audioBufSrcNode.loop = true;
        audioBufSrcNode.start(0);
    };

    if (audioCtx && audioBufSrcNode) {
        audioBufSrcNode.stop();
        audioBufSrcNode.disconnect();
        audioBufSrcNode = null;
        startAudioBufSrcNode();
    }

    playbutton.onclick = () => {
        if (audioCtx) {
            audioCtx.close();
            audioCtx = null;
            return;
        }
        audioCtx = new AudioContext();
        startAudioBufSrcNode();
    };
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
            rendermusic(EXAMPLE_MUSIC);
            break;
        case 'ask_ai':
            let error;
            let response;
            try {
                response = await create_and_send_ask_ai_request([
                    {
                        "role": "user",
                        "content": `Here's a description of a JavaScript object containing a musical pattern with the following instruments and specifications:
bell: an array of MIDI note numbers representing a melody, 0 for silence, 1 for holding a note
lead: an array of MIDI note numbers representing a melody, 0 for silence, 1 for holding a note
bass: an array of MIDI note numbers representing a baseline, 0 for silence, 1 for holding a note
pad1: an array of MIDI note numbers representing the bottom note in a background pad instrument chord, 0 for silence, 1 for holding a note
pad2: an array of MIDI note numbers representing the middle note in a background pad instrument chord, 0 for silence, 1 for holding a note
pad3: an array of MIDI note numbers representing the top note in a background pad instrument chord, 0 for silence, 1 for holding a note
kick: an array of integers representing velocities for a base drum sound
snare: an array of integers representing velocities for a snare drum sound
hihat: an array of integers representing velocities for a hihat sound
bpm: an integer representing tempo in beats per minute. From 60 which is very slow to 150 which is very fast

Be aware of the value 1 which is used for holding a note to last longer than just one tick.

The length of each array is maximum 64 which corresponds to 16 beats. Each beat is 4 ticks. One array element is one tick.

In the next message is an example of such a javascript object, that represent a melody with the lead, some background accompany melody with the bell,
background chords with the pads, and a drumbeat with kick, snare and hihat.
`
                    },
                    { role: 'user', content: JSON.stringify(EXAMPLE_MUSIC) },
                    { role: 'user', content: `The next message is a description of the music that should be created. If the description has few details, then be creative, don't copy from the previous message.` },
                    { role: 'user', content: msg.data.aiquestion },
                    { role: 'user', content: 'Now create a javascript object with music according to the description in the previous message. The resulting object should be encoded as a JSON string that can be parsed directly, and no other surrounding context. The length of each array should be maximum 64.' }
                ]);
                const responseObj = JSON.parse(response);
                rendermusic(responseObj);
            } catch (e) {
                error = `Error: ${e.message}

${response}
                `;
            }
            window.parent.postMessage({ command: 'airesponse', airesponse: 'Music is ready!', error }, globalThis.parentOrigin);
            break;
    }
};

window.parent.postMessage({ command: 'ready' }, '*');