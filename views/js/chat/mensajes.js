class mensaje {
	Constructor(emisor, chat, contenido){
		this.emisor = emisor,
		this.chat = chat,
		this.contenido = contenido,
		this.multimedia = []
	}
};

const URL = "/";
const socket = io(URL, { autoConnect: false });

var usuario;
var iniciarInteraccion;
var enviarMensaje;

fetch('/usuarios', {method: 'GET'})
.then( res => res.json() )
.then( res => {
	usuario = { ...res }
	socket.auth = {username: usuario.correo};	
	socket.connect();

	iniciarInteraccion = (idPublicacion, contenido) => {
		fetch('/chats', {
			method: 'POST',
			body: JSON.stringify({
				emisor: usuario,
				idPublicacion,
				idUsuarioReceptor: document.querySelector('#idau').innerHTML,
				emailUsuarioReceptor: document.querySelector('#corr').innerHTML,
				contenido,
				multimedia: []
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		// .then( resHTTP => resHTTP.json() )
		.then( resJSON => console.log(resJSON) );
	};
});

enviarMensaje = (emailUsuarioReceptor, idChat) => {
	let inputMsg = document.querySelector('#contenidoMensaje');
	socket.emit( 'client:message', {
		idEmisor: usuario.id,
		idChat,
		emailUsuarioReceptor,
		contenido: inputMsg.value,
		multimedia: []
	})

	let aux = document.createElement('div');
	aux.classList.add('msg');
	aux.classList.add('my-message');
	aux.innerHTML =  `
		<p class="placeholder-glow">
		  ${inputMsg.value}
		</p>
	`;

	inputMsg.value = '';
	inputMsg.focus();

	document.querySelector(`#chatsBoxes #idChat-${idChat}`).appendChild(aux);
}

socket.on('server:message', mensaje => {
	chat = document.querySelector(`#chatsBoxes #idChat-${mensaje.idChat}`);
	if (chat === null) notificar(mensaje.idChat);
	else {
		aux = document.createElement('div');
		aux.classList.add('msg');
		aux.classList.add('frnd-message');
		aux.innerHTML =  `
			<p class="placeholder-glow">
			  ${mensaje.contenido}
			</p>
		`;

		chat.appendChild(aux);
	}
})

socket.on('server:launch:chat', pushHeadChat)