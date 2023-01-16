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

var usuario = {};
var empresa = {};

fetch('/usuarios', {})
.then( resHTTP => resHTTP.json() )
.then( resJSON => {
  console.log(resJSON)

  usuarioHTML.foto.src = `/images/profile-photos/${resJSON.foto}`;
  usuarioHTML.nombre.value = resJSON.nombre;
  usuarioHTML.apellido1.value = resJSON.apellido1;
  usuarioHTML.apellido2.value = resJSON.apellido2;
  usuarioHTML.cargo.value = resJSON.cargo;
  usuarioHTML.celular.value = resJSON.celular;
  usuarioHTML.correo.value = resJSON.correo;
  usuarioHTML.telefono.value = resJSON.telefono ? resJSON.telefono : 'Ninguno';

  usuario.foto = resJSON.foto;
  usuario.nombre = resJSON.nombre;
  usuario.apellido1 = resJSON.apellido1;
  usuario.apellido2 = resJSON.apellido2;
  usuario.cargo = resJSON.cargo;
  usuario.celular = resJSON.celular;
  usuario.correo = resJSON.correo;
  usuario.telefono = resJSON.telefono;

  empresaHTML.foto.src = `/images/business-photos/${resJSON.fotoEmpresa}`;
  empresaHTML.nombre.value = resJSON.nombreEmpresa;
  empresaHTML.ruc.value = resJSON.rucEmpresa;
  empresaHTML.ubicacion.value = resJSON.ubicacionEmpresa;

  empresa.foto = resJSON.fotoEmpresa;
  empresa.nombre = resJSON.nombreEmpresa;
  empresa.ruc = resJSON.rucEmpresa;
  empresa.ubicacion = resJSON.ubicacionEmpresa;

}).catch( e => {console.log(e)});

(() => {
	inputs = document.querySelectorAll('.data-controls .edit');
	for (var i = inputs.length - 1; i >= 0; i--) {
		inputs[i].addEventListener('click', event => {
			let linkedInput = event.target.parentNode.parentNode.parentNode.querySelector('input');
			enableFormControlPlainText(linkedInput);

			linkedInput.addEventListener('keydown', e => {
				console.log(e.keyCode);
				if(e.keyCode == 13) {
					dataPoliceOne(e.target.id).then( () => {
						usuario[e.target.id] = e.target.value;
						saveChanges();
						disableFormControlPlainText(linkedInput);	
					}).catch(()=>{});
					
				} else if (e.keyCode == 27) disableFormControlPlainText(linkedInput);
			})

			linkedInput.focus();
		})
	}
})();


const saveChanges = () => {

};

