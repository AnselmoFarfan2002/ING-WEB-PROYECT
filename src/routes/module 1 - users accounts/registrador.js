const { Router } = require('express');
const router = Router();

const {
    REGISTRAR_CUENTA
} = require( '../../controllers/module 1 - users accounts/registrador' )

router.route( '/registrar-cuenta' )
.get( (req, res) => { res.send({msg: 'Registre una nueva cuenta'}) } )
.post( REGISTRAR_CUENTA );

module.exports = router;