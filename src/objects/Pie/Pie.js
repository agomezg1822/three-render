import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import MODEL from "./Pie.glb";
import { utils, read } from "xlsx";

//Clase Pie
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
        const objetoIzquierdo = gltf.scene.getObjectByName(`I${asignacion}`);
        //Asignación de nombres a variables de cada objeto del pie derecho
        const objetoDerecho = gltf.scene.getObjectByName(`D${asignacion}`);

        // Asignación de los valores del excel a cada objeto del modelo 3D
        objetoIzquierdo.scale.y = valoresYIzquierdoExcel[i - 1];
        objetoDerecho.scale.y = valoresYDerechoExcel[i - 1];

        // Asignación de color al pie izquierdo
        this.asignacionColor(objetoIzquierdo, valoresYIzquierdoExcel[i - 1]);

        // Asignación de color al pie derecho
        this.asignacionColor(objetoDerecho, valoresYDerechoExcel[i - 1]);
      }
    });
  }

  //Funcion para leer excel original
  async leerExcel() {
    const res = await fetch("/datos.xlsx");
    const file = await res.arrayBuffer();
    const workbook = read(file);
    const workbookSheets = workbook.SheetNames;
    const sheetName = workbookSheets[1]; //Hoja del libro de excel
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

  //Funcion para asignar color al modelo 3D
  asignacionColor(objeto, valorY) {
    const nuevoMaterial = objeto.material.clone();

    if (valorY > 0 && valorY <= 10) {
      nuevoMaterial.color.setHex(0x000066); // 1. Azul
    } else if (valorY > 10 && valorY <= 20) {
      nuevoMaterial.color.setHex(0x00ffff); // 2. Cian
    } else if (valorY > 20 && valorY <= 30) {
      nuevoMaterial.color.setHex(0x00ff00); // 3. Verde
    } else if (valorY > 30 && valorY <= 40) {
      nuevoMaterial.color.setHex(0xffff00); // 4. Amarillo
    } else if (valorY > 50 && valorY <= 60) {
      nuevoMaterial.color.setHex(0xff8000); // 5. Naranja
    } else if (valorY > 70 && valorY <= 80) {
      nuevoMaterial.color.setHex(0xff0000); // 6. Rojo
    } else if (valorY > 80 && valorY <= 90) {
      nuevoMaterial.color.setHex(0xff3399); // 7. Rosa oscuro
    } else if (valorY > 90 && valorY <= 100) {
      nuevoMaterial.color.setHex(0xff66cc); // 8.
    } else if (valorY > 100 && valorY <= 125) {
      nuevoMaterial.color.setHex(0xff99ff); // 9.
    } else if (valorY > 125 && valorY <= 150) {
      nuevoMaterial.color.setHex(0xcc66ff); // 10. Rosa
    } else if (valorY > 150 && valorY <= 200) {
      nuevoMaterial.color.setHex(0x9900ff); // 11. Violeta
    } else {
      nuevoMaterial.color.setHex(0x0000ff); // Blanco
    }

    objeto.material = nuevoMaterial;
  }

  //Funciones para leer el nuevo documento
  //Funcion para obtener el nombre de las hojas del archivo cargado
  async obtenerNombresHojas(event) {
    const file = event.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = read(data);
    const nombresHojas = workbook.SheetNames;
    return nombresHojas;
  }

  // //Funcion para obtener los valores de excel del archivo cargado y la hoja seleccionada
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

  actualizarModelo(valoresYIzquierdoExcel, valoresYDerechoExcel) {
    for (let i = 1; i < 100; i++) {
      //Asignación de nombres a variables de cada objeto del pie izquierdo
      const asignacion = i.toString().padStart(2, "0");
      const objetoExistenteIzquierdo = this.getObjectByName(`I${asignacion}`);
      //Asignación de nombres a variables de cada objeto del pie derecho
      const objetoExistenteDerecho = this.getObjectByName(`D${asignacion}`);

      // Check if the objects exist before trying to access their properties
      if (objetoExistenteIzquierdo && objetoExistenteDerecho) {
        // Asignación de los valores del excel a cada objeto del modelo 3D
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

        console.log(
          "Actualizar modelo con datos:",
          valoresYIzquierdoExcel,
          valoresYDerechoExcel
        );
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const pie = new Pie();
  const fileInput = document.getElementById("fileInput");
  const sheetSelect = document.getElementById("sheetSelect");

  fileInput.addEventListener("change", async (event) => {
    const nombresHojas = await pie.obtenerNombresHojas(event);
    sheetSelect.innerHTML = "";
    nombresHojas.forEach((nombre) => {
      const option = document.createElement("option");
      option.value = nombre;
      option.textContent = nombre;
      sheetSelect.appendChild(option);
    });
  });
});
