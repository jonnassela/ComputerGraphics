import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

//kamera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(7,7,15);
camera.lookAt(1,1,1);

//rerender
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//plane ose floor
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0x808080,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -3.5;
scene.add(plane);

//figurat
const group = new THREE.Group();
group.scale.y = 1.1;
group.rotation.y = 0.3;
scene.add(group);

const fig1 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(2, 0.6, 100, 16),
  new THREE.MeshStandardMaterial({ color: 0xe63e62,
    metalness: 0.9,       
    roughness: 0.1,       
    emissive: 0x220011,   
    emissiveIntensity: 0.3
   } ) 
);
fig1.position.x = -6;
fig1.position.y = 1;
fig1.position.z = 1;
group.add(fig1);

const fig2 = new THREE.Mesh(
  new THREE.CapsuleGeometry(1,2,7,10),
  new THREE.MeshBasicMaterial({
    color: 0xf78fa7,
    wireframe: true,         
    transparent: true,
    opacity: 0.95            
  })
  
);
fig2.position.x = 7;
fig2.position.y = 1;
fig2.position.z = 1;
group.add(fig2);

const fig3 = new THREE.Mesh(
  new THREE.TorusGeometry(1,1,7,5),
  new THREE.MeshPhongMaterial({color:0xFF23A8,
    shininess: 100,        
    specular: 0xffffff,     
    emissive: 0x440033,     
    emissiveIntensity: 0.5
  })
);
fig3.position.x = 1;
fig3.position.y = 2;
fig3.position.z = 1;
group.add(fig3);


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);
const ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient)

function animate() {
  requestAnimationFrame(animate);
  fig1.rotation.x += 0.01;
  fig1.rotation.y += 0.01;
  fig1.rotation.z += 0.01;
  fig2.rotation.x += 0.01;
  fig2.rotation.y += 0.01;
  fig2.rotation.z += 0.01;
  fig3.rotation.x += 0.01;
  fig3.rotation.y += 0.01;
  fig3.rotation.z += 0.01;
  renderer.render(scene, camera);
}

animate();

// Make responsive when the browser changes sizes
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});