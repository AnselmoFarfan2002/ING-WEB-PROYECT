var cajaChats = document.querySelector('#chatListVenta');

const indexarChat = chat => {
	aux = document.createElement('div');
	aux.classList.add('block');
	aux.setAttribute('id', `idChat-${chat.idChat}`);
	aux.setAttribute('onclick',`mostrarChat('${chat.idChat}')`);

	fecha = new Date(chat.ultimaActividad);
	aux.innerHTML = `
		<div class="imgChat">
			<img src="images/posts-photos/${chat.fotos}" class="userProduct">
			<img src="images/profile-photos/${chat.contacto.foto}" class="userRequest">
		</div>

		<div class="msgChat">
			<div class="titleChat">
				<b><span>${chat.titulo}</span></b>
				<p class="time">${fecha.toLocaleDateString()} - ${fecha.toLocaleTimeString().slice(0,5)}</p>
			</div>
			<div class="usernameChat">
				<span>${chat.contacto.nombre}</span>
				<div class="d-none correoContacto">${chat.contacto.correo}</div>
				<div class="d-none idPublicacion">${chat.idPublicacion}</div>
			</div>
		</div>
	`;

	return aux;
}

const pushBackChat = chat => { cajaChats.appendChild( indexarChat(chat) ); }
const pushHeadChat = chat => { cajaChats.insertBefore( indexarChat(chat), cajaChats.querySelector('.block') ); }

const notificar = idChat => { console.log('Se ha notificado al chat ...', idChat) }

document.querySelector('#contenidoMensaje').addEventListener('keydown', tecla => {
	if (tecla.keyCode === 13) document.getElementById('botonEnviar').click();
})