const {MANUFACTURER_ADDR,MANUFACTURE_NAME} = require('../../../constants/index')
const db = require('../../../core/db')
const VaccineProcessor = require('../../../blockchain/VaccineProcessor/vaccineClient')
const { GenerateUserAddress } = require('../../../blockchain/UserProcessor/userClient')
const SignTransaction = require('../../../blockchain/utils/signTransaction')

const CreateVaccine = async (username,vaccineData)=>{

    try{        
            const userAddress = GenerateUserAddress(username);

            const payload ={
                username: username,
                action: vaccineData.action,
                data: { 
                    batchid: vaccineData.batchid,
                    count: vaccineData.count,
                    manufacutureDate: vaccineData.manufacutureDate,
                    expiryDate: vaccineData.expiryDate,
                    location: vaccineData.location,
                    manufacuturer: MANUFACTURE_NAME,
                    manufacutureraddr: MANUFACTURER_ADDR,
                    manufacutureruser: userAddress
                }
            }

            //const signature = SignTransaction(payload)

            console.log("Create Vaccine : Inserting into Blockchain");
            const blockchainResult = await VaccineProcessor.CreateVaccine(username,payload)

            if(blockchainResult)
            {
                console.log("Create Vaccine : Inserting into database...");
                const vaccineAddress = blockchainResult.address
                const query =  await db.query(`INSERT INTO VACCINE (address,batchid,vaccinecount,manufacturedate,expirydate,currentOwner,currentLocation,currentStatus) 
                                                            VALUES($1,$2,$3,$4,$5,$6,$7,0) returning *;`,
                                                            [vaccineAddress,vaccineData.batchid,vaccineData.count,vaccineData.manufacutureDate,vaccineData.expiryDate, JSON.stringify(vaccineData.location)])
                // Insert into database
                if(query.rowCount > 0)
                {
                    const returnData = result.rows[0]        
                    console.log("Create Vaccine : Inserting into database... Success!");        
                    return returnDat
                }
                
                console.log("Create Vaccine : Inserting into database... Failed!");
            }
    }
    catch(error)
    {
        console.log(error)
    }

    return false;
    
}

module.exports = CreateVaccine;