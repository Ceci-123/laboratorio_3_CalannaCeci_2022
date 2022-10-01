// CLASES

class Persona {
  id;
  nombre;
  apellido;
  edad;

  constructor(id, nombre, apellido, edad) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
  }

  toString() {
    return this.id + this.nombre + this.apellido + this.edad;
  }
}

class Heroe extends Persona {
  alterEgo;
  ciudad;
  publicado;

  constructor(id, nombre, apellido, edad, alter, ciudad, publicado) {
    super(id, nombre, apellido, edad);
    this.alter = alter;
    this.ciudad = ciudad;
    if (publicado > 1940) {
      this.publicado = publicado;
    } else {
      publicado = 1940;
    }
  }

  toString() {
    return (
      this.id +
      this.nombre +
      this.apellido +
      this.edad +
      this.alterEgo +
      this.ciudad +
      this.publicado
    );
  }
}

class Villano extends Persona {
  enemigo;
  robos;
  asesinatos;

  constructor(id, nombre, apellido, edad, enemigo, robos, asesinatos) {
    super(id, nombre, apellido, edad);
    this.enemigo = enemigo;
    this.robos = robos;
    this.asesinatos = asesinatos;
  }

  toString() {
    return (
      this.id +
      this.nombre +
      this.apellido +
      this.edad +
      this.enemigo +
      this.robos +
      this.asesinatos
    );
  }
}

// arrays inicializo con lo que viene como si fuera backend

let backend =
  '[{"id":1, "nombre":"Clark", "apellido":"Kent", "edad":45, "alterego":"Superman", "ciudad":"Metropolis", "publicado":2002},{"id":2, "nombre":"Bruce", "apellido":"Wayne", "edad":35, "alterego":"Batman", "ciudad":"Gotica", "publicado":20012},{"id":3, "nombre":"Bart", "apellido":"Alen", "edad":30, "alterego":"Flash", "ciudad":"Central","publicado":2017},{"id":4, "nombre":"Lex", "apellido":"Luthor", "edad":18, "enemigo":"Superman", "robos":500,"asesinatos":7},{"id":5, "nombre":"Harvey", "apellido":"Dent", "edad":20, "enemigo":"Batman", "robos":750,"asesinatos":2},{"id":666, "nombre":"Celina", "apellido":"kyle", "edad":23, "enemigo":"Batman", "robos":25,"asesinatos":1}]';

console.log(backend);
let ArrayBase = JSON.parse(backend);
let arrayPersona = ArrayBase.map(function (elemento) {
  if (elemento.hasOwnProperty("ciudad")) {
    return new Heroe(
      elemento.id,
      elemento.nombre,
      elemento.apellido,
      elemento.edad,
      elemento.alterEgo,
      elemento.ciudad,
      elemento.publicado
    );
  }
  if (elemento.hasOwnProperty("robos")) {
    return new Villano(
      elemento.id,
      elemento.nombre,
      elemento.apellido,
      elemento.edad,
      elemento.enemigo,
      elemento.robos,
      elemento.asesinatos
    );
  }
});

// todos los manejadores van aca

window.addEventListener("load", Inicializar);
document.getElementById("seleccion").addEventListener("change", select);
document.getElementById("calcularPromedio").addEventListener("click", Calcular);
document.getElementById("alta").addEventListener("click", AgregarRegistro);
document.getElementById("eliminar").addEventListener("click", EliminarRegistro);
document.getElementById("fSelect").addEventListener("change", CambiarTexto);
document
  .getElementById("modificar")
  .addEventListener("click", ModificarRegistro);
document.getElementById("agregar").addEventListener("click", VerFormulario);
document.getElementById("cancelar").addEventListener("click", Cancelar);
document.getElementById("cId").addEventListener("click", Ocultar);
document.getElementById("cNombre").addEventListener("click", Ocultar);
document.getElementById("cApellido").addEventListener("click", Ocultar);
document.getElementById("cEdad").addEventListener("click", Ocultar);
document.getElementById("cAlterEgo").addEventListener("click", Ocultar);
document.getElementById("cCiudad").addEventListener("click", Ocultar);
document.getElementById("cPublicado").addEventListener("click", Ocultar);
document.getElementById("cEnemigo").addEventListener("click", Ocultar);
document.getElementById("cRobos").addEventListener("click", Ocultar);
document.getElementById("cAsesinatos").addEventListener("click", Ocultar);
document.getElementById("oId").addEventListener("click", OrdenamientoId);
document
  .getElementById("oNombre")
  .addEventListener("click", OrdenamientoNombre);
