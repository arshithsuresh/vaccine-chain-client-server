const routes = require('express').Router();

const manufacturerRoute = require('./manufacturer')
const userRoutes = require('./user')
const distributerRoutes = require('./distributer')

routes.use("/manufacturer", manufacturerRoute)
routes.use("/user", manufacturerRoute)




module.exports = routes