const express = require('express');
const app = express();

app.use( express.json() );
app.use( express.urlencoded({extended: false}) );

app.use( require('./empresas') )
app.use( require('./usuarios') )
app.use( require('./publicaciones') )
app.use( require('./sesiones') )
app.use( require('./interacciones') )

app.use( require('./interfaces') )

module.exports = app;