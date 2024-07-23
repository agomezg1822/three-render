//import Pie from "../src/objects/Pie/Pie"; // Ajusta la ruta según la ubicación de tu archivo Pie.js

import { read, utils } from "xlsx";
import fetchMock from "jest-fetch-mock";
import Pie from "../src/objects/Pie/Pie";

describe("asignacionColor", () => {
  it("should assign correct color based on input value", () => {
    const pie = new Pie();
    const mockObjeto = { material: { clone: jest.fn() } };

    pie.asignacionColor(mockObjeto, 5);

    // Verificar que el color asignado sea el correcto para el valor de entrada 5
    expect(mockObjeto.material.color.setHex).toHaveBeenCalledWith(0x000066); // Azul
  });

  it("should assign default color for out of range values", () => {
    const pie = new Pie();
    const mockObjeto = { material: { clone: jest.fn() } };

    pie.asignacionColor(mockObjeto, 300);

    // Verificar que el color asignado sea el color predeterminado para valores fuera de rango
    expect(mockObjeto.material.color.setHex).toHaveBeenCalledWith(0x0000ff); // Blanco
  });
});
