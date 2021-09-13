const {MANUFACTURER_ADDR,MANUFACTURE_NAME} = require('../../../constants/index')
const db = require('../../../core/db')
const UserProcessor = require('../../../blockchain/UserProcessor/userClient')

const CreateUser = async (username,payload)=>{
    
    try {
                
        const public_key = payload.data.publickey
        const public_name = payload.data.public_name
        
        const blockchainResult = await UserProcessor.CreateUser(payload)            

        if(blockchainResult)
        {            
            const userAddress = blockchainResult
            const result = await db.query("INSERT INTO manufacturer (username,publickey,manufactureaddress,userrole,validated,publicname,address) values ($1,$2,$3,$4,1,$5,$6) returning *; ",
                                [username,public_key,MANUFACTURER_ADDR,1,public_name,userAddress])
            
            if(result.rowCount > 0)
            {
                const returnData = result.rows[0]   
                console.log("Create User: User Created in Local Database...")             
                return returnData
            }
        }  

    } catch (error) {
        console.log(error);
    }
    
    return false
}

module.exports = CreateUser;
