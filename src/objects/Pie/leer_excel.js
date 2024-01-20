const XLSX = require("xlsx");

function leerExcel(ruta) {
  const workbook = XLSX.readFile(ruta);
  const workbookSheets = workbook.SheetNames;
  const sheetName = workbookSheets[1];
  const sheet = workbook.Sheets[sheetName];
  const range = {
    s: { c: 1, r: 2 }, // Columna B, Fila 4 (en formato de índices base 0)
    e: { c: 1, r: 101 }, // Columna B, Fila 102
  };
  const dataExcel = XLSX.utils.sheet_to_json(sheet, { range });
  for (let i = 0; i < 99; i++) {
    valor_y = dataExcel[0 + i].Data;
    console.log(valor_y);
  }
}

leerExcel("./datos.xlsx");
