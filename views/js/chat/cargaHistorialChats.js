var cajaChats = document.querySelector('#chatListVenta');
var cajaChatsC = document.querySelector('#chatListCompra');
var contC=0, contV=0;

fetch(`/interacciones`).then( resHTTP => resHTTP.json() ).then( resJSON => {
	let aux;
	resJSON.chats.forEach(chat => {
		aux = document.createElement('div');
		aux.classList.add('block');
		aux.setAttribute('id', `idChat-${chat.idChat}`);

		if(usuario.id == chat.idAutor){
			if(chat.notificacion == 1){
				contV=contV+1;
			}
			aux.innerHTML = `
				<div class="infoBlock" onclick="mostrarChat('${chat.idChat}')">
					<div class="imgChat">
						<img src="images/posts-photos/${chat.fotos}" class="userProduct">
						<img src="images/profile-photos/${chat.contacto.foto}" class="userRequest">
					</div>

					<div class="msgChat">
						<div class="titleChat">
							<b><span>${chat.titulo}</span></b>
							<span class="time">${(new Date(chat.ultimaActividad)).toLocaleDateString()} - ${new Date(chat.ultimaActividad).toLocaleTimeString().slice(0,5)}</span>
						</div>
						<div class="usernameChat">
							<span>${chat.contacto.nombre}</span>
							<div class="d-none correoContacto">${chat.contacto.correo}</div>
							<div class="d-none idPublicacion">${chat.idPublicacion}</div>
							<div class="d-none idListaChat">1</div>
						</div>
					</div>
				</div>
				<div class="userInfo btn-group dropup">
					<span class="notifyChat p-2 bg-primary rounded-circle d-none" id="notifyChat-${chat.idChat}"><span class="notifyPin visually-hidden">${chat.notificacion}</span></span>
					<i id="optionsChat-${chat.idChat}" class="optionsChat fa-solid fa-chevron-down dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></i>
					<ul class="dropdown-menu">
						<li><button class="dropdown-item" type="button" id="deleteChat-${chat.idChat}" onclick="ocultarChat(${chat.idChat})">Eliminar chat</button></li>
					</ul>
				</div>
			`;
			cajaChats.appendChild(aux);
		}else{
			if(chat.notificacion == 1){
				contC=contC+1;
			}
			aux.innerHTML = `
				<div class="infoBlock" onclick="mostrarChat('${chat.idChat}')">
					<div class="imgChat">
						<img src="images/posts-photos/${chat.fotos}" class="userProduct">
						<img src="images/profile-photos/${chat.contacto.foto}" class="userRequest">
					</div>

					<div class="msgChat">
						<div class="titleChat">
							<b><span>${chat.titulo}</span></b>
							<span class="time">${(new Date(chat.ultimaActividad)).toLocaleDateString()} - ${new Date(chat.ultimaActividad).toLocaleTimeString().slice(0,5)}</span>
						</div>
						<div class="usernameChat">
							<span>${chat.contacto.nombre}</span>
							<div class="d-none correoContacto">${chat.contacto.correo}</div>
							<div class="d-none idPublicacion">${chat.idPublicacion}</div>
							<div class="d-none idListaChat">2</div>
						</div>
					</div>
				</div>
				<div class="userInfo btn-group dropup">
					<span class="notifyChat p-2 bg-primary rounded-circle d-none" id="notifyChat-${chat.idChat}"><span class="notifyPin visually-hidden">${chat.notificacion}</span></span>
					<i id="optionsChat-${chat.idChat}" class="optionsChat fa-solid fa-chevron-down dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false"></i>
					<ul class="dropdown-menu">
						<li><button class="dropdown-item" type="button" id="deleteChat-${chat.idChat}" onclick="ocultarChat(${chat.idChat})">Eliminar chat</button></li>
					</ul>
				</div>
			`;
			cajaChatsC.appendChild(aux);
		}
		//-----------NOTIFICACION DE CHAT-----------
		const notifyObj = document.querySelector(`#notifyChat-${chat.idChat}`);
		if(chat.notificacion == 1){
			notifyObj.classList.remove('d-none');
		}
	})
	//-----------CANTIDAD DE CHATS NO LEIDOS-----------
	if(contV>0){
		document.getElementById("notifyChats1").classList.remove('d-none');
		document.getElementById("notifyChats1").innerHTML = contV;
	}
	if(contC>0){
		document.getElementById("notifyChats2").classList.remove('d-none');
		document.getElementById("notifyChats2").innerHTML = contC;
	}
});

