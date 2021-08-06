const routes = require('express').Router();
const userRoutes = require('./user');

const CreatePublicUser = require('./user/createUser')

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