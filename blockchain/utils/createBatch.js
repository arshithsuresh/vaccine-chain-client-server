const {PRIVATE_KEY,PUBLIC_KEY} = require('../crytpo/keys')

const {protobuf} = require('sawtooth-sdk')
const {createContext, CryptoFactory} = require('sawtooth-sdk/signing')
const { Secp256k1PublicKey, Secp256k1PrivateKey } = require('sawtooth-sdk/signing/secp256k1')

const CreateBatch = (transactions)=>{

    const context = createContext('secp256k1')
    const privateKey = Secp256k1PrivateKey.fromHex(PRIVATE_KEY)
    const signer = new CryptoFactory(context).newSigner(privateKey)
    
    const batchHeaderBytes = protobuf.BatchHeader.encode({
        signerPublicKey: signer.getPublicKey().asHex(),
        transactionIds: transactions.map((txn)=> txn.headerSignature)
    }).finish()

    const batchHeadSignature = signer.sign(batchHeaderBytes)

    const batch = protobuf.Batch.create({
        header: batchHeaderBytes,
        headerSignature: batchHeadSignature,
        transactions: transactions
    })

    const batchListBytes = protobuf.BatchList.encode({
        batches: [batch]
    }).finish()

    return batchListBytes;
}

module.exports = CreateBatch;