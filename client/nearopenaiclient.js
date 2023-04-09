import { homedir } from 'os';
import { connect, keyStores } from 'near-api-js';
import crypto from 'crypto';

const keyStore = new keyStores.UnencryptedFileSystemKeyStore(`${homedir()}/.near-credentials`);
const config = {
    keyStore, // instance of UnencryptedFileSystemKeyStore
    networkId: 'mainnet',
    nodeUrl: 'https://rpc.mainnet.near.org',
    walletUrl: 'https://wallet.mainnet.near.org',
    helperUrl: 'https://helper.mainnet.near.org',
    explorerUrl: 'https://explorer.mainnet.near.org'
};

export async function ask_ai(messages) {
    const near = await connect(config);

    const account = await near.account(process.env.NEAR_ACCOUNT_ID);
    const accountId = account.accountId;

    const messagesStringified = JSON.stringify(messages);
    const deposit = BigInt(messagesStringified.length) * 10000000000000000000n;

    const message_hash = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(messagesStringified))))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    const result = await account.functionCall({
        contractId: 'jsinrust.near', methodName: 'ask_ai', args: {
            message_hash
        }, attachedDeposit: deposit
    });

    const airesponse = await fetch('https://near-openai.vercel.app/api/openai', {
        method: 'POST',
        body: JSON.stringify({
            transaction_hash: result.transaction.hash,
            sender_account_id: accountId,
            messages: messages
        })
    }).then(r => r.json());
    return airesponse.choices[0].message.content;
}
