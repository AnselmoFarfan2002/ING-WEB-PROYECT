const notificar = idChat => {
	/*-----------NUEVA NOTIFICACION-----------*/
	var URLActual = window.location.pathname
	if(URLActual == '/dashboard'){
		socket.emit( 'client:notification:new', {
			idUsuario: usuario.id,
			idChat,
		})
		cargarMsgNoLeidos();
		document.querySelector('.alertBadge').classList.remove('d-none');
	}else{
		const notifyObj = document.querySelector(`#notifyChat-${idChat}`);
		const chatBox = document.querySelector(`#idChat-${idChat} .idListaChat`).innerHTML;
		const chatNotify = document.querySelector(`#notifyChat-${idChat} .notifyPin`).innerHTML;
	
		socket.emit( 'client:notification:new', {
			idUsuario: usuario.id,
			idChat,
		})
		notifyObj.classList.remove('d-none');
	
		if(chatBox==1 && chatNotify==0){
			contV=contV+1;
			document.getElementById("notifyChats1").classList.remove('d-none');
			document.getElementById("notifyChats1").innerHTML = contV;
			document.querySelector(`#notifyChat-${idChat} .notifyPin`).innerHTML = 1;
		}
		if(chatBox==2 && chatNotify==0){
			contC=contC+1;
			document.getElementById("notifyChats2").classList.remove('d-none');
			document.getElementById("notifyChats2").innerHTML = contC;
			document.querySelector(`#notifyChat-${idChat} .notifyPin`).innerHTML = 1;
		}
	
		hora = new Date();
		document.querySelector(`#idChat-${idChat} .time`).innerHTML = hora.toLocaleDateString() + " - " + hora.toLocaleTimeString().slice(0,5);
	}
}

document.querySelector('#contenidoMensaje').addEventListener('keydown', tecla => {
	if (tecla.keyCode === 13) document.getElementById('botonEnviar').click();
})