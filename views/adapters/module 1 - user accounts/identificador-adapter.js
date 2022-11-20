document.getElementById('buttonSubmit').addEventListener('click',login_adapter);

function login_adapter(){
  let data = {
	email: document.getElementById('inputEmail').value,
	pass: document.getElementById('inputPass').value
  }
  
  fetch('/sesiones', {
	method: 'POST',
	headers: {
	  'Content-Type': 'application/json',
	},
	body: JSON.stringify(data)
  }).then(data => console.log([data.email.value, data.pass.value]));
}