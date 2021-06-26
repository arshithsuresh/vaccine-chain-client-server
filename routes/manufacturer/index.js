const routes = require('express').Router();
const {createContext, CryptoFactory} = require('sawtooth-sdk/signing')
const { Secp256k1PublicKey} = require('sawtooth-sdk/signing/secp256k1')

const {verifyPayload} = require('../../core/payloadFunctions')

const db = require('../../core/db');
const verifyAuthenticity = require('./checkAuth');
const vaccineRoutes = require('./vaccine')

routes.use("/vaccine",verifyAuthenticity, vaccineRoutes)

module.exports = routes