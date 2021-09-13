const routes = require('express').Router();
const { hash } = require('../../blockchain/crytpo/helper');
const { USER_PREFIX } = require('../../constants');
const userRoutes = require('./user');

const CreatePublicUser = require('./user/createUser')
const GetUserDetails = require('./user/getuser')


routes.get("/getuser/:userid",async (req,res,next)=>{


    const username = req.params.userid;

    const address = USER_PREFIX + hash(username).substring(0,64)
    
    const userData = await GetUserDetails(address);

    if(userData != null)
    {
        console.log(userData)
        res.status(200).json(userData)
        return
    }
    res.status(404).json({message:"No user found on blockchain"})

})

routes.post("/create", async (req,res,next)=>{    
     
     const username = req.body.userid
     const data = req.body.data 
     const signature = req.body.signature

    try {
         const userCreated = await CreatePublicUser(username,data,signature)

         if(userCreated)
        {
            const response = {
                message:"User created!",
                data : userCreated
            }
            res.status(200).json(response)
            return 
        }       
         
    } catch (error) {
         
    }
    
})

routes.use("/user", userRoutes)

module.exports = routes