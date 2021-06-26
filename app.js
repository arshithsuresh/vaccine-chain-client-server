
const express = require('express')
const routes = require("./routes")
const cors = require("cors")
const constants = require('./core/constants')
const morgan = require('morgan')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/api/",routes)

app.use(function(err,req,res,next){
    console.error(err)
    res.status(500).json({
        status : "Failed",
        message : err.message
    });
})

app.listen(constants.PORT, ()=> console.log(`Started Listening on PORT ${constants.PORT}`))