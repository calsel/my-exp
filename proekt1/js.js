function checkEmail( ) {
    let email = document.querySelector('#emailFile').value
    if(!email.includes('@')) alert('Нет символа @')
    else if(!email.includes('.')) alert('Нет символа .')
        else alert('Все отлично');
}