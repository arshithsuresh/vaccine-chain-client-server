const routes = require('express').Router();
const {createContext, CryptoFactory} = require('sawtooth-sdk/signing')
const { Secp256k1PublicKey} = require('sawtooth-sdk/signing/secp256k1')

const {verifyPayload} = require('../../core/payloadFunctions')

const db = require('../../core/db');
const verifyAuthenticity = require('./checkAuth');
const vaccineRoutes = require('./vaccine')
const userRoutes = require('./user');

const CreateUser = require('./user/createUser')
const GetUserDetails = require('./user/getuser')
const {GenerateUserAddress} = require('../../blockchain/UserProcessor/userClient')
const { route } = require('./user');


routes.get('/address/:address', async(req,res,next)=>{
    

    const address = req.params.address;
    
    const userData = await GetUserDetails(address);

    if(userData != null)
    {
        res.status(200).json(userData)
        return
    }
    res.status(404).json({message:"no user found on blockchain"})
    //next(new Error("No User Found on blockchain"))

})

routes.get('/user/:username', async(req,res,next)=>{
    

    const username = req.params.username;
    const address = GenerateUserAddress(username)

    const userData = await GetUserDetails(address);

    if(userData != null)
    {
        res.status(200).json(userData)
        return
    }
    res.status(404).json({message:"No user found on blockchain"})
    //next(new Error("No User Found on blockchain"))

})

routes.post('/createuser', async(req,res,next)=>{
    
    //console.log("Manufacturer/Index 17 : ==> ")      
    //console.log(req.body)
    
    const username = req.body.username
    const data = req.body.data 
    const signature = req.body.signature

    try{
        
        const userCreated = await CreateUser(username,data,signature)
        
        if(userCreated)
        {
            const response = {
                message:"User created!",
                data : userCreated
            }
            res.status(200).json(response)
            return 
        }       
    }
    catch(err)
    {
        return next(err)
    }
    
    const error = new Error("Unknown error occured!")
    return next(error)
    
})

routes.use("/vaccine",verifyAuthenticity, vaccineRoutes)
routes.use("/user",verifyAuthenticity,userRoutes)



module.exports = routes