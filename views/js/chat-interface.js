/*----------LISTA DE CHATS----------*/
const btn1 = document.getElementById('botonTab1');
const btn2 = document.getElementById('botonTab2');
const list1 = document.getElementById('chatListVenta');
const list2 = document.getElementById('chatListCompra');
let choose = 1;

const changeContent = () =>{
    choose == 1 ?(
        btn1.classList.value = 'option option-active btn btn-primary',
        list1.classList.value = 'content content-active'
    )
    :(
        btn1.classList.value = 'option btn btn-primary',
        list1.classList.value = 'content'
    )

    choose == 2 ?(
        btn2.classList.value = 'option option-active btn btn-primary',
        list2.classList.value = 'content content-active'
    )
    :(
        btn2.classList.value = 'option btn btn-primary',
        list2.classList.value = 'content'
    )
}

btn1.addEventListener('click',()=>{
    choose = 1;
    changeContent();
})
btn2.addEventListener('click',()=>{
    choose = 2;
    changeContent();
})

/*-----------MAS INFORMACION DE USUARIO-----------*/
const btn = document.querySelector('#button-info');
btn.addEventListener('click', function () {
    document.getElementById('rightSide').classList.toggle('active');
    document.getElementById('mediumSide').classList.toggle('active');
});

