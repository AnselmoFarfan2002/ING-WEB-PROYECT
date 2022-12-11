const { Router } = require('express');
const router = Router();

const m3 = {}
m3.consultor = require('../controllers/module 3 - users communication/consultor')

router.route('/interacciones').get( m3.consultor.CARGAR_CHATS_DE_USUARIO );
// envios de mensajes implementados en sockets

module.exports = router;