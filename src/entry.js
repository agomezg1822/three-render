/**
 * entry.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */

import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from "three";
import SeedScene from "./objects/Scene.js";
import { OrbitControls } from "./orbitcontrols.js"; //ver como bloquear la rotacion de la pagina del usuario.
import { loadStyles } from "./loadStyles.js";
import { rightSection } from "./rightSection.js";

//modificacion del DOM

const scene = new Scene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
const seedScene = new SeedScene();

// scene
scene.add(seedScene);

// camera
camera.position.set(-15, 60, 50);
camera.lookAt(new Vector3(0, 0, 0));

//OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.minDistance = 10;
controls.maxDistance = 100;
controls.maxPolarAngle = Math.PI / 2.1;
controls.enablePan = false;

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x7ec0ee, 1);

// render loop
const onAnimationFrameHandler = (timeStamp) => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => {
  const widthReduce = 0.8;
  const { innerHeight, innerWidth } = window;
  const width = innerWidth * widthReduce;
  renderer.setSize(width, innerHeight);
  camera.aspect = width / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener("resize", windowResizeHanlder);

// dom
document.body.style.margin = 0;
document.body.appendChild(renderer.domElement);
document.body.appendChild(rightSection);

loadStyles("customCss", "/styles.css");
