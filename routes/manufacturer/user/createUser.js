const UserModel = require('../models/userModel')
const {MANUFACTURER_ADDR,MANUFACTURE_NAME} = require('../constants/constants')
const db = require('../../../core/db')
const UserProcessor = require('../../../blockchain/UserProcessor/userClient')

const CreateUser = async (username,payload,signature)=>{
    
    try {

        //console.log("\n Blokchain=> Create User 10 ====>")
        //console.log(payload)
        const public_key = payload.data.publickey
        const public_name = payload.data.public_name
        
        const blockchainResult = await UserProcessor.CreateUser(payload,signature)
              
        if(blockchainResult != null)
        {
            
            const userAddress = blockchainResult
            const result = await db.query("INSERT INTO manufacturer (username,publickey,manufactureaddress,userrole,validated,publicname,address) values ($1,$2,$3,$4,1,$5,$6) returning *; ",
                                [username,public_key,MANUFACTURER_ADDR,1,public_name,userAddress])
            
            if(result.rowCount > 0)
            {
                const returnData = result.rows[0]
                return returnData
            }
        }  

    } catch (error) {
        console.log(error);
    }
    
    return false
}

module.exports = CreateUser;
