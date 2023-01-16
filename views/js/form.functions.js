const dataPolice = id => new Promise((resolve, reject) => {
  let form = document.querySelector(`#${id}`);
  let inputs;
  let check = true;
  let aux;

  form.classList.add('was-validated');
  
  inputs = form.querySelectorAll('input');
  if (inputs.length > 0) for(let i = 0; i < inputs.length; i++){
    if(inputs[i].required) {
      aux = (new RegExp(inputs[i].pattern, 'g')).test(inputs[i].value);

      inputs[i].parentNode.classList.remove('is-invalid');
      if (!aux && inputs[i].parentNode.classList.contains('form-floating')) inputs[i].parentNode.classList.add('is-invalid');

      check = check && aux;    
    }
  };

  inputs = form.querySelectorAll('select');
  if (inputs.length > 0) for(let i = 0; i < inputs.length; i++){
    if(inputs[i].required) {
      aux = (inputs[i].value != '');

      inputs[i].parentNode.classList.remove('is-invalid');
      if (!aux && inputs[i].parentNode.classList.contains('form-floating')) inputs[i].parentNode.classList.add('is-invalid');
      
      check = check && aux;    
    }
  };

  if(check) resolve(); else reject();
});

const dataPoliceOne = id => new Promise((resolve, reject) => {
  let input = document.querySelector(`#${id}`);
  let aux = (new RegExp(input.pattern, 'g')).test(input.value);

  input.parentNode.classList.add('was-validated');  

  if (!aux && input.parentNode.classList.contains('form-floating'))
    input.parentNode.classList.add('is-invalid');  

  if (aux) resolve();
  else reject();
});

const addEventHideAnswerAndSend = (id, callBack) => {
  document.querySelectorAll(`#${id} input`).forEach( input => { 
    input.addEventListener('keydown', k => { 
      if(k.keyCode == 13) callBack();
      document.querySelector(`#${id} .serverResponse`).classList.remove('d-none'); 
      document.querySelector(`#${id} .serverResponse`).classList.add('d-none'); 
    });
  });
}

const dissableInputs = (id) => {
  let container = document.getElementById(id);
  let inputs = container.querySelectorAll('input');

  if (inputs) inputs.forEach( input => { input.setAttribute('disabled','true'); });

  inputs = container.querySelectorAll('select');
  if (inputs) inputs.forEach( select => { select.setAttribute('disabled','true'); });
}

const enableInputs = (id) => {
  let container = document.getElementById(id);
  let inputs = container.querySelectorAll('input');
  if (inputs) inputs.forEach( input => { input.removeAttribute('disabled'); });

  inputs = container.querySelectorAll('select');
  if (inputs) inputs.forEach( select => { select.removeAttribute('disabled'); });
}

const enableFormControlPlainText = input => {
  input.classList.remove('form-control-plaintext');
  input.classList.add('form-control');
  input.removeAttribute('readonly');
}

const disableFormControlPlainText = input => {
  input.classList.remove('form-control');
  input.classList.add('form-control-plaintext');
  input.setAttribute('readonly','true');
}