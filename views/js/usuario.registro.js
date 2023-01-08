var form = document.getElementById('signInForm');

const signIn = () => {
	form.querySelector('#userPass2').pattern = `^${form.querySelector('#userPass1').value}$`;

	dataPolice('formAccount')
	.then( () => {
		dissableInputs('formAccount');
		let data = {
		    "ruc": 			form.querySelector('#userRuc').value,
		    "entidad": 		form.querySelector('#busiName').value,
		    "ubicacion": 	form.querySelector('#busiLocation').value,
		    "rol_entidad": 	form.querySelector('#busiRole').value,
		    "nombre": 		form.querySelector('#userName').value,
		    "apellido1": 	form.querySelector('#userLastName1').value,
		    "apellido2": 	form.querySelector('#userLastName2').value,
		    "cargo": 		form.querySelector('#userRole').value,
		    "correo": 		form.querySelector('#userEmail').value,
		    "celCod": 		form.querySelector('#cellCode').value,
		    "celular": 		form.querySelector('#userCellphone').value,
		    "telefono": 	form.querySelector('#userPhone').value,
		    "contrasenia": 	form.querySelector('#userPass1').value,
		    'g-recaptcha-response': document.getElementById('g-recaptcha-response').value
		}

		fetch('/usuarios', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then( resHTTP => resHTTP.json() )
		.then( resJSON => {
			enableInputs('formAccount');
			if (resJSON.status != 1) {
				form.querySelector('.serverResponse').classList.remove('d-none');
				form.querySelector('.serverResponse').innerHTML = resJSON.msg;
			} else window.location.reload();
		})
	}).catch( () => {} );
}

// Loading roles
var userRoleList;
fetch('/cargos')
.then( resHTTP => resHTTP.json() )
.then( resJSON => {
	userRoleList = `<option selected value="">Seleccione un cargo...</option>`;
	resJSON.forEach( row => { userRoleList += `<option>${row.cargo}</option>` } );
	form.querySelector('#userRole').innerHTML = userRoleList;
});

// Objects events

document.querySelector('#btnSignIn').addEventListener('click', signIn);

document.querySelector('#btnSignInNext1').addEventListener('click', () => 
	dataPolice('formUser')
	.then( () => document.querySelector('#loadFormBusiness').click() )
	.catch( () => {} ) 
);

document.querySelector('#btnSignInNext2').addEventListener('click', () => 
	dataPolice('formBusiness')
	.then( () => document.querySelector('#loadFormAccount').click() )
	.catch( () => {} ) 
);

document.querySelector('#btnSignInBack1').addEventListener('click', () => {
	document.querySelector('#loadFormUser').click();
	form.querySelector('.serverResponse').classList.add('d-none')
});

document.querySelector('#btnSignInBack2').addEventListener('click', () => {
	document.querySelector('#loadFormBusiness').click()
	form.querySelector('.serverResponse').classList.add('d-none')
});

document.querySelector('#userPass1').addEventListener('change', event => {
	document.querySelector('#userPass2').pattern = `^${event.target.value}$`;
});

( () => {
	let tooltipBtn = document.getElementById('addUserRole');
	tooltipBtn.addEventListener('click', () => { 
		if(tooltipBtn.parentNode.querySelector('input')) tooltipBtn.parentNode.querySelector('#userRoleContainer').innerHTML = `
			<select class="form-select" id="userRole" type="text" pattern="^(?!defaultOption)[a-zA-Z\s\xE1\xE9\xED\xF3\xFA\xC1\xC9\xCD\xD3\xDA]{3,100}$" required>
            ${userRoleList}</select> <label for="userRole">Su cargo en la empresa</label> 
		`; else tooltipBtn.parentNode.querySelector('#userRoleContainer').innerHTML = `
			<input class="form-control" id="userRole" type="text" pattern="^(?!defaultOption)[a-zA-Z\s\xE1\xE9\xED\xF3\xFA\xC1\xC9\xCD\xD3\xDA]{3,100}$" placeholder="Ingrese su cargo." required>
          	<label for="userRole">Su cargo en la empresa</label> 
		`; 
	})

	let tooltip = new bootstrap.Tooltip(tooltipBtn, tooltipBtn.parentNode);
} )();

form.querySelectorAll('.input-group .form-floating').forEach( containerInput => {
	containerInput.firstElementChild
	.addEventListener('change', event => {
		event.target.parentNode.classList.remove('is-invalid');
		dataPoliceOne(event.target.id).catch(() => {});
	} );
})

addEventHideAnswerAndSend('formAccount', signIn);