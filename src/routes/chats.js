const { Router } = require('express');
const router = Router();

const m3 = {}
m3.comunicador = require('../controllers/module 3 - users communication/comunicador')

router.route('/mis-conversaciones').get( m3.comunicador.CARGAR_COMUNICADOR );
router.route('/chats').post( m3.comunicador.LANZAR_CHAT ); 

// envios de mensajes implementados en sockets

module.exports = router;