document
  .getElementById("oApellido")
  .addEventListener("click", OrdenamientoApellido);
document.getElementById("oEdad").addEventListener("click", OrdenamientoEdad);
document
  .getElementById("oAlterEgo")
  .addEventListener("click", OrdenamientoAlterEgo);
document
  .getElementById("oCiudad")
  .addEventListener("click", OrdenamientoCiudad);
document
  .getElementById("oPublicado")
  .addEventListener("click", OrdenamientoPublicado);
document
  .getElementById("oEnemigo")
  .addEventListener("click", OrdenamientoEnemigo);
document.getElementById("oRobos").addEventListener("click", OrdenamientoRobos);
document
  .getElementById("oAsesinatos")
  .addEventListener("click", OrdenamientoAsesinatos);

// quita los tr de la tabla antes de volver a cargar datos

function RefrescarTabla() {
  let perro = arrayPersona.filter((elemento) => "ciudad" in elemento);
  let gato = arrayPersona.filter((elemento) => "robos" in elemento);
  let cuerpoTabla = document.querySelector("#cuerpoTabla");
  if (cuerpoTabla.childElementCount >= 0) {
    if (cuerpoTabla.childElementCount == perro.length) {
      perro.forEach(() => {
        let tr = cuerpoTabla.querySelector("tr");
        cuerpoTabla.removeChild(tr);
      });
    } else {
      if (cuerpoTabla.childElementCount == gato.length) {
        gato.forEach(() => {
          let tr = cuerpoTabla.querySelector("tr");
          cuerpoTabla.removeChild(tr);
        });
      } else {
        arrayPersona.forEach(() => {
          let tr = cuerpoTabla.querySelector("tr");
          cuerpoTabla.removeChild(tr);
        });
      }
    }
  }
}

// crea una nueva tabla

function CrearTabla() {
  let selectTipo = document.getElementById("seleccion");
  let cuerpoTabla = document.querySelector("#cuerpoTabla");
  if (!cuerpoTabla.childElementCount >= 0) {
    arrayPersona.forEach((elemento) => {
      if (selectTipo.value == "heroes" && persona instanceof Heroe) {
        cargarFilas(elemento);
      } else {
        if (selectTipo.value == "villanos" && persona instanceof Villano) {
          cargarFilas(elemento);
        } else {
          if (selectTipo.value == "todos") {
            cargarFilas(elemento);
          }
        }
      }
    });
  }
}

function cargarFilas(persona) {
  let cuerpoTabla = document.querySelector("#cuerpoTabla");
  let datos = [
    persona.id,
    persona.nombre,
    persona.apellido,
    persona.edad,
    persona.alterEgo,
    persona.ciudad,
    persona.publicado,
    persona.enemigo,
    persona.robos,
    persona.asesinatos,
  ];
  let tr = document.createElement("tr");
  tr.addEventListener("dblclick", CargarCampos);

  for (let i = 0; i < datos.length; i++) {
    let td = document.createElement("td");
    td.id = datos[i];
    td.textContent = datos[i];
    tr.appendChild(td);
  }
  cuerpoTabla.appendChild(tr);
}

// en el load oculto el otro form y pongo los check en checked

function Inicializar() {
  document.getElementById("form").style.display = "none";
  document.getElementById("cId").checked = true;
  document.getElementById("cNombre").checked = true;
  document.getElementById("cApellido").checked = true;
  document.getElementById("cEdad").checked = true;
  document.getElementById("cAlterEgo").checked = true;
  document.getElementById("cCiudad").checked = true;
  document.getElementById("cPublicado").checked = true;
  document.getElementById("cEnemigo").checked = true;
  document.getElementById("cRobos").checked = true;
  document.getElementById("cAsesinatos").checked = true;
  document.getElementById("fId").readOnly = true;
  CrearTabla();
}

