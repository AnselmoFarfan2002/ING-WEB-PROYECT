var cajaChats = document.querySelector('.chatlist');

fetch(`/interacciones`).then( resHTTP => resHTTP.json() ).then( resJSON => {
	let aux;
	resJSON.chats.forEach(chat => {
		aux = document.createElement('div');
		aux.classList.add('block');
		aux.setAttribute('onclick',`mostrarChat('${chat.idChat}')`);

		aux.innerHTML = `
			<div class="imgbox">
				<img src="images/posts-photos/${chat.fotos}" class="cover">
			</div>

			<div class="details">
				<div class="listHead">
					<h4>${chat.titulo}</h4>
					<p class="time">${(new Date(chat.ultimaActividad)).toLocaleDateString()} - ${chat.ultimaActividad.slice(11,16)}</p>
				</div>
				<div class="owner-product" style="width: 150px">
					<p>
					  ${chat.contacto.nombre}
					</p>
				</div>
			</div>
		`;

		cajaChats.appendChild(aux);
	})
		
	console.log(resJSON);
});

const mostrarChat = idChat => {
	// oculta todos los chats
	document.querySelectorAll('#chatsBoxes .chatbox').forEach( nodo => {
		nodo.classList.remove('d-none');
		nodo.classList.add('d-none');
	});

	if ( document.getElementById(`idChat-${idChat}`) === null ) {
		// CREACION DE CAJA DE CHAT
		aux = document.createElement('div');
		aux.classList.add('chatbox');
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
					<div class="msg frnd-message">
						<p class="placeholder-glow">
						  ${mensaje.contenido}
						</p>
					</div>
				`; else aux.innerHTML +=  `
					<div class="msg my-message">
						<p class="placeholder-glow">
						  ${mensaje.contenido}
						</p>
					</div>
				`
			});
			console.log(resJSON)
		});
	} else document.getElementById(`idChat-${idChat}`).classList.remove('d-none');
}
