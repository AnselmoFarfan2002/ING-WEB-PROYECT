const Express = require('express');
const app = Express();

//settings
app.set( 'port', process.env.port || 80 );

//server
app.listen( app.get('port'), () => {
    console.log('Servidor iniciado');
})
