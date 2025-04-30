const formulario = document.getElementById("estudiante-form");
/* en una variable guardo el formulario para
que se active el evento con submit */
//tabla tendra la responsabilidad de mostrar los datos
// en la tabla, por lo que se le asigna el id de la tabla
const tabla = document.querySelector("#tabla-estudiantes tbody");
/* tbody es el cuerpo de la tabla, donde se van a ir
agregando los datos, por lo que se le asigna el id de la tabla*/
//creo un array vacio para guardar los datos
const datos = []; //array vacio para guardar los datos
//agrego un evento al formulario para que se active al enviar

formulario.addEventListener("submit", function (event) {
  event.preventDefault(); //previene el comportamiento por defecto del formulario
  //obtengo los valores de los inputs
  const nombre = document.getElementById("nombre").value.trim().toUpperCase();
  const apellido = document
    .getElementById("apellido")
    .value.trim()
    .toUpperCase();
  const asignatura = document
    .getElementById("asignatura")
    .value.trim()
    .toUpperCase();
  const numeroCreditos = parseInt(document.getElementById("creditos").value);
  const numeroFaltas = parseInt(document.getElementById("faltas").value);

  if (isNaN(numeroCreditos) || numeroCreditos < 1 || numeroCreditos > 10) {
    alert("El número de créditos debe estar entre 1 y 10.");
    return;
  }

  if (isNaN(numeroFaltas) || numeroFaltas < 0 || numeroFaltas > 10) {
    alert("El número de faltas debe estar entre 0 y 10.");
    return;
  }

  //creo un objeto con los datos del formulario
  const estudiante = {
    nombre: nombre,
    apellido: apellido,
    asignatura: asignatura,
    creditos: numeroCreditos,
    faltas: numeroFaltas,
  };
  //agrego el objeto al array inventario
  datos.push(estudiante);
  //llamo a la funcion para mostrar los datos en la tabla
  agregarFila(estudiante);
  //limpio los inputs
  limpiarInputs();
  
});

//funcion para calcular el porcentaje de inasistencia
function calcularPorcentajeInasistencia(faltas, creditos) {
  const horasPorCredito = 20; // horas por crédito
  const horasPorFalta = 2; // horas por falta
  const totalHoras = horasPorCredito * creditos;
  const horasFaltadas = horasPorFalta * faltas;
  const porcentajeInasistencia = (horasFaltadas / totalHoras) * 100;
  return porcentajeInasistencia.toFixed(2); // Redondear a 2 decimales
}

//funcion para calcular porcentaje de asistencia
function calcularPorcentajeAsistencia(faltas, creditos) {
  const porcentajeInasistencia = calcularPorcentajeInasistencia(faltas, creditos);
  const porcentajeAsistencia = 100 - porcentajeInasistencia;
  return porcentajeAsistencia.toFixed(2); // Redondear a 2 decimales
}

//funcion para agregar una fila a la tabla
function agregarFila(estudiante) {
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${estudiante.nombre}</td>
    <td>${estudiante.apellido}</td>
    <td>${estudiante.asignatura}</td>
    <td>${calcularPorcentajeAsistencia(estudiante.faltas, estudiante.creditos)}%</td>
    <td>${calcularPorcentajeInasistencia(estudiante.faltas, estudiante.creditos)}%</td>
    <td><button class="btn btn-danger btn-sm eliminar">Eliminar</button></td>`;
  tabla.appendChild(fila);

  const botonEliminar = fila.querySelector(".eliminar");
  botonEliminar.addEventListener("click", function () {
    eliminarFila(fila, estudiante);
  });
}

function limpiarInputs() {
  //limpio los inputs
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("asignatura").value = "";
  document.getElementById("creditos").value = "";
  document.getElementById("faltas").value = "";
}

function eliminarFila(fila, estudiante) {
  // Eliminar la fila de la tabla
  fila.remove();
  // Eliminar el objeto del array datos
  const index = datos.indexOf(estudiante);
  if (index > -1) {
    datos.splice(index, 1);
  }
}
