
const TransferVaccine =(owneraddress, transferAddress)=>{

    try
    {
        const userAddress = GenerateUserAddress(owneraddress);
        

    }
    catch(error)
    {
        console.log(error)
    }

    return false;
    
}

module.exports = TransferVaccine;