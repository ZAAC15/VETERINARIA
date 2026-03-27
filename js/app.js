// 🔐 Validar sesión
if(localStorage.getItem('sesion') !== 'activa'){
  window.location.href = 'index.html';
}

// 📦 Datos
let mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
let propietarios = JSON.parse(localStorage.getItem('propietarios')) || [];
let veterinarios = JSON.parse(localStorage.getItem('veterinarios')) || [];

// 💾 Guardar
function guardar(){
  localStorage.setItem('mascotas', JSON.stringify(mascotas));
  localStorage.setItem('propietarios', JSON.stringify(propietarios));
  localStorage.setItem('veterinarios', JSON.stringify(veterinarios));
}

// Logout
function cerrarSesion(){
  localStorage.removeItem('sesion');
  window.location.href = 'index.html';
}

// Navegación
function cargarVista(vista){
  const cont = document.getElementById('contenido');

  if(vista === 'mascotas'){
    cont.innerHTML = `
      <h2 class="fw-bold">Mascotas</h2>

      <input id="nombre" class="form-control my-2" placeholder="Nombre">
      <input id="edad" class="form-control my-2" placeholder="Edad">
      <input id="tipo" class="form-control my-2" placeholder="Tipo">

      <button class="btn btn-primary" onclick="agregarMascota()">Agregar</button>

      <table class="table table-hover table-striped mt-3 shadow-sm">
        <tbody id="tablaMascotas"></tbody>
      </table>

      <template id="filaMascota">
        <tr>
          <td class="n"></td>
          <td class="e"></td>
          <td class="t"></td>
          <td>
            <button class="btn btn-danger btn-sm eliminar">Eliminar</button>
          </td>
        </tr>
      </template>
    `;
    renderMascotas();
  }

  if(vista === 'propietarios'){
    cont.innerHTML = `
      <h2 class="fw-bold">Propietarios</h2>

      <input id="nombreP" class="form-control my-2" placeholder="Nombre">
      <input id="tel" class="form-control my-2" placeholder="Teléfono">

      <button class="btn btn-primary" onclick="agregarPropietario()">Agregar</button>

      <table class="table table-hover table-striped mt-3 shadow-sm">
        <tbody id="tablaProp"></tbody>
      </table>

      <template id="filaProp">
        <tr>
          <td class="n"></td>
          <td class="t"></td>
          <td>
            <button class="btn btn-danger btn-sm eliminar">Eliminar</button>
          </td>
        </tr>
      </template>
    `;
    renderPropietarios();
  }

  if(vista === 'veterinarios'){
    cont.innerHTML = `
      <h2 class="fw-bold">Veterinarios</h2>

      <input id="nombreV" class="form-control my-2" placeholder="Nombre">
      <input id="esp" class="form-control my-2" placeholder="Especialidad">

      <button class="btn btn-primary" onclick="agregarVeterinario()">Agregar</button>

      <table class="table table-hover table-striped mt-3 shadow-sm">
        <tbody id="tablaVet"></tbody>
      </table>

      <template id="filaVet">
        <tr>
          <td class="n"></td>
          <td class="e"></td>
          <td>
            <button class="btn btn-danger btn-sm eliminar">Eliminar</button>
          </td>
        </tr>
      </template>
    `;
    renderVeterinarios();
  }
}

// MASCOTAS
function agregarMascota(){
  mascotas.push({
    nombre: nombre.value,
    edad: edad.value,
    tipo: tipo.value
  });
  guardar();
  renderMascotas();
}

function renderMascotas(){
  const tabla = document.getElementById('tablaMascotas');
  if(!tabla) return;

  tabla.innerHTML = '';
  const template = document.getElementById('filaMascota');

  mascotas.forEach((m,i)=>{
    const clone = template.content.cloneNode(true);

    clone.querySelector('.n').textContent = m.nombre;
    clone.querySelector('.e').textContent = m.edad;
    clone.querySelector('.t').textContent = m.tipo;

    clone.querySelector('.eliminar').onclick = ()=>{
      mascotas.splice(i,1);
      guardar();
      renderMascotas();
    };

    tabla.appendChild(clone);
  });
}

// PROPIETARIOS
function agregarPropietario(){
  propietarios.push({
    nombre: nombreP.value,
    tel: tel.value
  });
  guardar();
  renderPropietarios();
}

function renderPropietarios(){
  const tabla = document.getElementById('tablaProp');
  if(!tabla) return;

  tabla.innerHTML = '';
  const template = document.getElementById('filaProp');

  propietarios.forEach((p,i)=>{
    const clone = template.content.cloneNode(true);

    clone.querySelector('.n').textContent = p.nombre;
    clone.querySelector('.t').textContent = p.tel;

    clone.querySelector('.eliminar').onclick = ()=>{
      propietarios.splice(i,1);
      guardar();
      renderPropietarios();
    };

    tabla.appendChild(clone);
  });
}

// VETERINARIOS
function agregarVeterinario(){
  veterinarios.push({
    nombre: nombreV.value,
    esp: esp.value
  });
  guardar();
  renderVeterinarios();
}

function renderVeterinarios(){
  const tabla = document.getElementById('tablaVet');
  if(!tabla) return;

  tabla.innerHTML = '';
  const template = document.getElementById('filaVet');

  veterinarios.forEach((v,i)=>{
    const clone = template.content.cloneNode(true);

    clone.querySelector('.n').textContent = v.nombre;
    clone.querySelector('.e').textContent = v.esp;

    clone.querySelector('.eliminar').onclick = ()=>{
      veterinarios.splice(i,1);
      guardar();
      renderVeterinarios();
    };

    tabla.appendChild(clone);
  });
}