const dataPolice = id => new Promise((resolve, reject) => {
  let form = document.querySelector(`#${id}`);
  let inputs = form.querySelectorAll('input');
  let check = true;

  form.classList.add('was-validated');
  
  for(let i = 0; i < inputs.length; i++){
    if(inputs[i].required && !inputs[i].value != '') 
      check = check && (new RegExp(inputs[i].pattern, 'g')).test(inputs[i].value);

    console.log(check, inputs[i].required);
  };

  if(check) resolve(); else reject();
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