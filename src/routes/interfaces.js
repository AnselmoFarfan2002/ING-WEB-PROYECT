const { Router } = require("express")

const router = Router();
router.route('/inicio')
.get( (req, res) => res.render('publicaciones.ejs', { session: req.session.open }) )

router.route('/publicacion')
.get( (req, res) => res.render('publicacion.ejs', { session: req.session.open, id: req.query.id}) );

router.route('/iniciar-sesion')
.get( (req,res) => req.session.open === true ? res.redirect('/inicio') : res.render('iniciar-sesion.ejs', {session: false}))
.post( (req,res) => res.redirect('/inicio') )

router.route('/cerrar-sesion')
.get( (req,res) => res.redirect('/inicio') )

router.route('/registrar-usuario')
.get( (req,res) => req.session.open === true ? res.redirect('/inicio') : res.render('registrar-usuario.ejs', {session: false}))
.post( (req,res) => res.redirect('/iniciar-sesion') )

router.route('/registrar-publicacion')
.get( (req,res) => !req.session.open === true ? res.redirect('/inicio') : res.render('registrar-publicacion.ejs', {session: req.session.open}))

router.route('/mi-perfil')
.get( (req,res) => req.session.open === true ? res.render('perfil.ejs', {session: req.session.open}) : res.redirect('/inicio'))

router.route('/recuperar-contrasenia')
.get( (req,res) => req.session.open === true ? res.redirect('/inicio') : res.render('recuperar-contrasenia.ejs', {session: false}))

module.exports = router;