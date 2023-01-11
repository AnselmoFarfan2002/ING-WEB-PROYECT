const { Router } = require("express");
const router = Router();

router.route('/')
.get( (req, res) => {res.redirect('/inicio');} );

router.route('/inicio')
.get( (req, res) => !req.session.open === true ? res.render('index.ejs', { session: req.session.open }) : res.redirect('/dashboard'))

router.route('/dashboard')
.get( (req, res) => !req.session.open === true ? res.redirect('/inicio') : res.render('usuario.dashboard.ejs', {session: req.session.open}) )

router.route('/lista-publicaciones')
.get( (req, res) => res.render('publicacion.varios.ejs', {session: req.session.open}))

router.route('/publicacion')
.get( (req, res) => res.render('publicacion.singular.ejs', { session: req.session.open, id: req.query.id}) );

router.route('/iniciar-sesion')
.get( (req,res) =>  res.render('iniciar-sesion.ejs', {session: req.session.open}))
.post( (req,res) => res.redirect('/inicio') )

router.route('/cerrar-sesion')
.get( (req,res) => res.redirect('/inicio') )

router.route('/registrarse')
.get( (req,res) => req.session.open === true ? res.redirect('/inicio') : res.render('usuario.registro.ejs', {session: false}))

router.route('/registrar-publicacion')
.get( (req,res) => !req.session.open === true ? res.redirect('/inicio') : res.render('publicacion.registro.ejs', {session: req.session.open}))

router.route('/mis-publicaciones')
.get( (req,res) => !req.session.open === true ? res.redirect('/inicio') : res.render('publicacion.propio.ejs', {session: req.session.open}))

router.route('/editar-publicacion')
.get( (req,res) => !req.session.open === true ? res.redirect('/inicio') : res.render('editar-publicacion.ejs', { session: req.session.open, id: req.query.id}))

router.route('/mi-perfil')
.get( (req,res) => req.session.open === true ? res.render('usuario.perfil.ejs', {session: req.session.open}) : res.redirect('/inicio'))

router.route('/recuperar-contrasenia')
.get( (req,res) => req.session.open === true ? res.redirect('/inicio') : res.render('recuperar-contrasenia.ejs', {session: false}))

router.route('/*').get( (req, res) => res.redirect('/inicio') );    

module.exports = router;