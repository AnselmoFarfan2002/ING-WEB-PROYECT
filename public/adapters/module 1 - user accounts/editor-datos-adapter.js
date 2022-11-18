let data = {
    nombre: document.getElementById('inputName'),
    apellido1: document.getElementById('inputSurname1'),
    apellido2: document.getElementById('inputSurname2'),
    cargo: document.getElementById('inputCargo'),
    email: document.getElementById('inputEmail'),
    celular: document.getElementById('inputCell'),
    telefono: document.getElementById('inputPhone')
}

fetch('/usuario/editar-perfil', {
	method: 'PUT',
	headers: {
	    'Content-Type': 'application/json',
	},

	body: JSON.stringify(data)
})