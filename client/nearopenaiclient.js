import { homedir } from 'os';
import nearApi, { connect, keyStores } from 'near-api-js';
import crypto from 'crypto';

const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${homedir()}/.near-credentials`);
const networkId = 'testnet';
const config = {
    keyStore, // instance of UnencryptedFileSystemKeyStore
    networkId,
    nodeUrl: `https://rpc.${networkId}.near.org`,
    walletUrl: `https://wallet.${networkId}.near.org`,
    helperUrl: `https://helper.${networkId}.near.org`,
    explorerUrl: `https://explorer.${networkId}.near.org`
};

export async function create_ask_ai_request_body(messages) {
    const near = await connect(config);

    const account = await near.account(process.env.NEAR_ACCOUNT_ID);
    const accountId = account.accountId;

    const messagesStringified = JSON.stringify(messages);
    const deposit = BigInt(messagesStringified.length) * 10000000000000000000n;

    const message_hash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(messagesStringified))))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

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

export async function ask_ai(messages) {
    try {
        const airesponse = await fetch('https://near-openai.vercel.app/api/openai', {
            method: 'POST',
            body: await create_ask_ai_request_body(messages)
        }).then(r => r.json());
        return airesponse.choices[0].message.content;
    } catch (e) {
        return `I'm not able to respond properly. It might be because I'm out of funds ( see my available balance here: ${config.walletUrl}/profile/${accountId} ), and in that case just send some NEAR to ${accountId}. Here's my error messge: ${e.message}`;    
    }
}
