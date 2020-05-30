const { Pool } = require('pg');
const config = require('./config.js');
const pool = new Pool(config);

if (config == null) {
    console.error('\x1b[31m%s\x1b[0m', 'Database configuration file (db/config.js) is undefined.');
    return 1;
}

module.exports = {
    query: (text, params, callback) => {
        const start = Date.now()
        return pool.query(text, params, (err, res) => {
            const duration = Date.now() - start
            console.log('executed query', { text, duration, rows: res.rowCount })
            callback(err, res)
        })
    },
};