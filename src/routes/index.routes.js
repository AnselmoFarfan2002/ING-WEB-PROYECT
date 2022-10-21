const express = require('express');
const app = express();

app.use( express.json() );
app.use( express.urlencoded({extended: false}) );

//public folder
app.use( express.static('public') );

//module 1
app.use( require('./module 1 - users accounts/sesiones.js') )
app.use( require('./module 1 - users accounts/edit-info.js') )

module.exports = app;