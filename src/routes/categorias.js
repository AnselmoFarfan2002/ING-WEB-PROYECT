const { Router } = require('express');
const router = Router();

const m2 = {};
m2.consultor = require('../controllers/module 2 - users posts/consultor');

router.route('/categorias').get( m2.consultor.OBTENER_CATEGORIAS );

module.exports = router;