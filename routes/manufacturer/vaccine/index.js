const routes = require('express').Router()
const CreateVaccine = require('./createVaccine');

routes.post('/create', async(req,res,next)=>{

    console.log("Create Vaccine")
    const data = req.body
    

    const username = data.username
    const vaccineData = data.data    
    //const signature = data.signature

    const createVaccine  = await CreateVaccine(username,vaccineData)

})



module.exports = routes