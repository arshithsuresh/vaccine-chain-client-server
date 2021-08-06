const { VaccinateUser } = require('../../blockchain/VaccineProcessor/vaccineClient')
const routes = require('express').Router();

routes.post("/vaccinate", async(req,res,next)=>{
    
    console.log(req.body)
    const username = req.body.username
    const vaccinedata = req.body.vaccinedata

    try {
        
        const blockchainResult = await VaccinateUser(username, vaccinedata)

        if(blockchainResult == true)
        {
            res.status(200)
            res.json({
                message:"User Vaccinated!"
            })
        }

    } catch (err) {
        
    }

})

module.exports = routes