import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Pie.glb';

export default class Pie extends Group {
  constructor() {
    const loader = new GLTFLoader();
    
    super();

    this.name = 'pie';

    loader.load(MODEL, (gltf)=>{
      this.add(gltf.scene);
      this.scale.set(10, 10, 10);
      this.position.set(0,0,0);
    
      for (let i = 1; i < 100; i++) {
        //Asignacion de los nombres a cada objeto
        const asignacion = i.toString().padStart(2, '0');
        const objeto_existente = gltf.scene.getObjectByName(`i${asignacion}`);

        //Leer excel

        // Asignacion a los valores a y
        objeto_existente.scale.y = i;

      //Color
       // Crear un nuevo material para cada objeto
       const nuevoMaterial = objeto_existente.material.clone();
       if ( objeto_existente.scale.y >=10 &&  objeto_existente.scale.y <=20) {
         // Verde
         objeto_existente.material.color.setHex(0x00ff00);
       } 
       else if (objeto_existente.scale.y >= 21 && objeto_existente.scale.y <= 40) {
         // azul
         objeto_existente.material.color.setHex(0x0000ff);
       }
       else if ( objeto_existente.scale.y >= 41 && objeto_existente.scale.y <= 60) {
        // amarillo
        objeto_existente.material.color.setHex(0xffff00);
       }
       else if (objeto_existente.scale.y >= 61 && objeto_existente.scale.y<= 80){
        //naranja
        objeto_existente.material.color.setHex(0xffa500);
       }
       else if (objeto_existente.scale.y >= 81 && objeto_existente.scale.y <= 99){
        //rojo
        objeto_existente.material.color.setHex(0xff0000);
       }
       else {
        //Blanco
        objeto_existente.material.color.setHex(0xffffff);
       }
      //  // Asignar el nuevo material al objeto
        objeto_existente.material = nuevoMaterial;
      };
    });
  };
};



