const { Router } = require('express');
const router = Router();

const {
    INICIAR_SESION
} = require( '../../controllers/module 1 - users accounts/sesiones' )

router.route('/inicio-sesion')
.get( (req, res) => { res.send({msg: 'hola'}) } )
.post( INICIAR_SESION );

module.exports = router;