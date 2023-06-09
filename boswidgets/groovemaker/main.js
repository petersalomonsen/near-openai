import 'https://cdn.jsdelivr.net/npm/near-api-js@2.1.3/dist/near-api-js.min.js';
import 'https://cdn.jsdelivr.net/npm/js-sha256@0.9.0/src/sha256.min.js';

const EXAMPLE_MUSIC = {
    bell: [
        56, 0, 68, 0, 66, 0, 68, 0, 61, 0, 63, 0, 59, 0, 56, 0
    ],
    bass: [
        32, 1, 0, 0, 32, 1, 0, 0, 30, 1, 32, 0, 32, 0, 32, 30
    ],
    kick: [
        120, 0, 0, 0, 120, 0, 0, 0, 120, 0, 0, 0, 120, 0, 0, 0
    ],
    pad1: [
        63, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ],
    pad2: [
        68, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ],
    pad3: [
        71, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ],
    lead: [
        0, 0, 63, 0, 68, 1, 1, 0, 70, 1, 71, 1, 0, 0, 0, 0
    ],
    snare: [
        0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 50
    ],
    hihat: [
        30, 0, 30, 0, 60, 0, 30, 0, 30, 0, 30, 0, 60, 0, 30, 0
    ],
    bpm: 120
};
const ticksPerBeat = 4;
const patternBeats = 4;
const patternLength = patternBeats * ticksPerBeat;

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
    if (!findAccessKeyResult) {
        throw new Error(`Account has no funds. From your wallet, send a small amount to ${account.accountId}`)
    }

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
    window.parent.postMessage({ command: 'aiprogress', progressmessage: 'creating request' }, globalThis.parentOrigin);
    const requestbody = await create_ask_ai_request_body(messages);

    window.parent.postMessage({ command: 'aiprogress', progressmessage: 'sending request' }, globalThis.parentOrigin);
    const airesponse = await fetch('https://near-openai.vercel.app/api/openaistream',
        { method: 'POST', body: requestbody }
    );
    if (!airesponse.ok) {
        throw new Error(`${airesponse.status} ${airesponse.statusText}
${await airesponse.text()}
`);
    }
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
}

async function rendermusic(patterns) {
    const wasmMusicContract = new nearApi.Contract(account, 'webassemblymusic.near', { viewMethods: ['web4_get'] });
    const web4getResponse = await wasmMusicContract.web4_get({ request: { 'path': '/musicwasms/grooveisinthecode.wasm' } });

    const wasmBytes = await fetch(`data:application/wasm;base64,${web4getResponse.body}`).then(r => r.arrayBuffer());

    const worker = new Worker(new URL('renderworker.js', import.meta.url));

    const bpm = patterns.bpm;

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

    const leftBufferFloat = new Float32Array(leftbuffer);
    const rightBufferFloat = new Float32Array(rightbuffer);

    const bitDepth = 32;
    const numChannels = 2;

    const bytesPerSample = bitDepth / 8
    const blockAlign = numChannels * bytesPerSample
    const chunklength = bytesPerSample * 2 * leftBufferFloat.length;

    const buffer = new ArrayBuffer(44 + chunklength);
    const view = new DataView(buffer);
    const writeString = (view, offset, string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i))
        }
    }
    /* RIFF identifier */
    writeString(view, 0, 'RIFF')
    /* RIFF chunk length */
    view.setUint32(4, 36 + chunklength, true)
    /* RIFF type */
    writeString(view, 8, 'WAVE')
    /* format chunk identifier */
    writeString(view, 12, 'fmt ')
    /* format chunk length */
    view.setUint32(16, 16, true)
    /* sample format (raw) */
    view.setUint16(20, 3, true)
    /* channel count */
    view.setUint16(22, numChannels, true)
    /* sample rate */
    view.setUint32(24, sampleRate, true)
    /* byte rate (sample rate * block align) */
    view.setUint32(28, sampleRate * blockAlign, true)
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, blockAlign, true)
    /* bits per sample */
    view.setUint16(34, bitDepth, true)
    /* data chunk identifier */
    writeString(view, 36, 'data')
    /* data chunk length */
    view.setUint32(40, chunklength, true)

    let offset = 44;

    for (let n = 0; n < leftBufferFloat.length; n++) {
        view.setFloat32(offset, leftBufferFloat[n], true);
        offset += 4;
        view.setFloat32(offset, rightBufferFloat[n], true);
        offset += 4;
    }

    window.parent.postMessage({ command: 'download', buffer }, globalThis.parentOrigin, [buffer]);
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

The length of each array is maximum ${patternLength} which corresponds to ${patternBeats} beats. Each beat is ${ticksPerBeat} ticks. One array element is one tick.

In the next message is an example of such a javascript object, that represent a melody with the lead, some background accompany melody with the bell,
background chords with the pads, and a drumbeat with kick, snare and hihat.
`
                    },
                    { role: 'user', content: JSON.stringify(EXAMPLE_MUSIC, null, 1) },
                    { role: 'user', content: `The next message is a description of the music that should be created. If the description has few details, then use elements from popular music, don't copy from the previous message.` },
                    { role: 'user', content: msg.data.aiquestion },
                    { role: 'user', content: `Now create a javascript object with music according to the description in the previous message. The resulting object should be encoded as a JSON string that can be parsed directly, and no other surrounding context. The length of each array should be maximum ${patternLength}. If an array is all zeros you don't need to include that property, but always include the bpm property.` }
                ]);

                const responseObj = JSON.parse(response);
                rendermusic(responseObj);
            } catch (e) {
                error = `Error:
${e.message ?? ''}

${response ?? ''}
                `;
            }

            window.parent.postMessage({ command: 'airesponse', airesponse: response, error }, globalThis.parentOrigin);
            break;
    }
};

window.parent.postMessage({ command: 'ready' }, '*');