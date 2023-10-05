const slsHttp = require('serverless-http');
const app = require('./index');

module.exports.hapi = slsHttp(app.listener);
