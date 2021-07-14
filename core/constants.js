require('dotenv').config();

const PORT = process.env.PORT || 3000

const BLOCK_REST_API = 'http://localhost:8008'

module.exports = { 
    PORT,
    BLOCK_REST_API  
}