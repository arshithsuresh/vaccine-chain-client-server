const UserProcessor = require('../../../blockchain/UserProcessor/userClient')

const GetUserDetails = async (userAddress)=>{

    const data = await UserProcessor.GetUserDetails(userAddress);    
    return data;
}

module.exports = GetUserDetails