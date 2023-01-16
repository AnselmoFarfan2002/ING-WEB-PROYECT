var usuarioHTML = {
	id: '',
	foto : document.querySelector('#foto'),
	nombre : document.querySelector('#nombre'),
	apellido1 : document.querySelector('#apellido1'),
	apellido2 : document.querySelector('#apellido2'),
	cargo : document.querySelector('#cargo'),
	celular : document.querySelector('#celular'),
	correo : document.querySelector('#correo'),
	telefono : document.querySelector('#telefono')
}

var empresaHTML = {
	id: '',
	foto : document.querySelector('#fotoEmpresa'),
	nombre : document.querySelector('#nombreEmpresa'),
	ruc : document.querySelector('#rucEmpresa'),
	ubicacion : document.querySelector('#ubicacionEmpresa')
}

var originData = {};

fetch('/usuarios', {})
.then( resHTTP => resHTTP.json() )
.then( resJSON => {
	resJSON.celular = resJSON.celular.split(' ')[1];

	usuarioHTML.foto.src = `/images/profile-photos/${resJSON.foto}`;
	usuarioHTML.nombre.value = resJSON.nombre;
	usuarioHTML.apellido1.value = resJSON.apellido1;
	usuarioHTML.apellido2.value = resJSON.apellido2;
	usuarioHTML.cargo.value = resJSON.cargo;
	usuarioHTML.celular.value = resJSON.celular;
	usuarioHTML.correo.value = resJSON.correo;
	usuarioHTML.telefono.value = resJSON.telefono ? resJSON.telefono : 'Ninguno';

	empresaHTML.foto.src = `/images/business-photos/${resJSON.fotoEmpresa}`;
	empresaHTML.nombre.value = resJSON.nombreEmpresa;
	empresaHTML.ruc.value = resJSON.rucEmpresa;
	empresaHTML.ubicacion.value = resJSON.ubicacionEmpresa;

	originData = {...resJSON};
}).catch( e => {console.log(e)});

(() => { // load triggers 2 edit
	inputs = document.querySelectorAll('.data-controls .edit');
	for (var i = inputs.length - 1; i >= 0; i--) {
		inputs[i].addEventListener('click', event => {
			let linkedInput = document.getElementById(event.target.attributes.edit.value);
			enableFormControlPlainText(linkedInput);
			showDataControlsHandler(event.target.parentNode);

			if(!linkedInput.attributes.event) {
				linkedInput.setAttribute('event','true');
				linkedInput.addEventListener('keydown', e => {
					if(e.keyCode == 13) {
						dataPoliceOne(e.target.id).then( () => {
							usuario[e.target.id] = e.target.value;
							saveChanges();
							disableFormControlPlainText(linkedInput);	
						}).catch(()=>{});
						
					} else if (e.keyCode == 27) {
						// console.log(e.target.parentNode.parentNode.querySelector('.data-controls')
						hideDataControlsHandler(e.target.parentNode.parentNode.querySelector('.data-controls'));
						disableFormControlPlainText(linkedInput);
					}
				});
			}

			linkedInput.focus();
		})
	}
})();


(() => { // load triggers 2 edit
	trigger = document.querySelectorAll('.data-controls .edit');
	for (var i = trigger.length - 1; i >= 0; i--) {
		trigger[i].addEventListener('click', event => {
			let linkedInput = document.getElementById(event.target.attributes.edit.value);
			enableFormControlPlainText(linkedInput);
			showDataControlsHandler(event.target.parentNode);

			loadEventField(linkedInput);
			loadEventCheck(linkedInput.parentNode.parentNode.querySelector('.data-controls .check'));
			loadEventAbort(linkedInput.parentNode.parentNode.querySelector('.data-controls .abort'));

			linkedInput.focus();
		})
	}
})();

const showDataControlsHandler = container => {
	container.querySelector('.edit').classList.add('d-none');
	container.querySelector('.check').classList.remove('d-none');
	container.querySelector('.abort').classList.remove('d-none');
	container.style.paddingTop = '18px';
}

const hideDataControlsHandler = container => {
	container.querySelector('.edit').classList.remove('d-none');
	container.querySelector('.check').classList.add('d-none');
	container.querySelector('.abort').classList.add('d-none');
	container.style.paddingTop = '27px';
}

const loadEventField = element => element.addEventListener('keydown', e => {
	if(e.keyCode == 13) saveChanges(e.target);
	else if (e.keyCode == 27) abortEdit(element.parentNode.parentNode, e.target.id);
});

const loadEventCheck = element => element.addEventListener('click', e => {
	saveChanges(document.getElementById(e.target.attributes.edit.value))
});

const loadEventAbort = element => element.addEventListener('click', e => {
	abortEdit(element.parentNode.parentNode, e.target.attributes.edit.value)
});

const abortEdit = (container, fieldName) => {
	container.querySelector('input').value = originData[fieldName];
	hideDataControlsHandler(container.querySelector('.data-controls'));
	disableFormControlPlainText(container.querySelector('input'));
}

const saveChanges = element => {
	dataPoliceOne(element.id).then( () => {
		originData[element.id] = element.value;
		updateData();
		disableFormControlPlainText(element);
		hideDataControlsHandler(element.parentNode.parentNode.querySelector('.data-controls'));
	}).catch(()=>{});
};

const updateData = () => {
	dissableInputs('profileContent');
	fetch('/usuarios', {
		method: 'PUT',
		body: JSON.stringify({...originData}),
		headers: {
			'Content-Type': 'application/json'
		}
	}).then( resHTTP => resHTTP.json() )
	.then( resJSON => {
		console.log(resJSON)
		if (resJSON.status == 1) enableInputs('profileContent');
		// else if (resJSON.status == 0) window.location.reload();
	}).catch( err => console.log(err) );
};