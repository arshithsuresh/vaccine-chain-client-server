const {PRIVATE_KEY,PUBLIC_KEY} = require('../crytpo/keys')

const {protobuf} = require('sawtooth-sdk')
const {createContext, CryptoFactory} = require('sawtooth-sdk/signing')
const {Secp256k1PrivateKey } = require('sawtooth-sdk/signing/secp256k1')

const { createHash } =require('crypto')


// inputs-> array of inputs
const CreateTransaction= (inputs,outputs,payload,FAMILY,VERSION)=>{

    const context = createContext('secp256k1')
    const privateKey = Secp256k1PrivateKey.fromHex(PRIVATE_KEY)
    const signer = new CryptoFactory(context).newSigner(privateKey)

    const payloadBytes = Buffer.from(JSON.stringify(payload))    
     
    const transcationHeaderBytes = protobuf.TransactionHeader.encode(
        {
            familyName : FAMILY,
            familyVersion: VERSION,
            inputs:inputs,
            outputs:outputs,
            signerPublicKey: PUBLIC_KEY,
            batcherPublicKey: PUBLIC_KEY,
            dependencies:[],
            payloadSha512: createHash('sha512').update(payloadBytes).digest('hex')

        }
    ).finish()

    const headSignature = signer.sign(transcationHeaderBytes)

    const transcation = protobuf.Transaction.create({
        header : transcationHeaderBytes,
        headerSignature : headSignature,
        payload: payloadBytes
    })

    return transcation

}

module.exports = CreateTransaction;