// Requiere la biblioteca xlsx
const XLSX = require("xlsx");

// Lee el archivo Excel
const workbook = XLSX.readFile("ruta/al/archivo.xlsx");

// Selecciona la hoja de cálculo que deseas usar (por nombre o por índice)
const sheetName = workbook.SheetNames[0]; // Selecciona la primera hoja
const sheet = workbook.Sheets[sheetName];

// Crea el objeto metadata con los valores de las celdas
const metadata = {
  FECHA: sheet["E3"] ? sheet["E3"].v : "",
  NOMBRE: sheet["F3"] ? sheet["F3"].v : "",
  PESO: sheet["G3"] ? sheet["G3"].v : "",
  EDAD: sheet["H3"] ? sheet["H3"].v : "",
  ALTURA: sheet["I3"] ? sheet["I3"].v : "",
  GENERO: sheet["J3"] ? sheet["J3"].v : "",
};

// Imprime el objeto metadata en la consola
console.log(metadata);
