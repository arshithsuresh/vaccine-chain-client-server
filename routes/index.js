const routes = require('express').Router();

const manufacturerRoute = require('./manufacturer')
const publicRoutes = require('./public')
const distributerRoutes = require('./distributer')
const vaccinatorRoutes = require('./vaccinator')

routes.use("/manufacturer", manufacturerRoute)
routes.use("/public", publicRoutes)
routes.use("/vaccinator", vaccinatorRoutes)




module.exports = routes