function Ocultar(e) {
  let btn = e.currentTarget;
  let indice = btn.textContent;
  let tbody = document.querySelector("#cuerpoTabla");
  let arrayTh = [
    "thId",
    "thNombre",
    "thApellido",
    "thEdad",
    "thAlterEgo",
    "thCiudad",
    "thPublicado",
    "thEnemigo",
    "thRobos",
    "thAsesinatos",
  ];
  let arrayCheck = [
    "cId",
    "cNombre",
    "cApellido",
    "cEdad",
    "cAlterEgo",
    "cCiudad",
    "cPublicado",
    "cEnemigo",
    "cRobos",
    "cAsesinatos",
  ];
  let tr = tbody.childNodes;

  for (let i = 0; i < tbody.childNodes.length - 1; i++) {
    let td = tr.item(i + 1).childNodes.item(indice);

    if (!document.getElementById(arrayCheck[indice]).checked) {
      td.style.display = "none";
      document.getElementById(arrayTh[indice]).style.display = "none";
      document.getElementById(arrayCheck[indice]).checked = false;
    } else {
      td.style.display = "";
      document.getElementById(arrayTh[indice]).style.display = "";
      document.getElementById(arrayCheck[indice]).checked = true;
    }
  }
}

// ordenar

function OrdenamientoId() {
  let arraySorteado = arrayPersona.sort((a, b) => {
    return a.id - b.id;
  });
  RefrescarTabla();
  CrearTabla();
}
function OrdenamientoNombre() {
  let arraySorteado = arrayPersona.sort((a, b) => {
    return a.nombre - b.nombre;
  });
  RefrescarTabla();
  CrearTabla();
}

function OrdenamientoApellido() {
  let arraySorteado = arrayPersona.sort((a, b) => {
    return a.apellido - b.apellido;
  });
  RefrescarTabla();
  CrearTabla();
}
function OrdenamientoAlterEgo() {
  let arraySorteado = arrayPersona.sort((a, b) => {
    return a.alterEgo - b.alterEgo;
  });
  RefrescarTabla();
  CrearTabla();
}

function OrdenamientoEdad() {
  let arraySorteado = arrayPersona.sort((a, b) => {
    return a.edad - b.edad;
  });
  RefrescarTabla();
  CrearTabla();
}

function OrdenamientoCiudad() {
  let arraySorteado = arrayPersona.sort((a, b) => {
    return a.ciudad - b.ciudad;
  });
  RefrescarTabla();
  CrearTabla();
}
function OrdenamientoPublicado() {
  let arraySorteado = arrayPersona.sort((a, b) => {
    return a.publicado - b.publicado;
  });
  RefrescarTabla();
  CrearTabla();
}
function OrdenamientoEnemigo() {
  let arraySorteado = arrayPersona.sort((a, b) => {
    return a.enemigo - b.enemigo;
  });
  RefrescarTabla();
  CrearTabla();
}
function OrdenamientoRobos() {
  let arraySorteado = arrayPersona.sort((a, b) => {
    return a.robos - b.robos;
  });
  RefrescarTabla();
  CrearTabla();
}
function OrdenamientoAsesinatos() {
  let arraySorteado = arrayPersona.sort((a, b) => {
    return a.asesinatos - b.asesinatos;
  });
  RefrescarTabla();
  CrearTabla();
}

// uso el filter

function FiltrarTabla(obj) {
  let cuerpoTabla = document.getElementById("cuerpoTabla");
  if (!cuerpoTabla.childElementCount > 0) {
    if (obj == "heroes") {
      let arrayPerro = arrayPersona.filter((elemento) => "ciudad" in elemento);
      arrayPerro.forEach((elemento) => {
        cargarFilas(elemento);
      });
      return arrayPerro;
    } else {
      let arrayGato = arrayPersona.filter((elemento) => "robos" in elemento);
      arrayGato.forEach((elemento) => {
        cargarFilas(elemento);
      });
      return arrayGato;
    }
  }
}

// el seleccionador muestra perros y gatos

function select() {
  let opcion = document.getElementById("seleccion").value;
  switch (opcion) {
    case "heroes":
      RefrescarTabla();
      FiltrarTabla("heroes");
      break;

    case "villanos":
      RefrescarTabla();
      FiltrarTabla("villanos");
      break;

    default:
      RefrescarTabla();
      CrearTabla();
      break;
  }
}

