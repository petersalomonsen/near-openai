import 'https://cdn.jsdelivr.net/npm/near-api-js@2.1.3/dist/near-api-js.min.js';
import 'https://cdn.jsdelivr.net/npm/js-sha256@0.9.0/src/sha256.min.js';

const networkId = 'mainnet';
const keyStore = new nearApi.keyStores.InMemoryKeyStore();
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
    const accountid = Buffer.from(keypair.publicKey.data).toString('hex');
    await keyStore.setKey(networkId, accountid, keypair);
    return keypair.secretKey;
}

async function useAccount(secretKey) {
    const keypair = nearApi.utils.KeyPair.fromString(secretKey);
    const accountid = Buffer.from(keypair.publicKey.data).toString('hex');
    await keyStore.setKey(networkId, accountid, keypair);
    document.getElementById('accountidspan').innerHTML = accountid;
}

export async function create_ask_ai_request_body(messages) {
    const near = await nearApi.connect(config);

    const account = await near.account((await keyStore.getAccounts(networkId))[0]);
    const accountId = account.accountId;

    const messagesStringified = JSON.stringify(messages);
    const deposit = BigInt(messagesStringified.length) * 10000000000000000000n;

    const message_hash = sha256(messagesStringified);

    const receiverId = 'jsinrust.near';
    const method_name = 'ask_ai';
    const gas = '30000000000000';
    const publicKey = await account.connection.signer.getPublicKey(account.accountId, account.connection.networkId);

    const accessKey = (await account.findAccessKey()).accessKey;
    console.log(accessKey);
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

export async function send_ask_ai_request(requestbody) {
    try {
        const airesponse = await fetch('https://near-openai.vercel.app/api/openai', {
            method: 'POST',
            body: requestbody
        }).then(r => r.json());
        return airesponse.choices[0].message.content;
    } catch (e) {
        return `Unfortunately, there was an error:

\`\`\`${JSON.stringify(e, null, 1)}\`\`\``;
    }
}

window.onmessage = async (msg) => {
    globalThis.parentOrigin = msg.origin;

    switch (msg.data.command) {
        case 'createaccount':
            window.parent.postMessage({ command: 'accountcreated', secretKey: await createAccount() }, globalThis.parentOrigin);
            break;
        case 'useaccount':
            useAccount(msg.data.secretKey);
            break;
    }
};

document.getElementById('ask_ai_button').addEventListener('click', async () => {
    const requestbody = await create_ask_ai_request_body([{ role: 'user', content: document.getElementById('questiontextarea').value }]);
    console.log(requestbody);
    const response = await send_ask_ai_request(requestbody);
    console.log(response);
    window.parent.postMessage({ command: 'airesponse', airesponse: response }, globalThis.parentOrigin);
});