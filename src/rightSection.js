import { title } from "./components/title";
import Pie from "./objects/Pie/Pie.js";
import { read, utils } from "xlsx";
import * as THREE from "three";

const template = `
  ${title(1, "Comparativa de pies")}
  <div>
    <label for="fileInput">Seleccionar archivo:</label>
    <input type="file" id="fileInput" accept=".xlsx">
  </div>
  <br><br>
  <div>
    <label for="sheetSelect">Seleccionar hoja:</label>
    <select id="sheetSelect"></select>
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
    rightSection.scene.add(pie); // Add the Pie instance to the scene
    const datos = await pie.obtenerDatosHoja(selectedSheet);

    if (datos) {
      const { valoresYIzquierdoExcel, valoresYDerechoExcel } = datos;
      console.log("Datos del pie izquierdo:", valoresYIzquierdoExcel);
      console.log("Datos del pie derecho:", valoresYDerechoExcel);
      pie.actualizarModelo(valoresYIzquierdoExcel, valoresYDerechoExcel);
    }
  } else {
    console.error("No se ha seleccionado ningún archivo.");
  }
});

export { rightSection };