const mostrarChat = idChat => {
	/*-----------MARCAR COMO LEIDO-----------*/
	marcarLeido(idChat);
	/*-----------CARGAR DATOS DE USUARIO-----------*/
	datosUsuario(idChat);
	// oculta aviso inicial
	const mainBox = document.querySelector('.mainBox');
	const mainBoxChat = document.querySelector('.mainBoxchat');
	mainBoxChat.setAttribute('id', `contentChat2-${idChat}`);
	mainBox.classList.add('d-none');
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
						  <span class="timeR">${mensaje.hora}</span>
						</p>
					</div>
				`; else aux.innerHTML +=  `
					<div class="msg frnd-message">
						<p class="placeholder-glow">
						  ${mensaje.contenido}
						  <span class="timeL">${mensaje.hora}</span>
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

const datosUsuario = idUsuario => {
	var userInfo = document.querySelector('.infoUsuario');
	fetch(`/chats/${idUsuario}/contacto`).then( response => response.json()).then( data => {
		userInfo.setAttribute("id",`idBox-${idUsuario}`);
		userInfo.innerHTML = `
			<div class="headerrightSide">
				<span><i id="closeInfo" class="fa-solid fa-xmark"></i></span>
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

			<div class="deleteChat">
				<button type="button" class="btn btn-outline-danger" onclick="ocultarChat(${idUsuario})">Eliminar chat</button>
			</div>
		`; 
		const closeBtn = document.querySelector('#closeInfo');
		closeBtn.addEventListener('click',()=>{
			document.querySelector('.infoUsuario').classList.toggle('active');
			document.getElementById('mediumSide').classList.toggle('active');
		});
	});
}

const marcarLeido = idChat => {
	const notifyObj = document.querySelector(`#notifyChat-${idChat}`);
	const chatBox = document.querySelector(`#idChat-${idChat} .idListaChat`).innerHTML;
	const chatNotify = document.querySelector(`#notifyChat-${idChat} .notifyPin`).innerHTML;

	socket.emit( 'client:notification:check', {
		idUsuario: usuario.id,
		idChat,
	});
	notifyObj.classList.add('d-none');

	if(chatBox==1 && chatNotify==1){
		contV=contV-1;
		if(contV==0){
			document.getElementById("notifyChats1").classList.add('d-none');
		}else{
			document.getElementById("notifyChats1").innerHTML = contV;
		}
	}else if(chatBox==2 && chatNotify==1){
		contC=contC-1;
		if(contC==0){
			document.getElementById("notifyChats2").classList.add('d-none');
		}else{
			document.getElementById("notifyChats2").innerHTML = contC;
		}
	}
}

const ocultarChat = idChat => {
	const hideBlock = document.querySelector(`#idChat-${idChat}`);
	const showMainSection = document.querySelector('#contentChat1');
	const hideMediumSection = document.getElementById(`contentChat2-${idChat}`);
	const hideMedium = document.getElementById('mediumSide');
	const hiderightSide = document.getElementById(`idBox-${idChat}`);
	fetch(`/interacciones/chat/${idChat}/visible/${0}`,{  
		method: "PATCH",
	}) 
	.then(response => response.json())  
	.then(data => console.log(data))
	hideBlock.classList.add('d-none');
	hiderightSide.classList.remove('active');
	hideMediumSection.classList.add('d-none');
	hideMedium.classList.remove('active');
	showMainSection.classList.remove('d-none');
}