import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import MODEL from "./Pie.glb";
import { utils, read } from "xlsx";

export default class Pie extends Group {
  constructor() {
    const loader = new GLTFLoader();

    super();

    this.name = "pie";

    loader.load(MODEL, async (gltf) => {
      this.add(gltf.scene);
      this.scale.set(10, 10, 10);
      this.position.set(0, 0, 0);

      const { valoresYIzquierdoExcel, valoresYDerechoExcel } =
        await this.leerExcel();

      for (let i = 1; i < 100; i++) {
        //Asignación de nombres a variables de cada objeto del pie izquierdo
        const asignacion = i.toString().padStart(2, "0");
        const objetoExistenteIzquierdo = gltf.scene.getObjectByName(
          `I${asignacion}`
        );
        //Asignación de nombres a variables de cada objeto del pie derecho
        const objetoExistenteDerecho = gltf.scene.getObjectByName(
          `D${asignacion}`
        );

        // Asignación de los valores del archivo a cada objeto del modelo 3D
        objetoExistenteIzquierdo.scale.y = valoresYIzquierdoExcel[i - 1];
        objetoExistenteDerecho.scale.y = valoresYDerechoExcel[i - 1];

        // Asignación de color al pie izquierdo
        this.asignacionColor(
          objetoExistenteIzquierdo,
          valoresYIzquierdoExcel[i - 1]
        );

        // Asignación de color al pie derecho
        this.asignacionColor(
          objetoExistenteDerecho,
          valoresYDerechoExcel[i - 1]
        );
      }
    });

    document.addEventListener("DOMContentLoaded", () => {
      const fileInput = document.getElementById("fileInput");
      const sheetSelect = document.getElementById("sheetSelect");

      fileInput.addEventListener("change", async (event) => {
        const nombresHojas = await this.obtenerNombresHojas(event);
        sheetSelect.innerHTML = "";
        nombresHojas.forEach((nombre) => {
          const option = document.createElement("option");
          option.value = nombre;
          option.textContent = nombre;
          sheetSelect.appendChild(option);
        });
      });

      sheetSelect.addEventListener("change", async () => {
        const selectedSheet = sheetSelect.value;
        const { valoresYIzquierdoExcel, valoresYDerechoExcel } =
          await this.obtenerDatosHoja(selectedSheet);
        this.actualizarModelo(valoresYIzquierdoExcel, valoresYDerechoExcel);
      });
    });
  }

  // //Funcion para leer el archivo preexistente
  async leerExcel() {
    const res = await fetch("datos.xlsx");
    const file = await res.arrayBuffer();
    const workbook = read(file);
    const workbookSheets = workbook.SheetNames;
    const sheetName = workbookSheets[0]; //Hoja del libro de excel
    const sheet = workbook.Sheets[sheetName];

    // Obtener datos para el pie izquierdo
    const rangoIzquierdo = { s: { c: 1, r: 2 }, e: { c: 1, r: 101 } };
    const dataExcelIzquierdo = utils.sheet_to_json(sheet, {
      range: rangoIzquierdo,
    });
    const valoresYIzquierdoExcel = dataExcelIzquierdo.map((item) => item.Data);

    // Obtener datos para el pie derecho
    const rangoDerecho = { s: { c: 2, r: 2 }, e: { c: 2, r: 101 } };
    const dataExcelDerecho = utils.sheet_to_json(sheet, {
      range: rangoDerecho,
    });
    const valoresYDerechoExcel = dataExcelDerecho.map((item) => item.Data);

    return { valoresYIzquierdoExcel, valoresYDerechoExcel };
  }

  //Funcion para obtener el nombre de las hojas del archivo cargado
  async obtenerNombresHojas(event) {
    const file = event.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = read(data);
    const nombresHojas = workbook.SheetNames;
    return nombresHojas;
  }

  //Funcion para obtener los valores de archivo archivo cargado y la hoja seleccionada
  async obtenerDatosHoja(nombreHoja) {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (file) {
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const sheet = workbook.Sheets[nombreHoja];

      // Obtener datos para el pie izquierdo
      const rangoIzquierdo = { s: { c: 1, r: 2 }, e: { c: 1, r: 101 } };
      const dataExcelIzquierdo = utils.sheet_to_json(sheet, {
        range: rangoIzquierdo,
      });
      const valoresYIzquierdoExcel = dataExcelIzquierdo.map(
        (item) => item.Data
      );

      // Obtener datos para el pie derecho
      const rangoDerecho = { s: { c: 2, r: 2 }, e: { c: 2, r: 101 } };
      const dataExcelDerecho = utils.sheet_to_json(sheet, {
        range: rangoDerecho,
      });
      const valoresYDerechoExcel = dataExcelDerecho.map((item) => item.Data);

      return { valoresYIzquierdoExcel, valoresYDerechoExcel };
    } else {
      console.error("No se ha seleccionado ningún archivo.");
      return null;
    }
  }

