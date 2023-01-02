const logIn = () => {
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

const logOut = () => fetch('/sesiones', { method: 'DELETE' }).then(() => window.location.reload());

const recovery = () => {
    fetch(`/sesiones?email=${document.querySelector('#rec-email').value}&ruc=${document.querySelector('#rec-ruc').value}`)
    .then( resHTTP => resHTTP.json() ).then( resJSON => {
      respuesta = document.querySelector('#rec-response');
      respuesta.innerHTML = resJSON.msg;
      if (resJSON.status == 1) { 
        respuesta.classList.remove('text-danger');
        respuesta.classList.add('text-success');
      }else{
        respuesta.classList.remove('text-success');
        respuesta.classList.add('text-danger');
      }
    })
};

if(document.querySelector('#logInBtn')) document.querySelector('#logInBtn').addEventListener('click', logIn);
if(document.querySelector('#logOutBtn')) document.querySelector('#logOutBtn').addEventListener('click', logOut);
if(document.querySelector('#recoveryBtn')) document.querySelector('#recoveryBtn').addEventListener('click', recovery);