// funcion que calcula promedio

function Calcular() {
  let opcion = document.getElementById("seleccion").value;
  let acumulador = 0;
  let promedio = 0;
  let perros = [];
  let gatos = [];
  switch (opcion) {
    case "heroes":
      perros = arrayPersona.filter((elemento) => "ciudad" in elemento); //me aseguro q sea un perro
      perros.forEach((persona) => {
        acumulador += parseInt(persona.edad); //aca elijo de que quiero el promedio
      });
      //no se divide x cero
      if (perros.length > 0) {
        promedio = parseFloat(acumulador) / perros.length;
      } else {
        promedio = 0;
        alert("Ocurrio un error");
      }
      document.getElementById("promedio").value = promedio;
      break;

    case "villanos":
      gatos = arrayPersona.filter((elemento) => "robos" in elemento); //me aseguro q sea un gato
      gatos.forEach((persona) => {
        acumulador += parseFloat(persona.edad); //aca elijo de que quiero el promedio
      });
      //no se divide x cero
      if (gatos.length > 0) {
        promedio = parseFloat(acumulador) / gatos.length;
      } else {
        promedio = 0;
        alert("Ocurrio un error");
      }
      document.getElementById("promedio").value = promedio;
      break;

    default:
      arrayPersona.forEach((persona) => {
        acumulador += parseFloat(persona.edad); //aca elijo de que quiero el promedio
      });
      promedio = parseFloat(acumulador) / arrayPersona.length;
      document.getElementById("promedio").value = promedio;
      break;
  }
}

// agrego un nuevo animal a la veterinaria

function AgregarRegistro() {
  let id = Math.round(Math.random() * (100 - 1) + 1);
  while (ValidarSiExisteId(id)) {
    id = Math.round(Math.random() * (100 - 1) + 1);
  }
  let nombre = document.getElementById("fNombre").value;
  let apellido = document.getElementById("fApellido").value;
  let edad = parseInt(document.getElementById("fEdad").value);

  if (document.getElementById("fId").value == "") {
    if (id > 0 && nombre != "" && apellido != "") {
      let ingresoNuevo;
      if (document.getElementById("fSelect").value == "heroe") {
        let alterEgo = document.getElementById("fInput1").value;
        let ciudad = document.getElementById("fInput2").value;
        let publicado = parseInt(document.getElementById("fInput3").value);

        ingresoNuevo = new Heroe(
          id,
          nombre,
          apellido,
          edad,
          alterEgo,
          ciudad,
          publicado
        );
        arrayPersona.push(ingresoNuevo);
      } else {
        let enemigo = document.getElementById("fInput1").value;
        let robos = parseInt(document.getElementById("fInput2").value);
        let asesinatos = parseInt(document.getElementById("fInput3").value);
        ingresoNuevo = new Villano(
          id,
          nombre,
          apellido,
          edad,
          enemigo,
          robos,
          asesinatos
        );
        arrayPersona.push(ingresoNuevo);
      }
      insertarNuevo();
    } else {
      alert("Ocurrio un error");
    }
    document.getElementById("form").style.display = "none";
    RefrescarCampos();
  } else {
    alert("Registro ya existe");
  }
}

function ValidarSiExisteId(id) {
  let existe = false;
  arrayPersona.forEach((elemento) => {
    if (elemento.id == id) {
      existe = true;
    }
  });
  return existe;
}

function insertarNuevo() {
  let indice = arrayPersona.length - 1;
  let insercion = arrayPersona[indice];
  cargarFilas(insercion);
}

// eliminar un registro

function EliminarRegistro() {
  let tbody = document.getElementById("cuerpoTabla");
  let tr = tbody.childNodes;
  let id = parseInt(document.getElementById("fId").value);
  for (let i = 0; i < arrayPersona.length; i++) {
    if (id == arrayPersona[i].id) {
      RefrescarTabla();
      arrayPersona.splice(i, 1);
      CrearTabla();
      break;
    }
  }
  document.getElementById("form").style.display = "none";
  RefrescarCampos();
  RefrescarTabla();
  CrearTabla();
}

// funcion de carga de campos

