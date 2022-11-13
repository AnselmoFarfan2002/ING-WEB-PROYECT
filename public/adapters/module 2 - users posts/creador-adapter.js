let data = {
    autor: document.getElementById('inputAutor'),
    titulo: document.getElementById('inputTitle'),
    descripcion: document.getElementById('inputDescription'),
    tiempo: document.getElementById('inputTime'),
    precio: document.getElementById('inputPrice'),
    categoria: document.getElementById('inputCategoria'),
    tipo: document.getElementById('inputType'),
    negociable: document.getElementById('inputNegociable')
}

fetch('/publicaciones/gestor', {
	method: 'POST',
	headers: {
	    'Content-Type': 'application/json',
	},

	body: JSON.stringify(data)
})