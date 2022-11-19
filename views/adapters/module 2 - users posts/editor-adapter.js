let data = {
    titulo: document.getElementById('inputTitle'),
    descripcion: document.getElementById('inputDescription'),
    tiempo: document.getElementById('inputTime'),
    precio: document.getElementById('inputPrice'),
    categoria: document.getElementById('inputCategoria'),
    tipo: document.getElementById('inputType'),
    negociable: document.getElementById('inputNegociable')
}

fetch(`/publicaciones/gestor/datos/${req.params.codigo}`, {
	method: 'PUT',
	headers: {
	    'Content-Type': 'application/json',
	},

	body: JSON.stringify(data)
})