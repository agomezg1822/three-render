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

      const valoresY = await leerExcel();

      for (let i = 1; i < 100; i++) {
        //Asignacion de los nombres a cada objeto del pie izquierdo
        const asignacion = i.toString().padStart(2, "0");
        const objeto_existente = gltf.scene.getObjectByName(`I${asignacion}`);
        objeto_existente.scale.y = valoresY[i - 1];

        //Asignacion de los nombres a cada objeto del pie Derecho
        // const asignacion = i.toString().padStart(2, "0");
        // const objeto_existente = gltf.scene.getObjectByName(`D${asignacion}`);
        // objeto_existente.scale.y = valoresY[i - 1];

        //Color
        const nuevoMaterial = objeto_existente.material.clone();
        const valorY = valoresY[i - 1];

        if (valorY == 5) {
          nuevoMaterial.color.setHex(0x78288c);
        } else if (valorY >= 10 && valorY <= 20) {
          // Verde
          nuevoMaterial.color.setHex(0x3de63d);
        } else if (valorY >= 21 && valorY <= 40) {
          // Azul
          nuevoMaterial.color.setHex(0x37cdcd);
        } else if (valorY >= 41 && valorY <= 60) {
          // Amarillo
          nuevoMaterial.color.setHex(0xff9944);
        } else if (valorY >= 61 && valorY <= 80) {
          // Naranja
          nuevoMaterial.color.setHex(0xff4444);
        } else if (valorY >= 81 && valorY <= 99) {
          // Rojo
          nuevoMaterial.color.setHex(0xff0000);
        } else {
          // Blanco
          nuevoMaterial.color.setHex(0xffffff);
        }

        //Asignar el nuevo material al objeto
        objeto_existente.material = nuevoMaterial;
      }
    });
  }
}

async function leerExcel() {
  const res = await fetch("/datos.xlsx");
  const file = await res.arrayBuffer();
  const workbook = read(file);
  const workbookSheets = workbook.SheetNames;
  const sheetName = workbookSheets[1];
  const sheet = workbook.Sheets[sheetName];
  const range = {
    s: { c: 1, r: 2 }, // Columna B, Fila 4
    e: { c: 1, r: 101 }, // Columna B, Fila 102
  };
  const dataExcel = utils.sheet_to_json(sheet, { range });
  const valoresY = [];

  for (let i = 0; i < 99; i++) {
    const valor_y = dataExcel[0 + i].Data;
    valoresY.push(valor_y);
  }

  return valoresY;
}
