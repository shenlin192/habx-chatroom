/**
 * Created by shenlin on 05/01/2018.
 */
const { app } = require('../../bin/www');
const clearDB = require('mocha-mongoose')(process.env.DB_URL_TEST, { noClear: true });

module.exports = { clearDB, app };
