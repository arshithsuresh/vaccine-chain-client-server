require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATEKEY
const PUBLIC_KEY = process.env.PUBLICKEY

module.exports = {
    PRIVATE_KEY,
    PUBLIC_KEY
}