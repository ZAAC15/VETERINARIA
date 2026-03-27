function iniciarSesion(){
  const usuario = document.getElementById('usuario').value;
  const clave = document.getElementById('clave').value;
  const error = document.getElementById('error');

  if(!usuario || !clave){
    error.innerText = 'Llena todos los campos';
    return;
  }

  if(usuario === 'admin' && clave === '123'){
    localStorage.setItem('sesion','activa');
    window.location.href = 'dashboard.html';
  }else{
    error.innerText = 'Datos incorrectos';
  }
}