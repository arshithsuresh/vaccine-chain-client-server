const routes = require('express').Router()
const CreateVaccine = require('./createVaccine');

routes.post('/create', async(req,res,next)=>{

    try {

        console.log("Create Vaccine")
        const data = req.body       

        const username = data.username
        const vaccineData = data.data    
        //const signature = data.signature

        const createVaccine  = await CreateVaccine(username,vaccineData)

        if(createVaccine != false)
        {
            res.status(200).json({
                message: "Vaccine Created"
            })
            return
        }

        
    } catch (error) {
        
    }
    
    next(new Error("Vaccine Creation Failed!"))

})

routes.post('/transfer', async(req,res,next)=>{

    console.log("Transfer Vaccine")

    const data = req.body
    const username = data.username
    const transferdata = data.data

     

})



module.exports = routes