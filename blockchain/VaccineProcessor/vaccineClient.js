const { VACCINE_FAMILY, VACCINE_NAMESPACE, VACCINE_VERSION, USER_FAMILY, USER_VERSION } = require('../../constants/index');
const { hash } = require('../crytpo/helper');
const { GenerateUserAddress } = require('../UserProcessor/userClient');
const CreateBatch = require('../utils/createBatch');
const CreateTransaction = require('../utils/createTransaction');
const api = require('../vaccineAPI');
const cbor = require('cbor')

const CreateVaccine = async(username,payload)=>{

        console.log("Creating Vaccine on Blockchain")

        const batchid = payload.data.batchid

        const address = GenerateVaccineAddress(batchid)

        const transaction = CreateTransaction([address],[address],payload, VACCINE_FAMILY, VACCINE_VERSION)

        const transactions = [transaction]
        const batches = CreateBatch(transactions)
        
        console.log("Blockchain address : "+address)        

        try {
    
            const result = await api.post('/batches', batches, {
                headers: { 'Content-Type' : 'application/octet-stream'}
            })
        
            if(result.status == 202)
            {
                return address;
            }
            
        } catch (error) {
            
        }
        
        return null;
}

const GenerateVaccineAddress = (batchid) => {

    const address = VACCINE_NAMESPACE[2] + hash(batchid).substring(0,64)
    return address
}

const GetVaccineDetails = async(address)=>{

    let vaccineData = null;
    console.log(address)
    
    try {
        const response = await api.get("/state/"+address)
    
        if(response.status == 200)
        {
            const data = response.data.data                        
            const buffer = await Buffer.from(data, 'base64')           
            vaccineData = cbor.decodeFirstSync(buffer);           
        
        }           
        
    } catch (error) {
        console.log("Vaccine Details: Error while fetching data!")
        console.error(error)
    }    
       
    return {
        address:address,
        data: vaccineData
    }
}

const VaccinateUser = async( username, vaccinedata)=>{
    

    try {
        
        const payload = {
            action:"vaccinate",
            data: {
                userid:username,
                vaccinedata:vaccinedata
            }
        }

        const userAddress = GenerateUserAddress(username)

        const transaction = CreateTransaction([userAddress],[userAddress],payload,USER_FAMILY,USER_VERSION)
        const transactions = [transaction]

        const batches = CreateBatch(transactions)

        const response = await api.post('/batches', batches, {
            headers: { 'Content-Type' : 'application/octet-stream'}
        })

        if(response.status == 200)
        {
            return true
        }

    } catch (error) {
        console.error(error)
    }

    return false;
}

module.exports={
    CreateVaccine, GetVaccineDetails, GenerateVaccineAddress, VaccinateUser
}