var URLActual = window.location.pathname
if(URLActual == '/dashboard'){
    document.getElementById('namePage').innerHTML = 'Inicio';
}
else if(URLActual == '/lista-publicaciones'){
    document.getElementById('namePage').innerHTML = 'Lista de publicaciones';
}
else if(URLActual == '/mis-publicaciones'){
    document.getElementById('namePage').innerHTML = 'Mis publicaciones';
}
else if(URLActual == '/mis-conversaciones'){
    document.getElementById('namePage').innerHTML = 'Mis conversaciones';
}
else if(URLActual == '/mi-perfil'){
    document.getElementById('namePage').innerHTML = 'Mi perfil';
}
else if(URLActual == '/registrarse'){
    document.querySelector('.moreLinks').classList.add('d-none');
    document.querySelector('.showPubli').classList.add('d-none');
    document.querySelector('.container-fluid').classList.add('justify-content-center');
}
else if(URLActual == '/registrar-publicacion' || URLActual == '/editar-publicacion'){
    document.querySelector('.moreLinks').classList.add('d-none');
    document.querySelector('.brandTitle').classList.add('d-none');
    document.querySelector('.container-fluid').classList.add('justify-content-center');
}

fetch(`/interacciones`).then( resHTTP => resHTTP.json() ).then( resJSON => {
    let cont=0;
    resJSON.chats.forEach(chat => {
        if(chat.notificacion == 1){
            cont=cont+1;
        }
    })
    resJSON.chats.forEach(chat => {
        if(chat.notificacion == 1){
            document.querySelector('.alertBadge').classList.remove('d-none');
        }else if(chat.notificacion == 0 && cont==0){
            document.querySelector('.alertBadge').classList.add('d-none');
        }
    })
});
