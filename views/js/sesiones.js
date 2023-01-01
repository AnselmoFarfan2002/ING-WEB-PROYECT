const iniciarSesion = () => {
    fetch('/sesiones', {
      method: 'POST',
      body: JSON.stringify({ 
        email: document.querySelector('#email').value,
        pass: document.querySelector('#pass').value  
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then( resHTTP => resHTTP.json() ).then( resJSON => {
      if(resJSON.status == 1) window.location.reload();
      else document.getElementById('respuesta').innerHTML = resJSON.msg;
    })
};

const closeSession = () => fetch('/sesiones', { method: 'DELETE' }).then(() => window.location.reload());
