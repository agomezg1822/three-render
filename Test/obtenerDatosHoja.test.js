//import Pie from "../src/objects/Pie/Pie.js"; // Ajusta la ruta según la ubicación de tu archivo Pie.js

import { read, utils } from "xlsx";
import fetchMock from "jest-fetch-mock";
import Pie from "../src/objects/Pie/Pie";

describe("Pie class", () => {
  let pieInstance;

  beforeEach(() => {
    pieInstance = new Pie(); // Crear una nueva instancia de Pie antes de cada test
  });

  it("obtenerDatosHoja debe obtener datos correctamente", async () => {
    // Simular un evento de cambio de archivo
    const mockEvent = {
      target: {
        files: [new Blob()], // Puedes ajustar este objeto según lo que necesites en tu test
      },
    };

    // Llamar a la función obtenerDatosHoja y esperar a que se resuelva la promesa
    const datos = await pieInstance.obtenerDatosHoja(
      "nombreDeLaHoja",
      mockEvent
    );

    // Verificar que los datos obtenidos sean correctos
    expect(datos.valoresYIzquierdoExcel.length).toBe(100); // Ajusta el valor esperado según tu caso
    expect(datos.valoresYDerechoExcel.length).toBe(100); // Ajusta el valor esperado según tu caso
    // Agrega más expectativas según sea necesario para verificar los datos devueltos
  });
});
