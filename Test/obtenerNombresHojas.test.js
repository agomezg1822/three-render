// obtenerNombresHojas.test.js

// Importamos la clase Pie y la función read de xlsx
import Pie from "../src/objects/Pie/Pie";
import { read } from "xlsx";

// Mockeamos la función read de xlsx
jest.mock("xlsx", () => ({
  read: jest.fn(() => ({
    SheetNames: ["Sheet1", "Sheet2"],
  })),
}));

describe("obtenerNombresHojas", () => {
  it("debería obtener los nombres de las hojas correctamente", async () => {
    // Configuramos un archivo simulado para el evento mock
    const mockFile = new File([], "datos.xlsx");
    const mockEvent = { target: { files: [mockFile] } };

    // Creamos una instancia de la clase Pie
    const pieInstance = new Pie();

    // Llamamos a la función y esperamos la respuesta
    const nombresHojas = await pieInstance.obtenerNombresHojas(mockEvent);

    // Verificamos que los nombres de las hojas devueltos sean correctos
    expect(nombresHojas).toEqual(["Sheet1", "Sheet2"]);

    // Verificamos que read de xlsx fue llamado correctamente
    expect(read).toHaveBeenCalledTimes(1);
    expect(read).toHaveBeenCalledWith(expect.any(ArrayBuffer));
  });
});
