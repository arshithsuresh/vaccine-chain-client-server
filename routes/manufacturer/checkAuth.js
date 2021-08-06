const {verifyPayload} = require('../../core/payloadFunctions')
const db = require('../../core/db');

const verifyAuthenticity= async (req,res,next)=>{

    const username = req.body.username
    const payload = req.body.data
    const signature = req.body.signature    
    const query = "SELECT * FROM manufacturer WHERE username =$1";

    try{
        const userdetails = await db.query(query,[username])

        if(userdetails.rowCount > 0)
        {
            const publickey = userdetails.rows[0].publickey            
            const authResult = verifyPayload(payload,signature,publickey)

            if(authResult)
            {
                res.userDetails = userdetails.rows[0]
                console.log("User Authenticated!")
                return next();
            }
        }             
    }
    catch(err){

        return next(err)
    }

    return next(new Error("Error : Failed to confirm authenticity"))
}

module.exports = verifyAuthenticity
