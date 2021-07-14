const routes = require('express').Router()
const createVaccine = require('./createVaccine');

routes.post('/create', async(req,res,next)=>{
    console.log("create vaccine")
    
})

module.exports = routes