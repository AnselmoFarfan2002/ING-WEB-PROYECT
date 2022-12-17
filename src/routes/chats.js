const { Router } = require('express');
const router = Router();

const m3 = {}
m3.comunicador = require('../controllers/module 3 - users communication/comunicador');
m3.consultor = require('../controllers/module 3 - users communication/consultor')

router.route('/mis-conversaciones').get( m3.comunicador.CARGAR_COMUNICADOR );
router.route('/chats').post( m3.comunicador.LANZAR_CHAT ); 
router.route('/chats/:idChat').get( m3.consultor.DAR_CHAT );
router.route('/info-usuario/:idChat').get( m3.consultor.DAR_INFO_USUARIO ); 

// envios de mensajes implementados en sockets

module.exports = router;