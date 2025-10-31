import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// skena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcfe8ff); 

const skyGeo = new THREE.SphereGeometry(1000, 25, 25);
const skyMat = new THREE.MeshBasicMaterial({ color: 0x87ceeb, side: THREE.BackSide });
const sky = new THREE.Mesh(skyGeo, skyMat);
scene.add(sky);


// definimi kameres
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(200, 140, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// glow effect
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.8,  // intensity
  0.4,  // radius
  0.85  // threshold
);
composer.addPass(bloomPass);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.minDistance = 50;
controls.maxDistance = 600;
controls.maxPolarAngle = Math.PI / 2.25;


const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
sunLight.position.set(150, 200, 100);
sunLight.castShadow = true;
sunLight.color.set(0xfff1cf)

//hijet
sunLight.shadow.mapSize.width = 4096;
sunLight.shadow.mapSize.height = 4096;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 1200;
sunLight.shadow.camera.left = -400;
sunLight.shadow.camera.right = 400;
sunLight.shadow.camera.top = 400;
sunLight.shadow.camera.bottom = -400;
sunLight.shadow.bias = -0.0003;
sunLight.shadow.normalBias = 0.04;

scene.add(sunLight);

const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const hemisphereLight = new THREE.HemisphereLight(0xcceeff, 0x6b4226, 0.6);
scene.add(hemisphereLight);

//materialet
const matLambert = new THREE.MeshLambertMaterial({ color: 0xffffff });
const matPhong = new THREE.MeshPhongMaterial({ color: 0x686868, shininess: 90 });
const matStandard = new THREE.MeshStandardMaterial({ color: 0x4d9fff, metalness: 0.25, roughness: 0.45 });
const matBasic = new THREE.MeshStandardMaterial({ color: 0xD1FEB8, roughness:1 });
const courtyardMaterial = new THREE.MeshStandardMaterial({ color: 0x6c757d, roughness: 0.9 });
const postMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const glowMat = new THREE.MeshBasicMaterial({ color: 0xfff5c0, emissive: 0xffffe0 });
const benchMat = new THREE.MeshStandardMaterial({ color: 0x4b3621, roughness: 0.8 });
const roadMat = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 1 });
const grassMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });
const roofMat = new THREE.MeshStandardMaterial({ color: 0xD3DDDD, roughness: 0.4, metalness: 0.1 });


const groundGeometry = new THREE.PlaneGeometry(500, 500);
const ground = new THREE.Mesh(groundGeometry, grassMat);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// 
const shape = new THREE.Shape();
shape.moveTo(-80, -165);
shape.lineTo(80, -165);
shape.lineTo(37, 30);
shape.lineTo(-150, 90);
shape.lineTo(-200, -20);
shape.lineTo(-80, -165);

const courtyardGeometry = new THREE.ShapeGeometry(shape);
const courtyard = new THREE.Mesh(courtyardGeometry, courtyardMaterial);
courtyard.rotation.x = -Math.PI / 2;
courtyard.position.set(-35, 0.5, 85);
courtyard.receiveShadow = true;
scene.add(courtyard);

// funskion per rrug
function createRoad(width, depth, x, z, rotationDeg = 0) {
  const roadGeometry = new THREE.BoxGeometry(width, 0.5, depth);
  const road = new THREE.Mesh(roadGeometry, roadMat);
  road.position.set(x, 0.7, z);
  road.rotation.y = THREE.MathUtils.degToRad(rotationDeg);
  road.receiveShadow = true;

  scene.add(road);
}

// rruga kryesore
createRoad(40, 500, 30, 1);
//road mes student service dhe byfes
createRoad(335, 35, -100, 15, -26);
//mes inspire dhe objektit tjeter
createRoad(185, 33, 90, 40, 35);

//pjesa shahut
const checkerboard = new THREE.Group();
const squareSize = 4;
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const color = (i + j) % 2 === 0 ? 0xffffff : 0x222222;
    const squareGeometry = new THREE.BoxGeometry(squareSize, 0.2, squareSize);
    const squareMaterial = new THREE.MeshStandardMaterial({ color });
    const square = new THREE.Mesh(squareGeometry, squareMaterial);
    square.position.set(i * squareSize, 0.1, j * squareSize);
    checkerboard.add(square);
  }
}
checkerboard.position.set(-45, 1, 100);
checkerboard.rotation.y = Math.PI / 3;
scene.add(checkerboard);


