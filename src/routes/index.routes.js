const express = require('express');
const app = express();

app.use( express.json() );
app.use( express.urlencoded({extended: false}) );

//public folder
app.use( express.static('public') );

//module 1
app.use( require('./module 1 - users accounts/identificador.js') )
app.use( require('./module 1 - users accounts/registrador.js') )
app.use( require('./module 1 - users accounts/editor-datos.js') )

//module 2
app.use( require('./module 2 - users posts/creador.js') )
app.use( require('./module 2 - users posts/editor.js') )
app.use( require('./module 2 - users posts/eliminador.js') )
app.use( require('./module 2 - users posts/refrescador.js') )

module.exports = app;