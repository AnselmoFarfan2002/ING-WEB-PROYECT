const btn = document.querySelector('#button-info');
btn.addEventListener('click', function () {
    document.getElementById('rightSide').classList.toggle('active');
    document.getElementById('mediumSide').classList.toggle('active');
});