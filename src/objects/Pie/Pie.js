import { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import MODEL from "./Pie.glb";
import { utils, read } from "xlsx";

export default class Pie extends Group {
  constructor() {
    const loader = new GLTFLoader();

    super();

    this.name = "pie";

    loader.load(MODEL, (gltf) => {
      this.add(gltf.scene);
      this.scale.set(10, 10, 10);
      this.position.set(0, 0, 0);

      for (let i = 1; i < 199; i++) {
        //Asignacion de los nombres a cada objeto
        const asignacion = i.toString().padStart(2, "0");
        const objeto_existente = gltf.scene.getObjectByName(`i${asignacion}`);
        //valor_y = dataExcel[0 + i].Data;
        //console.log(valor_y);
        objeto_existente.scale.y = 50;

        //Color
        // Crear un nuevo material para cada objeto
        const nuevoMaterial = objeto_existente.material.clone();
        if (objeto_existente.scale.y >= 10 && objeto_existente.scale.y <= 20) {
          // Verde
          objeto_existente.material.color.setHex(0x00ff00);
        } else if (
          objeto_existente.scale.y >= 21 &&
          objeto_existente.scale.y <= 40
        ) {
          // azul
          objeto_existente.material.color.setHex(0x0000ff);
        } else if (
          objeto_existente.scale.y >= 41 &&
          objeto_existente.scale.y <= 60
        ) {
          // amarillo
          objeto_existente.material.color.setHex(0xffff00);
        } else if (
          objeto_existente.scale.y >= 61 &&
          objeto_existente.scale.y <= 80
        ) {
          //naranja
          objeto_existente.material.color.setHex(0xffa500);
        } else if (
          objeto_existente.scale.y >= 81 &&
          objeto_existente.scale.y <= 99
        ) {
          //rojo
          objeto_existente.material.color.setHex(0xff0000);
        } else {
          //Blanco
          objeto_existente.material.color.setHex(0xffffff);
        }
        //  // Asignar el nuevo material al objeto
        objeto_existente.material = nuevoMaterial;
      }
    });
  }
}

async function leerExcel(ruta) {
  const res = await fetch(ruta);
  const file = await res.arrayBuffer();
  const workbook = read(file);
  const workbookSheets = workbook.SheetNames;
  const sheetName = workbookSheets[1];
  const sheet = workbook.Sheets[sheetName];
  const range = {
    s: { c: 1, r: 2 }, // Columna B, Fila 4 (en formato de índices base 0)
    e: { c: 1, r: 101 }, // Columna B, Fila 102
  };
  const dataExcel = utils.sheet_to_json(sheet, { range });
  for (let i = 0; i < 99; i++) {
    const valor_y = dataExcel[0 + i].Data;
    console.log(valor_y);
  }
}

leerExcel("/datos.xlsx");
