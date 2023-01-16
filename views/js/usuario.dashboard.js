fetch('/publicaciones?self=1')
.then( res => res.json() )
.then( mis_publicaciones => {
    console.log(mis_publicaciones);
    mis_publicaciones.forEach( publicacion => {
        console.log(publicacion);
        publicacion.fotos = JSON.parse(publicacion.fotos);

        let fotos = "";
        publicacion.fotos.forEach( foto => {
            fotos += `
            <div class="carousel-item active">
                <img src="/images/posts-photos/${foto}" style="height: 280px; border-radius:20px;" class="d-block w-100">
            </div>
            `;
        } );

        publicacion = `
            <div class="mb-0">
                <div class="row row-cols-1 row-cols-sm-2">
                    <div class="col-3">
                        <div id="fotosPublicacion" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                ${fotos}
                            </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#fotosPublicacion" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#fotosPublicacion" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                        </div>
                    </div>
    
                    <div class="col-9">
                        <ul class="list-group list-group-flush">
                            <li id="titulo" class="list-group-item">Nombre de publicación: ${publicacion.titulo} </li>
                            <li id="fecha" class="list-group-item">Fecha de la publicación: ${new Date (`${publicacion.fecha}`).toLocaleDateString()} </li>
                            <li id="categoria" class="list-group-item">Categoría: ${publicacion.categoria}</li>
                            <li id="tipo" class="list-group-item">Subcategoría: ${publicacion.categoriaSuperior?publicacion.categoriaSuperior:"No se presenta"}</li>
                            <li id="negociabilidad" class="list-group-item">Negociable: 
                                    <input class="form-check-input" type="checkbox" role="switch" ${publicacion.negociable?"checked":""} disabled>
                            </li>
                            <li id="precio" class="list-group-item">Precio: ${publicacion.precio}</li>
                            <br><br>
                        </ul>
                    </div>
                </div>
            </div>
        `; 
        document.querySelector('#last_pub').innerHTML = publicacion;
    });   
})

cargarMsgNoLeidos();

function cargarMsgNoLeidos(){
    var blocknotRead = document.querySelector('.notRead');
    blocknotRead.innerHTML = '';
    fetch(`/interacciones`).then( resHTTP => resHTTP.json() ).then( resJSON => {
        let aux, cont = 0;
        resJSON.chats.forEach(chat => {
            if(chat.notificacion == 1){
                cont=cont+1;
            }
        })
        resJSON.chats.forEach(chat => {
            if(chat.notificacion == 1){
                aux = document.createElement('div');
                aux.classList.add('block');
    
                aux.innerHTML = `
                    <div class="infoBlock">
                        <div class="imgChat">
                            <img src="images/posts-photos/${chat.fotos}" class="userProduct">
                        </div>
                        <div class="msgChat">
                            <div class="titleChat">
                                <b><span>${chat.titulo}</span></b>
                                <span class="time">${(new Date(chat.ultimaActividad)).toLocaleDateString()} - ${new Date(chat.ultimaActividad).toLocaleTimeString().slice(0,5)}</span>
                            </div>
                            <div class="usernameChat">
                                <span>${chat.contacto.nombre}</span>
                            </div>
                        </div>
                    </div>
                `;
                blocknotRead.appendChild(aux);
            }else if(chat.notificacion == 0 && cont==0){
                blocknotRead.innerHTML = `
                    <div class="notChats text-secondary">
                        <i class="fa-regular fa-face-frown"></i>
                        <h2 class="text-center">No tiene nuevos mensajes</h2>
                    </div>
                `;
            }
        })
    });
}