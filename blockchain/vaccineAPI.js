const axios = require('axios').default;

const {BLOCK_REST_API} = require('../core/constants')
const api = axios.create(
    {
        baseURL: BLOCK_REST_API
    }
)
module.exports = api