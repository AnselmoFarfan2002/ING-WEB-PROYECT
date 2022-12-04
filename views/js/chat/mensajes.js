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


fetch('/usuarios', {method: 'GET'})
.then( res => res.json() )
.then( res => {
	var usuario = { ...res }
	console.log(usuario)
	socket.auth = {username: usuario.USU_CORREO};			
	socket.connect();

	var mensajear = (a,b) => {
		socket.emit('client:message', new mensaje(usuario, chatCode));
	};
})