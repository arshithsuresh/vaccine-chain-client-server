require('dotenv').config();

const {hash} = require('../blockchain/crytpo/helper')
 
const MANUFACTURE_NAME = "ABC MANUFACTURER"
const MANUFACTURER_ADDR = "0x123456"
const ORG_TYPE = "MANUFACTURER"

const USER_VERSION = '1.0'
const VACCINE_VERSION = '1.0'

const USER_FAMILY = process.env.USER_FAM
const VACCINE_FAMILY = process.env.VACCINE_FAM

const USER_NAMESPACE = [ORG_TYPE,USER_FAMILY, hash(MANUFACTURE_NAME).substr(0,6)]

const VACCINE_NAMESPACE = [ORG_TYPE,VACCINE_FAMILY, hash(MANUFACTURE_NAME).substr(0,6)]

const USER_PREFIX= hash('publicuser').substr(0,6)

module.exports = {
    MANUFACTURE_NAME,
    MANUFACTURER_ADDR,
    ORG_TYPE,
    USER_NAMESPACE, 
    VACCINE_NAMESPACE,   
    USER_FAMILY,
    VACCINE_FAMILY,
    USER_VERSION,
    VACCINE_VERSION,
    USER_PREFIX
}