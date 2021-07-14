const routes = require('express').Router()
const CreateUser = require('./createUser');
const LoginUser = require('./login')


routes.post('/login', async (req,res,next)=>{
    
    console.log("User Loggedin Successfully!")

    res.status(200).json(
        {
            data: {...res.userDetails}
        }
    )
})


module.exports = routes