function CargarCampos() {
  var tr = target.parentNode; //event.target.parentNode; deprecated
  document.getElementById("form").style.display = "";
  document.getElementById("fId").value = tr.cells[0].innerHTML;
  document.getElementById("fNombre").value = tr.cells[1].innerHTML;
  document.getElementById("fApellido").value = tr.cells[2].innerHTML;
  document.getElementById("fEdad").value = tr.cells[3].innerHTML;

  if (
    tr.cells[4].innerHTML != "" &&
    tr.cells[5].innerHTML != "" &&
    tr.cells[6].innerHTML != ""
  ) {
    document.getElementById("fSelect").value = "heroe";
    document.getElementById("fInput1").value = tr.cells[4].innerHTML;
    document.getElementById("fInput2").value = tr.cells[5].innerText;
    document.getElementById("fInput3").value = tr.cells[6].innerText;
    document.getElementById("label1").innerHTML = "Alter Ego: ";
    document.getElementById("label2").innerHTML = "Ciudad: ";
    document.getElementById("label3").innerHTML = "Publicado: ";
  } else {
    document.getElementById("fSelect").value = "villano";
    document.getElementById("fInput1").value = tr.cells[7].innerHTML;
    document.getElementById("fInput2").value = tr.cells[8].innerText;
    document.getElementById("fInput3").value = tr.cells[9].innerText;
    document.getElementById("label1").innerHTML = "Enemigo: ";
    document.getElementById("label2").innerHTML = "Robos: ";
    document.getElementById("label2").innerHTML = "Asesinatos: ";
  }
}

// modificar registro

function ModificarRegistro() {
  let id = parseInt(document.getElementById("fId").value);
  let nombre = document.getElementById("fNombre").value;
  let apellido = document.getElementById("fApellido").value;
  let edad = parseInt(document.getElementById("fEdad").value);
  for (let i = 0; i < arrayPersona.length; i++) {
    if (id == arrayPersona[i].Id) {
      if (id > 0 && nombre != "" && apellido != "") {
        if (document.getElementById("fSelect").value == "heroe") {
          let alterEgo = document.getElementById("fInput1").value;
          let ciudad = document.getElementById("fInput2").value;
          let publicado = document.getElementById("fInput3").value;

          arrayPersona.splice(
            i,
            1,
            new Heroe(id, nombre, apellido, edad, alterEgo, ciudad, publicado)
          );
        } else {
          let enemigo = document.getElementById("fInput1").value;
          let robos = parseInt(document.getElementById("fInput2").value);
          let asesinatos = parseInt(document.getElementById("fInput3").value);

          arrayPersona.splice(
            i,
            1,
            new Villano(id, nombre, apellido, edad, enemigo, robos, asesinatos)
          );
        }
      } else {
        alert("Ocurrio un error!!");
      }
    }
  }
  document.getElementById("form").style.display = "none";
  RefrescarCampos();
  RefrescarTabla();
  CrearTabla();
}

// limpiar los campos

function RefrescarCampos() {
  document.getElementById("fId").value = "";
  document.getElementById("fNombre").value = "";
  document.getElementById("fApellido").value = "";
  document.getElementById("fInput1").value = "";
  document.getElementById("fInput2").value = "";
  document.getElementById("fInput3").value = "";
  document.getElementById("fInput4").value = "";
}

// Ver ek frmulario

function VerFormulario() {
  if (document.getElementById("form").style.display == "") {
    document.getElementById("form").style.display = "none";
  } else {
    document.getElementById("form").style.display = "";
  }
  RefrescarCampos();
}

// Cancelar

function Cancelar() {
  document.getElementById("form").style.display = "none";
  RefrescarCampos();
}

// Muestro en el label distinto texto si es perro o gato

function CambiarTexto() {
  if (document.getElementById("fSelect").value == "heroes") {
    document.getElementById("label1").innerHTML = "Alter Ego: ";
    document.getElementById("label2").innerHTML = "Ciudad: ";
    document.getElementById("label3").innerHTML = "Publicado: ";
  } else {
    document.getElementById("label1").innerHTML = "Enemigo: ";
    document.getElementById("label2").innerHTML = "Robos: ";
    document.getElementById("label3").innerHTML = "Asesinatos: ";
  }
}
