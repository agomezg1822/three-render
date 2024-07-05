// Mock de xlsx en tu archivo de prueba (tests/obtenerNombresHojas.test.js)
jest.mock("xlsx", () => ({
  read: jest.fn(), // Mock para la función read de xlsx
}));

// También puedes necesitar mockear fetch si obtienes el archivo de nombres de hojas desde el servidor
global.fetch = jest.fn(() =>
  Promise.resolve({
    arrayBuffer: () => Promise.resolve(new ArrayBuffer()),
  })
);

// tests/obtenerNombresHojas.test.js

import { obtenerNombresHojas } from "../src/objects/Pie/Pie"; // Ajusta la ruta según donde esté tu función obtenerNombresHojas
import xlsx from "xlsx";

describe("obtenerNombresHojas", () => {
  beforeEach(() => {
    // Restablecer mocks entre pruebas
    jest.clearAllMocks();
  });

  it("debería obtener los nombres de las hojas correctamente", async () => {
    // Configurar el mock de xlsx para devolver nombres de hojas simulados
    const mockWorkbook = {
      SheetNames: ["Sheet1", "Sheet2"],
    };
    xlsx.read.mockReturnValue(mockWorkbook);

    // Simular un evento de cambio de archivo
    const mockEvent = {
      target: {
        files: [new File([], "datos.xlsx")], // Simular un archivo
      },
    };

    // Llamar a la función y esperar la respuesta
    const nombresHojas = await obtenerNombresHojas(mockEvent);

    // Verificar que los nombres de hojas devueltos sean correctos
    expect(nombresHojas).toEqual(["Sheet1", "Sheet2"]);

    // Verificar que read de xlsx fue llamado correctamente
    expect(xlsx.read).toHaveBeenCalledTimes(1);
    expect(xlsx.read).toHaveBeenCalledWith(expect.any(ArrayBuffer));
  });
});
