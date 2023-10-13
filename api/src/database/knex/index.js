const config = require('./config/knex_config.js');
const knex = require('knex');
const connection = knex(config.development);

module.exports = connection;