  //Funcion para actualizar el modelo 3D con los datos obtenidos del archivo cargado
  actualizarModelo(valoresYIzquierdoExcel, valoresYDerechoExcel) {
    for (let i = 1; i < 100; i++) {
      //Asignación de nombres a variables de cada objeto del pie izquierdo
      const asignacion = i.toString().padStart(2, "0");
      const objetoExistenteIzquierdo = this.getObjectByName(`I${asignacion}`);
      //Asignación de nombres a variables de cada objeto del pie derecho
      const objetoExistenteDerecho = this.getObjectByName(`D${asignacion}`);

      // Asignación de los valores del excel a cada objeto del modelo 3D
      objetoExistenteIzquierdo.scale.y = valoresYIzquierdoExcel[i - 1];
      objetoExistenteDerecho.scale.y = valoresYDerechoExcel[i - 1];

      // Asignación de color al pie izquierdo
      this.asignacionColor(
        objetoExistenteIzquierdo,
        valoresYIzquierdoExcel[i - 1]
      );

      // Asignación de color al pie derecho
      this.asignacionColor(objetoExistenteDerecho, valoresYDerechoExcel[i - 1]);
    }
  }

  //Funcion para asignar color al modelo 3D
  // asignacionColor(objeto, valorY) {
  //   const nuevoMaterial = objeto.material.clone();

  //   if (valorY > -1 && valorY <= 10) {
  //     nuevoMaterial.color.setHex(0x783d67); //purpura
  //   } else if (valorY > 10 && valorY <= 20) {
  //     nuevoMaterial.color.setHex(0x67597f); //purpura grisaceo
  //   } else if (valorY > 20 && valorY <= 30) {
  //     nuevoMaterial.color.setHex(0x597395); //azul grisaceo
  //   } else if (valorY > 30 && valorY <= 40) {
  //     nuevoMaterial.color.setHex(0x3f9eba); //azul verdoso
  //   } else if (valorY > 40 && valorY <= 50) {
  //     nuevoMaterial.color.setHex(0x5b8d89); //verde grisaceo
  //   } else if (valorY > 50 && valorY <= 60) {
  //     nuevoMaterial.color.setHex(0x6f8368); //verde oliva
  //   } else if (valorY > 60 && valorY <= 70) {
  //     nuevoMaterial.color.setHex(0x8c7236); //marron dorado
  //   } else if (valorY > 70 && valorY <= 80) {
  //     nuevoMaterial.color.setHex(0xac5e02); //marron anaranjado
  //   } else if (valorY > 80 && valorY <= 90) {
  //     nuevoMaterial.color.setHex(0xb55411); //naranja rojizo
  //   } else if (valorY > 90 && valorY <= 100) {
  //     nuevoMaterial.color.setHex(0xbf4a20); //rojo anaranjado
  //   } else if (valorY > 100 && valorY <= 200) {
  //     nuevoMaterial.color.setHex(0xcc3a37); //rojo brillante
  //   } else {
  //     nuevoMaterial.color.setHex(0xffffff);
  //   }

  //   objeto.material = nuevoMaterial;
  // }
  asignacionColor(objeto, valorY) {
    const nuevoMaterial = objeto.material.clone();

    // Definir los valores de color en hexadecimal para los extremos de la escala
    const colores = [
      { valor: -1, color: 0x0000ff }, // Azul
      { valor: 0, color: 0x0000ff }, // Azul
      { valor: 10, color: 0x0033ff },
      { valor: 20, color: 0x0066ff },
      { valor: 30, color: 0x0099ff },
      { valor: 40, color: 0x00ccff },
      { valor: 50, color: 0x00ffff }, // Cian
      { valor: 60, color: 0xffff00 }, // Amarillo
      { valor: 70, color: 0xffcc00 },
      { valor: 80, color: 0xff9900 },
      { valor: 90, color: 0xff6600 },
      { valor: 100, color: 0xff3300 },
      { valor: 2000, color: 0xff0000 }, // Rojo
    ];

    // Función para interpolar entre dos colores
    function interpolarColor(valorMin, valorMax, colorMin, colorMax, valor) {
      const factor = (valor - valorMin) / (valorMax - valorMin);

      const rMin = (colorMin >> 16) & 0xff;
      const gMin = (colorMin >> 8) & 0xff;
      const bMin = colorMin & 0xff;

      const rMax = (colorMax >> 16) & 0xff;
      const gMax = (colorMax >> 8) & 0xff;
      const bMax = colorMax & 0xff;

      const r = Math.round(rMin + factor * (rMax - rMin));
      const g = Math.round(gMin + factor * (gMax - gMin));
      const b = Math.round(bMin + factor * (bMax - bMin));

      return (r << 16) | (g << 8) | b;
    }

    // Encontrar los dos colores entre los cuales `valorY` se encuentra
    for (let i = 0; i < colores.length - 1; i++) {
      if (valorY >= colores[i].valor && valorY <= colores[i + 1].valor) {
        const colorInterpolado = interpolarColor(
          colores[i].valor,
          colores[i + 1].valor,
          colores[i].color,
          colores[i + 1].color,
          valorY
        );
        nuevoMaterial.color.setHex(colorInterpolado);
        objeto.material = nuevoMaterial;
        return;
      }
    }

    // Si `valorY` está fuera del rango, asigna un color por defecto
    nuevoMaterial.color.setHex(0xffffff);
    objeto.material = nuevoMaterial;
  }
}
