const logIn = () => {
  dataPolice('login').then(() => {
    let inputs = document.querySelectorAll('#login input');
    inputs.forEach( input => { input.setAttribute('disabled','true'); });

    fetch('/sesiones', {
      method: 'POST',
      body: JSON.stringify({ 
        email: document.querySelector('#email').value,
        pass: document.querySelector('#pass').value  
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then( resHTTP => resHTTP.json() ).then( resJSON => {
      if(resJSON.status == 1) window.location.reload();
      else {
        inputs.forEach( input => { input.removeAttribute('disabled'); });

        let serverResponse = document.querySelector('#login .serverResponse');
        serverResponse.classList.remove('d-none'); 
        serverResponse.innerHTML = resJSON.msg;
      }
    });

  }).catch(()=>{});
};

const logOut = () => fetch('/sesiones', { method: 'DELETE' }).then(() => window.location.reload());

const recovery = () => {
    dataPolice('recovery').then(() => {
      let inputs = document.querySelectorAll('#recovery input');
      inputs.forEach( input => { input.setAttribute('disabled','true'); });

      fetch(`/sesiones?email=${document.querySelector('#rec-email').value}&ruc=${document.querySelector('#rec-ruc').value}`)
      .then( resHTTP => resHTTP.json() ).then( resJSON => {
        inputs.forEach( input => { input.removeAttribute('disabled'); });

        let respuesta = document.querySelector('#recovery .serverResponse');
        respuesta.classList.remove('d-none');
        respuesta.innerHTML = resJSON.msg;
        if (resJSON.status == 1) { 
          respuesta.classList.remove('text-danger');
          respuesta.classList.add('text-success');
        }else{
          respuesta.classList.remove('text-success');
          respuesta.classList.add('text-danger');
        }
      });

    }).catch(()=>{});
};

if(document.querySelector('#logInBtn')) {
  addEventHideAnswerAndSend('login',logIn);
  document.querySelector('#logInBtn').addEventListener('click', logIn);
}

if(document.querySelector('#recoveryBtn')) {
  addEventHideAnswerAndSend('recovery', recovery);
  document.querySelector('#recoveryBtn').addEventListener('click', recovery);
}

if(document.querySelector('#logOutBtn')) document.querySelector('#logOutBtn').addEventListener('click', logOut);