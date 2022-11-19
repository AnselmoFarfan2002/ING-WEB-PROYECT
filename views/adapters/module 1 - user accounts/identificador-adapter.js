let data = {
	email: document.getElementById('inputEmail'),
	pass: document.getElementById('inputPass')
}

fetch('/inicio-sesion', {
	method: 'POST',
	headers: {
	    'Content-Type': 'application/json',
	},
	body: JSON.stringify(data)
})