import { title } from "./components/title";
import Pie from "./objects/Pie/Pie.js";

const template = `
  ${title(1, "Comparativa de pies")}
  <div>
    <label for="fileInput">Cargar un archivo:</label>
    <input type="file" id="fileInput" accept=".xlsx">
  </div>
  <br><br>
  <div>
    <label for="sheetSelect">Seleccionar hoja:</label>
    <select id="sheetSelect"></select>
  </div>
  <br><br>
  <div>
    <a id="downloadLink" href="datos.xlsx" download="datos.xlsx">Descargar Plantilla</a>
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
      const { valoresYIzquierdoExcel, valoresYDerechoExcel } = datos;

      pie.actualizarModelo(valoresYIzquierdoExcel, valoresYDerechoExcel);
    }
  } else {
    console.error("No se ha seleccionado ningún archivo.");
  }
});

export { rightSection };
