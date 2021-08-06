const {MANUFACTURER_ADDR,MANUFACTURE_NAME} = require('../../../constants/index')
const db = require('../../../core/db')
const UserProcessor = require('../../../blockchain/UserProcessor/userClient')



const CreateUser = async (username,payload,signature)=>{
    
    try {
        
        const blockchainResult = await UserProcessor.CreatePublicUser(payload,signature)       

        if(blockchainResult != null)
        {            
            return {
                address: blockchainResult
            }
        }  

    } catch (error) {
        console.log(error);
    }
    
    return false
}

module.exports = CreateUser;
