import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './Pie03.glb';

export default class Pie extends Group {
  constructor() {
    const loader = new GLTFLoader();
    
    super();

    this.name = 'pie';

    loader.load(MODEL, (gltf)=>{
      const objetoUnico = gltf.scene; // Obtener el objeto raíz del modelo

      // Operaciones que aplicas al objeto único
      objetoUnico.scale.set(10, 10, 10);
      objetoUnico.position.set(0, 0, 0);

      // Tu lógica para asignar escalas y colores aquí
      for (let i = 1; i < 100; i++) {
        const asignacion = i.toString().padStart(2, '0');
        // ... (puedes acceder a propiedades de objetoUnico directamente)
      }

      // Agregar el objeto único a la escena
      this.add(objetoUnico);
    });
  };
};
