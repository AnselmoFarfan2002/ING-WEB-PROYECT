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

socket.onAny((event, ...args) => {
  console.log(event, args);
});

var usuario;
var iniciarInteraccion;
var enviarMensaje;

fetch('/usuarios', {method: 'GET'})
.then( res => res.json() )
.then( res => {
	usuario = { ...res }
	socket.auth = {username: usuario.USU_CORREO};			
	socket.connect();

	iniciarInteraccion = (idPublicacion, contenido) => {
		fetch('/chats', {
			method: 'POST',
			body: JSON.stringify({
				emisor: usuario,
				idPublicacion,
				idUsuarioReceptor: document.querySelector('#idau').innerHTML,
				emailUsuarioReceptor: document.querySelector('#corr').innerHTMLL,
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

enviarMensaje = () => {
	
}
