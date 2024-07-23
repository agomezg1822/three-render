//import Pie from "../src/objects/Pie/Pie"; // Ajusta la ruta según la ubicación de tu archivo Pie.js
import { read, utils } from "xlsx";
import fetchMock from "jest-fetch-mock";
import Pie from "../src/objects/Pie/Pie";

describe("Pie class", () => {
  let pieInstance;

  beforeEach(() => {
    pieInstance = new Pie(); // Crear una nueva instancia de Pie antes de cada test
  });

  it("actualizarModelo debe actualizar correctamente los modelos 3D", () => {
    // Simular datos de entrada para valoresYIzquierdoExcel y valoresYDerechoExcel
    const valoresYIzquierdoExcel = new Array(99).fill(0).map((_, i) => i + 1); //
    const valoresYDerechoExcel = new Array(99).fill(0).map((_, i) => i + 1); // 10 to 109

    // Llamar a la función actualizarModelo con los datos simulados
    pieInstance.actualizarModelo(valoresYIzquierdoExcel, valoresYDerechoExcel);

    // Verificar que los modelos 3D se actualizaron correctamente
    for (let i = 1; i <= 99; i++) {
      // Aquí 5 sería el número de iteraciones a realizar
      const asignacion = i.toString().padStart(2, "0");
      const objetoExistenteIzquierdo = pieInstance.getObjectByName(
        `I${asignacion}`
      );
      const objetoExistenteDerecho = pieInstance.getObjectByName(
        `D${asignacion}`
      );

      // Verificar la escala y otros atributos según sea necesario
      expect(objetoExistenteIzquierdo.scale.y).toBe(
        valoresYIzquierdoExcel[i - 1]
      );
      expect(objetoExistenteDerecho.scale.y).toBe(valoresYDerechoExcel[i - 1]);
      // Agrega más expectativas para verificar otros atributos o comportamientos según sea necesario
    }
  });
});