function createBuilding(width, height, depth, material, x, z, rotationY = 0) {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const building = new THREE.Mesh(geometry, material);
  building.position.set(x, height / 2, z);
  building.rotation.y = rotationY;
  building.castShadow = true;
  building.receiveShadow = true;
  scene.add(building);
  return building;
}

// byfeja
const byfeja = createBuilding(100, 30, 130, matPhong, -140, 90, Math.PI / 3.15);
// student service
const studentService = createBuilding(40, 30, 150, matBasic, -85, -34, Math.PI / 2.7);
// fakulteti juridik
const fakultetiJuridik = createBuilding(90, 30, 50, matStandard, 90, 150, Math.PI / 2);
// inspire11
const inspire11 = createBuilding(40, 30, 170, matLambert, 160, -10, -Math.PI / 20);
// small building
const smallBuilding = createBuilding(30, 30, 80, matLambert, 75, -70, Math.PI);

function createRoof(building, roofWidth, roofDepth, roofMaterial, roofHeight = 1) {
  const roof = new THREE.Mesh(new THREE.BoxGeometry(roofWidth, roofHeight, roofDepth), roofMaterial);
  
  // Position roof exactly on top of the building
  roof.position.set(
    building.position.x,
    building.position.y + building.geometry.parameters.height / 2 + roofHeight / 2,
    building.position.z
  );
  
  // Match building rotation
  roof.rotation.y = building.rotation.y;
  roof.castShadow = true;
  scene.add(roof);
  return roof;
}
createRoof(byfeja, 102, 132, roofMat);
createRoof(studentService, 42, 152, roofMat);
createRoof(fakultetiJuridik, 92, 52, roofMat);
createRoof(inspire11, 42, 172, roofMat);
createRoof(smallBuilding, 32, 82, roofMat);

//pema 
function createTree(x, z) {
  const trunkGeometry = new THREE.CylinderGeometry(0.8, 0.8, 18);
  const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8b5a2b });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.set(x, 6, z);
  trunk.castShadow = true;
  trunk.receiveShadow = true;

  const leavesGeometry = new THREE.SphereGeometry(5);
  const leavesMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
  const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
  leaves.position.set(x, 20, z);
  leaves.castShadow = true;
  leaves.receiveShadow = true;

  scene.add(trunk);
  scene.add(leaves);
}

createTree(60, -10);
createTree(70, 10);
createTree(-30, -40);
createTree(80, 80);
createTree(60, 220);
createTree(60, 240);
createTree(90, 90);
createTree(-190, -190);
createTree(-90, -190);
createTree(-90, -200);
createTree(-10, -190);

function createFraserTree(x, z) {
  // pisha
  const trunkGeometry = new THREE.CylinderGeometry(1, 1.8, 20, 8);
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b5a2b });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.set(x, 4, z);
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  scene.add(trunk);

  const green = 0x0b6623;
  const coneMaterial = new THREE.MeshStandardMaterial({ color: green });

  const layers = [
    { radius: 5, height: 10, y: 7 },
    { radius: 4, height: 10, y: 11 },
    { radius: 3, height: 7, y: 14 },
    { radius: 2, height: 5, y: 17 },
    { radius: 1, height: 5, y: 19 }
  ];

  layers.forEach(layer => {
    const coneGeometry = new THREE.ConeGeometry(layer.radius, layer.height, 10);
    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.set(x, layer.y, z);
    cone.castShadow=true;
    cone.receiveShadow=true;
    scene.add(cone);
  });
}


createFraserTree(80, 7);
createFraserTree(-60, -60);
createFraserTree(60, 8);
createFraserTree(67, 80);
createFraserTree(100, 80);
createFraserTree(-100, 80);
createFraserTree(-100, -80);
createFraserTree(-100, -180);
createFraserTree(200, 100);
createFraserTree(200, 80);
createFraserTree(230, 100);

