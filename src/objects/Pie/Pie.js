import { Group, MeshStandardMaterial } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Pie.glb';
import { Color } from '../../three.module';

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
        const asignacion = i.toString().padStart(2, '0');
        const objeto_existente = gltf.scene.getObjectByName(`i${asignacion}`);
        objeto_existente.scale.y = i;

       // Crear un nuevo material para cada objeto
       const nuevoMaterial = objeto_existente.material.clone();

       // Asignar color según el rango de la escala en y
       if (10 >= objeto_existente.scale.y >= 20) {
         // Verde
         objeto_existente.material.color.setHex(0x00ff00);
       } 
       else if (i >= 21 && i <= 40) {
         // azul
         objeto_existente.material.color.setHex(0x0000ff);
       }
       else if (i>= 41 && i <= 60) {
        // amarillo
        objeto_existente.material.color.setHex(0xffff00);
       }
       else if (i >= 61 && i<= 80){
        //naranja
        objeto_existente.material.color.setHex(0xffa500);
       }
       else if (i >= 81 && i<= 99){
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

