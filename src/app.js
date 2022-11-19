require('dotenv').config();

const express   = require('express');
const morgan    = require('morgan');
const ejs       = require('ejs');
const session   = require('express-session');
const parameters    = require('./config/db-parameters');
const MySQLStore    = require('express-mysql-session');

const app = express();
const sessionStore = new MySQLStore( parameters );

//settings
app.set( 'port', process.env.PORT || 8080 );
app.set('view engine', 'ejs');

//middlewares
app.use( express.json() );
app.use( morgan('dev') );
app.use( session({
    secret: process.env.XLR9,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: { maxAge: 1800000 }
}));

//routes
app.use( express.static('views') );
app.use( require('./routes/_index.routes') );

//starting server
const server = app.listen( app.get('port'), () => {
    console.log('Servidor iniciado :', app.get('port'));
})

module.exports = server;