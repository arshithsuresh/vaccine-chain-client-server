const api = require('../vaccineAPI')

const {USER_NAMESPACE,USER_PREFIX,USER_FAMILY,USER_VERSION,VACCINE_FAMILY,VACCINE_VERSION} = require('../../constants/index')
const {hash} = require('../crytpo/helper')
const cbor = require('cbor')

const CreateTransaction = require('../utils/createTransaction')
const CreateBatch = require('../utils/createBatch')


const CreatePublicUser = async (payload,signature)=>{

    console.log(payload)
    const address = USER_PREFIX + hash(payload.data.userid).substring(0,64)
    const transaction = CreateTransaction([address],[address],payload, USER_FAMILY, USER_VERSION)

    const transactions = [transaction]
    const batches = CreateBatch(transactions)
    
    console.log("Blockchain address : "+address)

    try {

        await api.post('/batches', batches, {
             headers: { 'Content-Type' : 'application/octet-stream'}
         })
    
         if(result.status == 200)
        {
            return address;
        }
        
    } catch (error) {
        
    }
    
    return null;


}


const CreateUser = async (payload)=>{

    const address = USER_NAMESPACE[2] + hash(payload.data.userid).substring(0,64)    
    const transcation = CreateTransaction([address],[address],payload,USER_FAMILY,USER_VERSION)

    const transactions = [transcation]
    const batches = CreateBatch(transactions) 

    console.log("Create User: Payload = >")
    console.log(payload)

    console.log("Create User: Blockchain address : "+address)
    console.log("Create User: User CreatCreating on Blockchain...")

    try {

        const result = await api.post('/batches', batches, {
            headers: { 'Content-Type' : 'application/octet-stream'}
        })
        
        console.log(result)

        if(result.status == 202)
        {        
            console.log("Create User: User Created on Blockchain!")
            return address;           
        }
        else
        {
            //console.log(result)
        }

        console.log("Create User: User creation on Blockchain Failed")
        
    } catch (error) {
        console.log(error)
    }
    
    return null;

            
}

const GenerateUserAddress = (username)=>{
    const address = USER_NAMESPACE[2] + hash(username).substring(0,64)
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
        ...userData
    }
    
}

module.exports = {
    CreateUser,GetUserDetails,GenerateUserAddress,CreatePublicUser
}
