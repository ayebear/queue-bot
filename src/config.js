const { readFileSync } = require('fs')
const config = JSON.parse(readFileSync('./config.json', 'utf8'))
module.exports = config
