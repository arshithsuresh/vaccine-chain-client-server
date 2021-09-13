const routes = require('express').Router()

const TranferVaccine = require('./transferVaccine');
const MonitorData = require('./monitorVaccine')

routes.post('/monitor', async(req,res,next)=>{

    console.log("Transfer Vaccine")

    const data = req.body
    const username = data.username
    const monitordata = data.data

})

routes.post('/transfer', async(req,res,next)=>{

    console.log("Transfer Vaccine")

    const data = req.body
    const username = data.username
    const transferdata = data.data

     

})



module.exports = routes