import { title } from "./components/title";
import Pie from "./objects/Pie/Pie.js";

const template = `
  ${title(1, "Comparativa de pies")}
  <div>
    <label for="fileInput">Cargar un archivo:</label>
    <input type="file" id="fileInput" accept=".xlsx">
  </div>
  <div>
    <label for="sheetSelect">Seleccionar hoja:</label>
    <select id="sheetSelect"></select>
  </div>
  <a id="downloadLink" href="datos.xlsx" download="datos.xlsx">Descargar Plantilla</a>
  <br><br>
   <!-- Contenedor para mostrar la información adicional -->
  <div id="infoDisplay">
    <h3>Información del Usuario</h3>
    <p><strong>Fecha de la muestra:</strong> <span id="fecha"></span></p>
    <p><strong>Nombre:</strong> <span id="nombre"></span></p>
    <p><strong>Edad (años):</strong> <span id="edad"></span></p>
    <p><strong>Peso(Kg):</strong> <span id="peso"></span></p>
    <p><strong>Altura(Cm):</strong> <span id="altura"></span></p>
    <p><strong>Género (Biologico):</strong> <span id="genero"></span></p>
  </div>
  <div class="color-scale">
    <h2>Escala de Colores por Rango de Valores</h2>
    <div class="color-box" style="background-color: #000000;">0</div>
    <div class="color-box" style="background-color: #783d67;">1 a 10</div>
    <div class="color-box" style="background-color: #67597f;">11 a 20</div>
    <div class="color-box" style="background-color: #597395;">21 a 30</div>
    <div class="color-box" style="background-color: #3f9eba;">31 a 40</div>
    <div class="color-box" style="background-color: #5b8d89;">41 a 50</div>
    <div class="color-box" style="background-color: #6f8368;">51 a 60</div>
    <div class="color-box" style="background-color: #8c7236;">61 a 70</div>
    <div class="color-box" style="background-color: #ac5e02;">71 a 80</div>
    <div class="color-box" style="background-color: #b55411;">81 a 90</div>
    <div class="color-box" style="background-color: #bf4a20;">91 a 100</div>
    <div class="color-box" style="background-color: #cc3a37;">101 a ∞ </div>
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
