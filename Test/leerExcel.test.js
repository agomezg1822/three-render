import { read, utils } from "xlsx";
import fetchMock from "jest-fetch-mock";
import Pie from "../src/objects/Pie/Pie";

jest.mock("xlsx", () => ({
  read: jest.fn(),
  utils: {
    sheet_to_json: jest.fn(),
  },
}));

jest.mock("three/examples/jsm/loaders/GLTFLoader.js", () => ({
  GLTFLoader: jest.fn().mockImplementation(() => ({
    load: jest.fn(),
  })),
}));

describe("Pie", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("debería leer y procesar los datos del archivo Excel correctamente", async () => {
    const mockArrayBuffer = new ArrayBuffer(8);
    const mockWorkbook = {
      SheetNames: ["Sheet1", "Sheet2"],
      Sheets: {
        Sheet2: {},
      },
    };
    const mockDataIzquierdo = [{ Data: 10 }, { Data: 20 }];
    const mockDataDerecho = [{ Data: 30 }, { Data: 40 }];

    fetchMock.mockResolvedValue({
      arrayBuffer: jest.fn().mockResolvedValue(mockArrayBuffer),
    });
    read.mockReturnValue(mockWorkbook);
    utils.sheet_to_json
      .mockReturnValueOnce(mockDataIzquierdo)
      .mockReturnValueOnce(mockDataDerecho);

    const pie = new Pie();
    const result = await pie.leerExcel();

    expect(result.valoresYIzquierdoExcel).toEqual([10, 20]);
    expect(result.valoresYDerechoExcel).toEqual([30, 40]);
    expect(fetchMock).toHaveBeenCalledWith("/datos.xlsx");
    expect(read).toHaveBeenCalledWith(mockArrayBuffer);
    expect(utils.sheet_to_json).toHaveBeenCalledTimes(2);
    expect(utils.sheet_to_json).toHaveBeenCalledWith(
      mockWorkbook.Sheets["Sheet2"],
      { range: { s: { c: 1, r: 2 }, e: { c: 1, r: 101 } } }
    );
    expect(utils.sheet_to_json).toHaveBeenCalledWith(
      mockWorkbook.Sheets["Sheet2"],
      { range: { s: { c: 2, r: 2 }, e: { c: 2, r: 101 } } }
    );
  });
});
