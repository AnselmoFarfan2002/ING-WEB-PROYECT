const options = {
    host: 'localhost',
    user: 'anselmo',
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}

module.exports = options;