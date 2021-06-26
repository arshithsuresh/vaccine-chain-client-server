const {createContext, CryptoFactory} = require('sawtooth-sdk/signing')
const { Secp256k1PublicKey} = require('sawtooth-sdk/signing/secp256k1')
const { createHash } =require('crypto')

const verifyPayload=(payload,signature,pbkey)=>{

    const context = createContext('secp256k1')
    const public_key = Secp256k1PublicKey.fromHex(pbkey)
    const hash = createHash('sha256')
    
    hash.update(JSON.stringify(payload))
    const payloadhash =  hash.digest('hex')

    const authenticity = context.verify(signature,Buffer.from(payloadhash),public_key);

    return authenticity
} 

module.exports = {
    verifyPayload
}