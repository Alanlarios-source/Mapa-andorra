// 1. BASE DE DATOS SIMULADA
// Creamos un arreglo de objetos en JavaScript que simule una respuesta de una API o base de datos.
let datosLotes = {
  "lote-1": { precio: "$500,000 MXN", area: 250, estado: "disponible" },
  "lote-2": { precio: "$550,000 MXN", area: 275, estado: "disponible" },
  "lote-3": { precio: "$480,000 MXN", area: 240, estado: "disponible" },
  "lote-4": { precio: "$500,000 MXN", area: 250, estado: "disponible" },
  "lote-5": { precio: "$550,000 MXN", area: 275, estado: "disponible" },
  "lote-6": { precio: "$480,000 MXN", area: 240, estado: "disponible" },
  "lote-7": { precio: "$500,000 MXN", area: 250, estado: "disponible" },
  "lote-8": { precio: "$550,000 MXN", area: 275, estado: "disponible" }
};

// Variable para recordar qué lote acabamos de clickear
let loteSeleccionadoActual = "";

// 2. RECUPERAR DATOS GUARDADOS
// Al recargar la página, el script debe leer el localStorage primero.
if (window.localStorage.getItem('mapaLotesGuardado')) {
  // Si hay datos guardados previamente, los cargamos
  datosLotes = JSON.parse(window.localStorage.getItem('mapaLotesGuardado'));
}

// 3. PINTAR EL MAPA SEGÚN LOS DATOS
function actualizarColoresMapa() {
  // Recorremos cada lote en nuestra base de datos
  for (const idLote in datosLotes) {
    const elementoSVG = document.getElementById(idLote);
    if (elementoSVG) {
      // Limpiamos clases anteriores
      elementoSVG.classList.remove('lote-disponible', 'lote-vendido');
      // Asignamos la nueva clase según su estado
      if (datosLotes[idLote].estado === "disponible") {
        elementoSVG.classList.add('lote-disponible');
      } else {
        elementoSVG.classList.add('lote-vendido');
      }
    }
  }
}

// Ejecutamos la función al iniciar para pintar el mapa
actualizarColoresMapa();

// 4. INTERACTIVIDAD (CLICS EN LOS LOTES)
const lotesSVG = document.querySelectorAll('[id^="lote"]');
const modal = document.getElementById('mi-modal');
const overlay = document.getElementById('fondo-modal');
const btnCerrar = document.getElementById('btn-cerrar');
const btnReservar = document.getElementById('btn-reservar');

lotesSVG.forEach(lote => {
  lote.addEventListener('click', function() {
    const idLote = this.getAttribute('id');
    const infoLote = datosLotes[idLote];
    
    // Si el lote no está en la base de datos, lo ignoramos
    if (!infoLote) return;
    
    // Guardamos en la memoria qué lote abrimos
    loteSeleccionadoActual = idLote;
    
    // Inyectamos los datos en el HTML
    document.getElementById('titulo-lote').innerText = idLote.replace('-', ' ').toUpperCase();
    document.getElementById('estado-lote').innerText = infoLote.estado.toUpperCase();
    document.getElementById('area-lote').innerText = infoLote.area;
    document.getElementById('precio-lote').innerText = infoLote.precio;
    
    // Lógica visual para el botón de reservar
    if (infoLote.estado === "vendido") {
      btnReservar.style.display = 'none'; // Ocultar si ya está vendido
    } else {
      btnReservar.style.display = 'inline-block'; // Mostrar si está disponible
    }
    
    // Mostrar la ventana modal
    modal.style.display = 'block';
    overlay.style.display = 'block';
  });
});

// 5. CERRAR MODAL Y RESERVAR (Agregado para completar tu lógica)
function cerrarModal() {
  modal.style.display = 'none';
  overlay.style.display = 'none';
}

if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);
if (overlay) overlay.addEventListener('click', cerrarModal);

if (btnReservar) {
  btnReservar.addEventListener('click', function() {
    if (loteSeleccionadoActual && datosLotes[loteSeleccionadoActual]) {
      // Cambiar estado a vendido
      datosLotes[loteSeleccionadoActual].estado = "vendido";
      // Guardar en localStorage
      window.localStorage.setItem('mapaLotesGuardado', JSON.stringify(datosLotes));
      // Actualizar mapa y cerrar modal
      actualizarColoresMapa();
      cerrarModal();
      alert("¡Lote reservado con éxito!");
    }
  });
}