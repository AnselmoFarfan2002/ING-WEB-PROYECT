var cajaChats = document.querySelector('#chatListVenta');

fetch(`/interacciones`).then( resHTTP => resHTTP.json() ).then( resJSON => {
	let aux;
	resJSON.chats.forEach(chat => {
		aux = document.createElement('div');
		aux.classList.add('block');
		aux.setAttribute('id', `idChat-${chat.idChat}`);
		aux.setAttribute('onclick',`mostrarChat('${chat.idChat}')`);

		aux.innerHTML = `
			<div class="imgChat">
				<img src="images/posts-photos/${chat.fotos}" class="userProduct">
				<img src="images/profile-photos/${chat.contacto.foto}" class="userRequest">
			</div>

			<div class="msgChat">
				<div class="titleChat">
					<b><span>${chat.titulo}</span></b>
					<span class="time">${(new Date(chat.ultimaActividad)).toLocaleDateString()} - ${chat.ultimaActividad.slice(11,16)}</span>
				</div>
				<div class="usernameChat">
					<span>${chat.contacto.nombre}</span>
					<div class="d-none correoContacto">${chat.contacto.correo}</div>
					<div class="d-none idPublicacion">${chat.idPublicacion}</div>
				</div>
			</div>
		`;

		cajaChats.appendChild(aux);
	})
});

const mostrarChat = idChat => {
	// oculta aviso inicial
	const mainBox = document.getElementById('contentChat1');
	const mainBoxChat = document.getElementById('contentChat2');
	mainBox.classList.add('d-none');
	mainBoxChat.classList.add('d-block');
	mainBoxChat.classList.remove('d-none');
	// oculta todos los chats
	document.querySelectorAll('#chatsBoxes .chatBox').forEach( nodo => {
		nodo.classList.remove('d-none');
		nodo.classList.add('d-none');
	});

	if ( document.querySelector(`#chatsBoxes #idChat-${idChat}`) === null ) {
		document.querySelector('#botonEnviar').removeAttribute('onclick');
		document.querySelector('#botonEnviar').setAttribute('disabled','true')
		document.querySelector('#contenidoMensaje').setAttribute('disabled','true')

		// CREACION DE CAJA DE CHAT
		aux = document.createElement('div');
		aux.classList.add('chatBox');
		aux.setAttribute('id', `idChat-${idChat}`);

		aux.innerHTML = `
			<div class="msg my-message">
				<p class="placeholder-glow">
				  <span class="placeholder col-12">CARGANDO - CARGANDO - CARGANDO - CARGANDO</span>
				</p>
			</div>

			<div class="msg my-message">
				<p class="placeholder-glow">
				  <span class="placeholder col-12">CARGANDO - CARGANDO - CARGANDO</span>
				</p>
			</div>

			<div class="msg frnd-message">
				<p class="placeholder-glow">
				  <span class="placeholder col-12">CARGANDO - CARGANDO </span>
				</p>
			</div>

			<div class="msg frnd-message">
				<p class="placeholder-glow">
				  <span class="placeholder col-12">CARGANDO - CARGANDO - CARGANDO </span>
				</p>
			</div>

			<div class="msg my-message">
				<p class="placeholder-glow">
				  <span class="placeholder col-12">CARGANDO - CARGANDO - CARGANDO</span>
				</p>
			</div>

			<div class="msg my-message">
				<p class="placeholder-glow">
				  <span class="placeholder col-12">CARGANDO - CARGANDO - CARGANDO - CARGANDO</span>
				</p>
			</div>

			<div class="msg frnd-message">
				<p class="placeholder-glow">
				  <span class="placeholder col-12">CARGANDO - CARGANDO</span>
				</p>
			</div>
		`

		document.getElementById('chatsBoxes').appendChild(aux);

		fetch(`/chats/${idChat}`).then( resHTTP => resHTTP.json() ).then( resJSON => {
			aux.innerHTML = '';
			resJSON.chat.mensajes.forEach( mensaje => {
				if (mensaje.emisor != usuario.id) aux.innerHTML +=  `
					<div class="msg my-message">
						<p class="placeholder-glow">
						  ${mensaje.contenido}
						</p>
					</div>
				`; else aux.innerHTML +=  `
					<div class="msg frnd-message">
						<p class="placeholder-glow">
						  ${mensaje.contenido}
						</p>
					</div>
				`
			});

			document.querySelector('#botonEnviar').removeAttribute('disabled')
			document.querySelector('#contenidoMensaje').removeAttribute('disabled')
			document.querySelector('#botonEnviar').setAttribute('onclick', `enviarMensaje(
				'${document.querySelector(`.chatList #idChat-${idChat} .correoContacto`).innerHTML}',
				 ${idChat}
			)`);
		});

	} else document.querySelector(`#chatsBoxes #idChat-${idChat}`).classList.remove('d-none'); 
}

const datosUsuario = idUsuario => {

}