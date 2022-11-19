let data = {
	ruc: document.getElementById('inputRuc'),
	entidad: document.getElementById('inputEntidad'),
    ubicacion: document.getElementById('inputUbicacion'),
    rol_entidad: document.getElementById('inputRolEntidad'),
    nombre: document.getElementById('inputName'),
    apellido1: document.getElementById('inputSurname1'),
    apellido2: document.getElementById('inputSurname2'),
    cargo: document.getElementById('inputCargo'),
    correo: document.getElementById('inputEmail'),
    celCod: document.getElementById('inputCellCod'),
    celular: document.getElementById('inputCell'),
    telefono: document.getElementById('inputPhone'),
    contrasenia: document.getElementById('inputPass')
}

fetch('/registrar-cuenta', {
	method: 'POST',
	headers: {
	    'Content-Type': 'application/json',
	},

	body: JSON.stringify(data)
})