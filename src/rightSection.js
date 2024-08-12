import { title } from "./components/title";
import Pie from "./objects/Pie/Pie.js";

const template = `
  ${title(1, "DISTRIBUCION DE PRESIÓN PLANTAR")}
  <div id=primeraSeccion>
    <a id="downloadLink" href="datos.xlsx" download="datos.xlsx">Descargar Plantilla</a>
    <label for="fileInput">Cargar un archivo:</label>
    <input type="file" id="fileInput" accept=".xlsx">
    <label for="sheetSelect">Seleccionar hoja:</label>
    <select id="sheetSelect"></select>
    
  </div>
  <div id="infoDisplay">
    <h3>Información del Usuario</h3>
    <p><strong>Fecha de la muestra:</strong> <span id="fecha"></span></p>
    <p><strong>Nombre:</strong> <span id="nombre"></span></p>
    <p><strong>Edad (años):</strong> <span id="edad"></span></p>
    <p><strong>Peso(Kg):</strong> <span id="peso"></span></p>
    <p><strong>Altura(Cm):</strong> <span id="altura"></span></p>
    <p><strong>Sexo:</strong> <span id="genero"></span></p>
  </div>
  <div class="color-scale">
  <h2>Escala de colores por rango de valores</h2>
  <div class="color-gradient-wrapper">
    <div class="color-gradient-vertical"></div>
    <div class="scale-values-vertical">
      <span>100+</span>
      <span>100</span>
      <span>50</span>
      <span>25</span>
      <span>0</span>
    </div>
  </div>
</div>

`;

const rightSection = document.createElement("section");
rightSection.innerHTML = template;

const fileInput = rightSection.querySelector("#fileInput");
const sheetSelect = rightSection.querySelector("#sheetSelect");

sheetSelect.addEventListener("change", async (event) => {
  const selectedSheet = event.target.value;
  const file = fileInput.files[0];

  if (file) {
    const pie = new Pie();
    const datos = await pie.obtenerDatosHoja(selectedSheet);

    if (datos) {
      const { valoresYIzquierdoExcel, valoresYDerechoExcel, metadata } = datos;

      pie.actualizarModelo(valoresYIzquierdoExcel, valoresYDerechoExcel);

      // Mostrar la información del usuario en la interfaz
      document.getElementById("nombre").textContent = metadata.nombre;
      document.getElementById("peso").textContent = metadata.peso;
      document.getElementById("fecha").textContent = metadata.fecha;
      document.getElementById("edad").textContent = metadata.edad;
      document.getElementById("altura").textContent = metadata.altura;
      document.getElementById("genero").textContent = metadata.genero;
    }
  } else {
    console.error("No se ha seleccionado ningún archivo.");
  }
});

export { rightSection };
