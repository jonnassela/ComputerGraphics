import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

//A PerspectiveCamera simulates how our eyes see — with perspective (far objects look smaller).
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  //only objects in that range are visible 0.01-1000
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


// const group = new THREE.Group();
// group.scale.y = 2;
// group.rotation.y = 0.2;
// scene.add(group);

// const chain1 = new THREE.Mesh(
//   new THREE.TorusKnotGeometry( 10, 3, 100, 16 ),
//   new THREE.MeshStandardMaterial( { color: 0xd8d1e9 } ) 
// );
// chain1.position.x = 0;
// group.add(chain1);

// const chain2 = new THREE.Mesh(
//   new THREE.TorusKnotGeometry( 10, 3, 100, 16 ),
//   new THREE.MeshStandardMaterial( { color: 0xfacee0 } ) 
// );
// chain2.position.x = 25.5;
// group.add(chain2);

// const chain3 = new THREE.Mesh(
//   new THREE.TorusKnotGeometry( 10, 3, 100, 16 ),
//   new THREE.MeshStandardMaterial( { color: 0xcbf2ed } ) 
// );
// chain3.position.x = -25.5;
// group.add(chain3);



//week3 
// const x = 0, y = 0;

// const heartShape = new THREE.Shape();

// heartShape.moveTo( x + 5, y + 5 );
// heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
// heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
// heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
// heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
// heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
// heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

// const geometry = new THREE.ShapeGeometry( heartShape );
// const material = new THREE.MeshStandardMaterial( { color: 0xd4155e } );
// const mesh = new THREE.Mesh( geometry, material ) ;
// scene.add( mesh );

const geometry = new THREE.TorusGeometry( 10, 5, 11, 100 ); 
// const geometry = new THREE.ConeGeometry(1,2,32);
// const geometry = new THREE.CylinderGeometry(1,1,2,10);
// const geometry = new THREE.SphereGeometry(15,32,16);

// const material = new THREE.MeshBasicMaterial( { color: 0xd4155e, wireframe:true } ); 
// const material= new THREE.MeshLambertMaterial({color:0x8844ff})

// const material = new THREE.MeshStandardMaterial(
//    { color: 0xFF69B4, 
//     metalness:0.4,
//     roughness:0.3,
//     emissive:0xAA336A
//  } ); 

const material = new THREE.MeshPhongMaterial(
   { color: 0xFF69B4, 
    specular:0x8844ff,
    shininess:50
 } );


const shape = new THREE.Mesh( geometry, material ); scene.add( shape );


//drita
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(20, 20, 15);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const lightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.5);
scene.add(lightHelper);

ambientLight.intensity = 0.4;
directionalLight.intensity = 1.2;


function animate() {
  requestAnimationFrame(animate);
  // cubeMesh.rotation.x += 0.01;
  // cubeMesh.rotation.y += 0.01;
  // chain1.rotation.x += 0.01;
  // chain2.rotation.y += 0.01;
  // chain3.rotation.z += 0.01;
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;
  shape.rotation.x+=0.01;
  shape.rotation.y+=0.01;
  shape.rotation.y+=0.01;

 
  renderer.render(scene, camera);
}

animate();

// Make responsive when the browser changes sizes
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});