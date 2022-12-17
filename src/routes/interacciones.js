const { Router } = require('express');
const router = Router();

const m3 = {}
m3.consultor = require('../controllers/module 3 - users communication/consultor');
m3.editor = require('../controllers/module 3 - users communication/editor');

router.route('/interacciones').get( m3.consultor.CARGAR_CHATS_DE_USUARIO );
router.route('/interacciones/chat/:idChat/visible/:visible').patch( m3.editor.MOSTRAR_OCULTAR_CHAT );
// envios de mensajes implementados en sockets

module.exports = router;