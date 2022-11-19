const controllers = {}

controllers.UNIRSE_COMUNICACION = (req, res) => {
    if( req.session.open === true ){
        //creating sockets
        res.render('chat', { userId : req.session.userId });

    } else res.redirect('/?login=false');
}

module.exports = controllers;