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
					<div class="userIcon d-grid gap-1 d-md-flex justify-content-md-end">
						<span class="notifyChat p-2 bg-primary rounded-circle d-none" id="notifyChat-${chat.idChat}"><span class="visually-hidden">${chat.notificacion}</span></span>

						<i id="optionsChat-${chat.idChat}" class="optionsChat d-none fa-solid fa-caret-down dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></i>
						<ul class="dropdown-menu">
							<li><div class="dropdown-item" id="deleteChat-${chat.idChat}" onclick="ocultarChat(${chat.idChat})">Eliminar chat</div></li>
						</ul>
					</div>
					<div class="d-none correoContacto">${chat.contacto.correo}</div>
					<div class="d-none idPublicacion">${chat.idPublicacion}</div>
				</div>
			</div>
		`;

		cajaChats.appendChild(aux);

		/*-----------NOTIFICACION DE CHAT-----------*/
		const notifyObj = document.querySelector(`#notifyChat-${chat.idChat}`);
		if(chat.notificacion == 1){
			notifyObj.classList.remove('d-none');
		}
		/*-----------MOSTRAR OPCIONES-----------*/
		const optionsBtn = document.querySelector(`#optionsChat-${chat.idChat}`);
		aux.addEventListener("mouseover", function (){
			optionsBtn.classList.remove('d-none');
			optionsBtn.classList.add('d-block');
		});
		aux.addEventListener("mouseout", function (){
			optionsBtn.classList.add('d-none');
			optionsBtn.classList.remove('d-block');
		});
	})
});

const mostrarChat = idChat => {
	/*-----------MARCAR COMO LEIDO-----------*/
	const notifyObj = document.querySelector(`#notifyChat-${idChat}`);
	socket.emit( 'client:notification:check', {
		idUsuario: usuario.id,
		idChat,
	});
	notifyObj.classList.add('d-none');
	/*-----------MOSTRAR DATOS DE USUARIO-----------*/
	datosUsuario(idChat);
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
						  <br><span>${mensaje.hora}</span>
						</p>
					</div>
				`; else aux.innerHTML +=  `
					<div class="msg frnd-message">
						<p class="placeholder-glow">
						  ${mensaje.contenido}
						  <br><span>${mensaje.hora}</span>
						</p>
					</div>
				`
			});
			aux.scrollTop = aux.scrollHeight;
			document.querySelector('#botonEnviar').removeAttribute('disabled')
			document.querySelector('#contenidoMensaje').removeAttribute('disabled')
			document.querySelector('#botonEnviar').setAttribute('onclick', `enviarMensaje(
				'${document.querySelector(`.chatList #idChat-${idChat} .correoContacto`).innerHTML}',
				 ${idChat}
			)`);
		});

	} else document.querySelector(`#chatsBoxes #idChat-${idChat}`).classList.remove('d-none'); 
}

const ocultarChat = idChat => {
	const hideBlock = document.querySelector(`#idChat-${idChat}`);
	fetch(`/interacciones/chat/${idChat}/visible/${0}`,{  
		method: "PATCH",
	}) 
	.then(response => response.json())  
	.then(data => console.log(data),);
	hideBlock.classList.add('d-none');
}

var userInfo = document.querySelector('#rightSide');
const datosUsuario = idUsuario => {
	fetch(`/info-usuario/${idUsuario}`).then( response => response.json()).then( data => {
		userInfo.innerHTML = `
			<div class="headerrightSide d-flex align-items-center justify-content-evenly">
				<span>Informacion del usuario</span>
			</div>

			<div class="userImg">
				<img src="images/profile-photos/${data.datos.foto}" class="img-fluid">
			</div>

			<div class="card border border-0">
				<div class="card-body">
					${data.datos.contacto}
				</div>
				<div class="card-body">
					${data.datos.correo}
				</div>
			</div>
		`; 
	});
}