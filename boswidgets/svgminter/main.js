import 'https://cdn.jsdelivr.net/npm/near-api-js@2.1.3/dist/near-api-js.min.js';
import 'https://cdn.jsdelivr.net/npm/js-sha256@0.9.0/src/sha256.min.js';

const networkId = 'mainnet';
const keyStore = new nearApi.keyStores.InMemoryKeyStore();
let account;
const config = {
    keyStore,
    networkId,
    nodeUrl: `https://rpc.${networkId}.near.org`,
    walletUrl: `https://wallet.${networkId}.near.org`,
    helperUrl: `https://helper.${networkId}.near.org`,
    explorerUrl: `https://explorer.${networkId}.near.org`
};

const near = await nearApi.connect(config);

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
    account = await near.account(accountId);
    return accountId;
}

async function generate_preview_svg() {
    const contract = new nearApi.Contract(account, nftContractId, {
        viewMethods: ['call_js_func']
    });
    const result = await contract.call_js_func({
        function_name: 'svg_preview',
        token_id: document.getElementById('token_id_input').value,
        font_size: document.getElementById('font_size_input').value,
        colors: colors_array
    });
    document.getElementById('previewresultview').innerHTML = result.svg;
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

    const findAccessKeyResult = await account.findAccessKey();
    if (!findAccessKeyResult) {
        throw new Error(`Account has no funds. From your wallet, send a small amount to ${account.accountId}`)
    }
    const accessKey = findAccessKeyResult.accessKey;

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
        let currentResult = chunks.join('');
        const arrayStartIndex = currentResult.indexOf('[');
        if (arrayStartIndex > -1) {
            currentResult = currentResult.substring(arrayStartIndex);
            const lastComma = currentResult.lastIndexOf('",');
            if (lastComma > -1) {
                currentResult = currentResult.substring(0, lastComma + 1) + ']]';
                const rects = Array.from(document.querySelectorAll('#previewresultview svg rect'))

                const colorArray = JSON.parse(currentResult).flat();
                colorArray.forEach((val, ndx) => rects[ndx].attributes.fill.value = val);
            }
        }
    }
    return chunks.join('');
}

const mintButton = document.getElementById('mint_button');
let colors_array;

mintButton.addEventListener('click', async () => {
    const owner_input = document.getElementById('owner_input');
    const token_owner_id = document.getElementById('owner_input').value;
    if (!token_owner_id) {
        owner_input.classList.add('missingowner');
        return;
    }
    owner_input.classList.remove('missingowner');

    window.parent.postMessage({
        command: 'mint', args: {
            token_id: document.getElementById('token_id_input').value,
            token_owner_id,
            font_size: document.getElementById('font_size_input').value,
            colors: colors_array
        }
    }, globalThis.parentOrigin);
});

const previewButton = document.getElementById('preview_button');
const nftContractId = 'jsinrustnft.near';
previewButton.addEventListener('click', async () => {
    document.getElementById('previewresultview').innerHTML = 'Please wait while generating preview';
    try {
        await generate_preview_svg();
        const color_input = document.getElementById('color_input');
        colors_array = [];
        Array.from(document.querySelectorAll('#previewresultview svg rect'))
            .forEach((rect, ndx) => {
                colors_array.push(rect.attributes.fill.value);
                rect.addEventListener('click', (e) => {
                    color_input.style.top = `${e.clientY}px`;
                    color_input.style.left = `${e.clientX}px`;
                    color_input.value = rect.attributes.fill.value;
                    color_input.style.display = 'block';
                    console.log(color_input);
                    color_input.onblur = () => {
                        rect.attributes.fill.value = color_input.value;
                        colors_array[ndx] = color_input.value;
                        color_input.style.display = 'none';
                    }
                });
            }
            );
    } catch (e) {
        document.getElementById('mintresultview').innerHTML = e.toString();
    }
});

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
            break;
        case 'ask_ai':
            let error;
            let response;
            try {
                colors_array = new Array(81).fill('black');
                await generate_preview_svg();
                response = await create_and_send_ask_ai_request([
                    { role: 'user', content: `In the next message there will be a description that you should use to create 9x9 pixel art, and as inspiration for a word to be used as a token id. If the description is weak, then be creative.` },
                    { role: 'user', content: msg.data.aiquestion },
                    {
                        role: 'user', content: `
                    Give me only a json result that I can parse directly, and no other surrounding context. The json should contain a property called image which is a 9x9 array with string of CSS color codes representing the pixel art. The other property should be named token_id and contain the word for the token id.` },
                ]);

                const responseObj = JSON.parse(response);
                colors_array = responseObj.image.flat();
                document.getElementById('token_id_input').value = responseObj.token_id;
                previewButton.click();
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

console.log('iframe loaded');