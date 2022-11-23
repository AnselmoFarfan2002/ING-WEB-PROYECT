const { Router } = require("express")

const router = Router();
router.route('/inicio')
.get( (req, res) => res.render('publicaciones.ejs', { session: req.session.open }) );

router.route('/publicacion')
.get( (req, res) => res.render('publicacion.ejs', { session: req.session.open, id: req.query.id }) );


module.exports = router;