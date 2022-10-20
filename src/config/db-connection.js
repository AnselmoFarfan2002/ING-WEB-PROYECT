const mysql = require('mysql');
const parameters = require('./db-parameters')

const mysqlConnection = mysql.createConnection( parameters );

mysqlConnection.connect( function ( err ) {
    if( err ){ console.log(err); return; }
    else console.log( 'Base de datos : Acceso permitido' );
});

module.exports = mysqlConnection;