const formulario = document.getElementById('formulario_de_registro');
const inputs = document.querySelectorAll('#formulario_de_registro input');

const expresiones = {
  inputName: /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,40}$/,
  inputSurname: /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,40}$/,
  inputUser: /[A-Za-z]{3}/,
  inputRuc: /^\d{11}$/,
  inputEmail: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
  inputCell: /^\d{9}$/,
  inputPass: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
}

const campos = {
  pass1: 0
}

const validarFormulario = (e) => {
  switch (e.target.name) {
    case "inputSurname":
      validarCampo(expresiones.inputSurname, e.target, 'inputSurname');
    break;
    case "inputUser":
      validarCampo(expresiones.inputUser, e.target, 'inputUser');
    break;
    case "inputName":
      validarCampo(expresiones.inputName, e.target, 'inputName');
    break;
    case "inputPass":
      validarPassword2();
    break;
    case "inputPass2":
      validarPassword2();
    break;
    case "inputRuc":
      validarCampo(expresiones.inputRuc, e.target, 'inputRuc');
    break;
    case "inputCell":
      validarCampo(expresiones.inputCell, e.target, 'inputCell');
    break;
    case "inputEmail":
      validarCampo(expresiones.inputEmail, e.target, 'inputEmail');
    break;
    case "inputPass":
      validarCampo(expresiones.inputPass, e.target, 'inputPass');
    break;
  }
}

const validarCampo = (expresion, input, campo) => {
  if(expresion.test(input.value)){
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
  } else {
    document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
    document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
    document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
    document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
  }
}

const validarPassword2 = () => {
  const inputPassword1 = document.getElementById('inputPass');
  const inputPassword2 = document.getElementById('inputPass2');

  if(inputPassword1.value !== inputPassword2.value){
    document.getElementById(`grupo__inputPass2`).classList.add('formulario__grupo-incorrecto');
    document.getElementById(`grupo__inputPass2`).classList.remove('formulario__grupo-correcto');
    document.querySelector(`#grupo__inputPass2 i`).classList.add('fa-times-circle');
    document.querySelector(`#grupo__inputPass2 i`).classList.remove('fa-check-circle');
    campos['pass1'] = 0;
  } else {
    document.getElementById(`grupo__inputPass2`).classList.remove('formulario__grupo-incorrecto');
    document.getElementById(`grupo__inputPass2`).classList.add('formulario__grupo-correcto');
    document.querySelector(`#grupo__inputPass2 i`).classList.remove('fa-times-circle');
    document.querySelector(`#grupo__inputPass2 i`).classList.add('fa-check-circle');
    campos['pass1'] = 1;
  }
}

inputs.forEach((input) => {
  input.addEventListener('keyup', validarFormulario);
  input.addEventListener('blur', validarFormulario);
});