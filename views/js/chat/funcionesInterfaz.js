const notificar = idChat => {
	console.log('Se ha notificado al chat ...', idChat)
}

document.querySelector('#contenidoMensaje').addEventListener('keydown', tecla => {
	if (tecla.keyCode === 13) document.getElementById('botonEnviar').click();
})