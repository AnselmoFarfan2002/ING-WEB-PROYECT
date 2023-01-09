var usuario = {
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

var empresa = {
	id: '',
	foto : document.querySelector('#fotoEmpresa'),
	nombre : document.querySelector('#nombreEmpresa'),
	ruc : document.querySelector('#rucEmpresa'),
	ubicacion : document.querySelector('#ubicacionEmpresa')
}

fetch('/usuarios', {})
.then( resHTTP => resHTTP.json() )
.then( resJSON => {
  console.log(resJSON)

  usuario.foto.src = `/images/profile-photos/${resJSON.foto}`;
  usuario.nombre.value = resJSON.nombre;
  usuario.apellido1.value = resJSON.apellido1;
  usuario.apellido2.value = resJSON.apellido2;
  usuario.cargo.value = resJSON.cargo;
  usuario.celular.value = resJSON.celular;
  usuario.correo.value = resJSON.correo;
  usuario.telefono.value = resJSON.telefono ? resJSON.telefono : 'Ninguno';

  empresa.foto.src = `/images/business-photos/${resJSON.fotoEmpresa}`;
  empresa.nombre.value = resJSON.nombreEmpresa;
  empresa.ruc.value = resJSON.rucEmpresa;
  empresa.ubicacion.value = resJSON.ubicacionEmpresa;
}).catch( e => {console.log(e)})