const fs = require('fs');
const XLSX = require('xlsx');

// Ruta específica del archivo Excel
const rutaArchivo = './dats1.xlsx';


// Leer el archivo Excel
const datosExcel = fs.readFileSync(rutaArchivo);
const workbook = XLSX.read(datosExcel, { type: 'buffer' });

// 
const hojaDatos = workbook.Sheets['D1'];

// Convertir los datos de la hoja de cálculo a un formato compatible con Chart.js
const datos = {
  labels: XLSX.utils.sheet_to_json(hojaDatos, { header: 'A' })[0],
  datasets: [{
    label: 'Mi Dataset',
    data: XLSX.utils.sheet_to_json(hojaDatos, { header: 'B' }),
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1
  }]
};

// Imprimir los datos o utilizarlos según sea necesario
console.log(datos);


