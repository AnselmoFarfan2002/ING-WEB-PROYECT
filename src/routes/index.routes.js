const express = require('express');
const app = express();

//public folder
app.use( express.static('public') );

//module 1
app.use( require('./module 1 - users accounts/sesiones.js') )

module.exports = app;