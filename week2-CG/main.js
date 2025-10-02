import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 80;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// const geometry = new THREE.BoxGeometry(5,5,5);
// // const material = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100 });
// const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
// const cubeMesh = new THREE.Mesh(geometry, material);
// scene.add(cubeMesh);
//change position- translate - zhvendos
// cubeMesh.position.x=0.7;
// cubeMesh.position.y=-0.6;
// cubeMesh.position.z=0.5;
//e njejta ne nji rresht 
// cubeMesh.position.set(1,0.6,0.5)

//distanca e kubit dhe kameres per ta gjetur objektin nese nuk eshte ne frame
// console.log("distance of cube from camera", cubeMesh.position.distanceTo(camera.position))

//definimii i boshtin koordinantiv
//axes helper
// const axes = new THREE.AxesHelper(5);
// scene.add(axes);

//scaling objects zmadhim ne x y z
//kto i shtohen permasave apo kubit inicial 
// cubeMesh.scale.x=2;
// cubeMesh.scale.y=0.5;
// cubeMesh.scale.z=0.5;


//rotation- rrotullimi
// cubeMesh.rotation.x=Math.PI*0.25;
// cubeMesh.rotation.y=Math.PI* 0.25



//applying all transformations at once
// cubeMesh.position.x=0.7
// cubeMesh.position.y=-0.6
// cubeMesh.position.z=1
// cubeMesh.scale.x=1;
// cubeMesh.scale.y=0.25;
// cubeMesh.scale.z=0.5;
// cubeMesh.rotation.x=Math.PI*0.25;
// cubeMesh.rotation.y=Math.PI* 0.25


// scene graphs
//parent
// scene graph
// const group = new THREE.Group();
// group.scale.y = 2;
// group.rotation.y = 0.2;
// scene.add(group);

// const cube1 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshStandardMaterial({ color: 0x811311 })
// );
// cube1.position.x = -1.5;
// group.add(cube1);

// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshStandardMaterial({ color: 0x811311 })
// );
// cube2.position.x = 0; 
// group.add(cube2);

// const cube3 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshStandardMaterial({ color: 0x811311 })
// );
// cube3.position.x = 1.5;
// group.add(cube3);


const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

const chain1 = new THREE.Mesh(
  new THREE.TorusKnotGeometry( 10, 3, 100, 16 ),
  new THREE.MeshStandardMaterial( { color: 0xd8d1e9 } ) 
);
chain1.position.x = 0;
group.add(chain1);

const chain2 = new THREE.Mesh(
  new THREE.TorusKnotGeometry( 10, 3, 100, 16 ),
  new THREE.MeshStandardMaterial( { color: 0xfacee0 } ) 
);
chain2.position.x = 25.5;
group.add(chain2);

const chain3 = new THREE.Mesh(
  new THREE.TorusKnotGeometry( 10, 3, 100, 16 ),
  new THREE.MeshStandardMaterial( { color: 0xcbf2ed } ) 
);
chain3.position.x = -25.5;
group.add(chain3);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);


function animate() {
  requestAnimationFrame(animate);
  // cubeMesh.rotation.x += 0.01;
  // cubeMesh.rotation.y += 0.01;
  chain1.rotation.x += 0.01;
  chain2.rotation.y += 0.01;
  chain3.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();

// Make responsive when the browser changes sizes
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});