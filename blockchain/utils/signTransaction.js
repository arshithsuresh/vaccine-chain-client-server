const {createContext, CryptoFactory} = require('sawtooth-sdk/signing')
const { Secp256k1PrivateKey } = require('sawtooth-sdk/signing/secp256k1')
const { createHash } =require('crypto')
const { PRIVATE_KEY } = require('../crytpo/keys')

const SignTransaction = (data)=>{

    const context = createContext('secp256k1')
    const privateKeyHex = PRIVATE_KEY

    if(!privateKeyHex)
        return false

    const privateKey = Secp256k1PrivateKey.fromHex(privateKeyHex)
    const signer = new CryptoFactory(context).newSigner(privateKey)

    const hash = createHash('sha256')
    hash.update(JSON.stringify(data))  
    const hashedPayload = hash.digest('hex') 
    const signedPayload = signer.sign(hashedPayload)

    return signedPayload

}

module.exports = SignTransaction