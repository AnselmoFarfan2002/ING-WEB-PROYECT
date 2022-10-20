const nodemailer = require('nodemailer');

const postman = nodemailer.createTransport({
    host: 'takanasoft.tacna.shop',
    port: 465,
    secure: true,
    auth: {
        user: 'soporte@takanasoft.tacna.shop',
        pass: process.env.DB_PASS
    },
    tls: { // ELIMINAR EN PRODUCCION
        rejectUnauthorized: false
    }
});

module.exports = postman;