const notificar = idChat => {
	/*-----------NUEVA NOTIFICACION-----------*/
	const notifyObj = document.querySelector(`#notifyChat-${idChat}`);
	socket.emit( 'client:notification:new', {
		idUsuario: usuario.id,
		idChat,
	})
	notifyObj.classList.remove('d-none');
}

document.querySelector('#contenidoMensaje').addEventListener('keydown', tecla => {
	if (tecla.keyCode === 13) document.getElementById('botonEnviar').click();
})