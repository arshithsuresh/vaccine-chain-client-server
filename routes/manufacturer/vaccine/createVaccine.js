const {MANUFACTURER_ADDR,MANUFACTURE_NAME} = require('../constants/constants')
const db = require('../../../core/db')
const VaccineProcessor = require('../../../blockchain/VaccineProcessor/vaccineClient')

const createVaccine = async ()=>{
    try{
            const blockchainResult = await VaccineProcessor.CreateVaccine()

            if(blockchainResult)
            {
                const vaccineAddress = blockchainResult.address
                const query = db.query("INSERT INTO vaccine")
            }
    }
    catch(error)
    {

    }
    
}

module.exports = createVaccine;