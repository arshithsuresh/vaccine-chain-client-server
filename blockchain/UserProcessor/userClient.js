const api = require('../vaccineAPI')

const {NAMESPACE,ORG_TYPE,USER_FAMILY,USER_VERSION,VACCINE_FAMILY,VACCINE_VERSION} = require('../../routes/manufacturer/constants/constants')
const {hash} = require('../crytpo/helper')
const cbor = require('cbor')

const CreateTransaction = require('../utils/createTransaction')
const CreateBatch = require('../utils/createBatch')

const CreateUser = (payload,signature)=>{

    const address = NAMESPACE[2] + hash(payload.data.userid).substring(0,64)    
    const transcation = CreateTransaction([address],[address],payload,USER_FAMILY,USER_VERSION)

    const transactions = [transcation]
    const batches = CreateBatch(transactions)         
    console.log(address)

     api.post('/batches', batches, {
         headers: { 'Content-Type' : 'application/octet-stream'}
     }).then( response=>{
         console.log("Response form Blockchain Server  ===>>> "+{
             ...response
         })
     }).catch(err=>{
        //console.log(err)
        return null
    })

    return address;        
}
const GenerateUserAddress = (username)=>{
    const address = NAMESPACE[2] + hash(username).substring(0,64)
    return address;
}
const GetUserDetails = async (address)=>{

    //const address = NAMESPACE[2] + hash(username).substring(0,64)
    let userData = null;
    console.log(address)
    
    try {
        const response = await api.get("/state/"+address)
    
        if(response.status == 200)
        {
            const data = response.data.data                        
            const buffer = await Buffer.from(data, 'base64')
            
            userData = cbor.decodeFirstSync(buffer);           
        
        }           
        
    } catch (error) {
        
    }    
       
    return {
        address:address,
        ...userData}
    
}

module.exports = {
    CreateUser,GetUserDetails,GenerateUserAddress
}