function createCherryBlossomTree(x, z, scale = 1) {
  // trungu
  const trunkGeometry = new THREE.CylinderGeometry(0.5 * scale, 0.6 * scale, 12 * scale, 9);
  const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 1 });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
  trunk.position.set(x, 3 * scale, z);
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  scene.add(trunk);

  //cherry blossom
  const blossomGroup = new THREE.Group();
  const pinks = [0xffb7c5, 0xffc0cb, 0xffe4e1, 0xf8c8dc];

  for (let i = 0; i < 40; i++) {
    const color = pinks[Math.floor(Math.random() * pinks.length)];
    const blossomMaterial = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.8,
      metalness: 0.1,
    });
    const blossomGeometry = new THREE.SphereGeometry(Math.random() * 1 * scale + 0.7 * scale, 8, 8);
    const blossom = new THREE.Mesh(blossomGeometry, blossomMaterial);

    // Position blossoms randomly around upper trunk
    const radius = 4 * scale;
    const angle = Math.random() * Math.PI * 2;
    const height = 8 * scale + Math.random() * 3 * scale;
    blossom.position.set(
      x + Math.cos(angle) * (Math.random() * radius),
      height,
      z + Math.sin(angle) * (Math.random() * radius)
    );
    blossom.castShadow = true;
    blossom.receiveShadow = true;
    blossomGroup.add(blossom);
  }

  scene.add(blossomGroup);
}
createCherryBlossomTree(-50,-100,4);
createCherryBlossomTree(-60, -90, 3);


// llampat
function createLamp(x, z) {
  const poleGeometry = new THREE.CylinderGeometry(0.5, 0.3, 15);
  const pole = new THREE.Mesh(poleGeometry, postMat);
  pole.position.set(x, 6, z);
  pole.castShadow = true;
  pole.receiveShadow = true;

  const bulbGeometry = new THREE.SphereGeometry(2);
  const bulb = new THREE.Mesh(bulbGeometry, glowMat);
  bulb.position.set(x, 14, z);
  bulb.castShadow = true;
  bulb.receiveShadow=true;

  const bulbLight = new THREE.PointLight(0xfff5cc, 1.2, 60);
  bulbLight.position.set(x, 14, z);
  bulbLight.castShadow = false;

  scene.add(pole, bulb, bulbLight);

  return bulbLight;
}

// lamps pergjat rruges kryesore
for (let i = -233; i <= 250; i += 40) {
  createLamp(50, i);
}
for (let i = -233; i <= 50; i += 40) {
  createLamp(10, i);
}
for (let i = -100; i <= 100; i += 60) {
  createLamp(-100 + i * Math.cos(Math.PI / 7), -4 + i * Math.sin(Math.PI / 7));
}
createLamp(120, -5);
createLamp(110, 50);
createLamp(-110, 35);
createLamp(-70, 190);
//karrike
function addBench(x, z, ry = 0) {
  const base = new THREE.Mesh(new THREE.BoxGeometry(15, 0.8, 3), benchMat);
  const back = new THREE.Mesh(new THREE.BoxGeometry(15, 2.5, 0.3), benchMat);
  base.position.set(x, 0.4, z);
  back.position.set(x, 1.9, z );
  base.rotation.y = back.rotation.y = ry;
  base.castShadow = true;
  back.castShadow = true;
  scene.add(base, back);
}

addBench(0, 20, 2.9);
addBench(0, 110, 10);
addBench(-50, 210, 2.9);
addBench(-70, 205, 2.9);

function addTrashBin(x, z) {
  const bin = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 2, 6, 16),
    new THREE.MeshStandardMaterial({ color: 0x555555 })
  );
  bin.position.set(x, 3, z);
  bin.castShadow = true;
  bin.receiveShadow = true;
  scene.add(bin);
}

addTrashBin(55, 35);
addTrashBin(-20, 25);
addTrashBin(6, 90);



function addFallenLeaves(count = 400) {
  const leafColors = [0xb87333, 0xd4a017, 0xc19a6b, 0xdeb887, 0xcd853f];
  for (let i = 0; i < count; i++) {
    const color = leafColors[Math.floor(Math.random() * leafColors.length)];
    const leafMat = new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide });
    const leafGeo = new THREE.CircleGeometry(Math.random() * 0.35 + 0.08, 6);
    const leaf = new THREE.Mesh(leafGeo, leafMat);

    const x = (Math.random() - 0.5) * 420;
    const z = (Math.random() - 0.5) * 420;

    if (Math.abs(x - 30) < 45 && Math.abs(z - 1) < 100) continue; 
    if (Math.abs(x + 35) < 60 && Math.abs(z - 85) < 120) continue; 

    leaf.position.set(x, 0.06, z);
    leaf.rotation.x = -Math.PI / 2;
    leaf.rotation.z = Math.random() * Math.PI * 2;
    leaf.receiveShadow = true;
    scene.add(leaf);
  }
}
addFallenLeaves(900);


function animate() {
  requestAnimationFrame(animate);
  controls.update();
  // renderer.render(scene, camera);
  composer.render()
  
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
