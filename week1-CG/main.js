import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


//window size
//perndryshe perdoret windoe innerWidth ose innerHeight
// const sizes = {
//   width: 800,
//   height: 600
// }


//krijo skenen dmth container ku te vendohen krejt gjerat
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);


//kamera

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;


// //orthographis camera
// //to make sure your scene doesn’t look stretched or squished when the window isn’t square.
// const aspectRatio=sizes.width/sizes.height // keeps shapes like cubes looking correct regardless of your screen size.
// const camera = new THREE.OrthographicCamera(
//     -1*aspectRatio,//left
//     1*aspectRatio,//right
//     1,//top
//     -1,//bottom
// )
// camera.position.z=3
// scene.add(camera)


//renderer qe e krijon the actual image duke marr infot e skenes the kameres
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//orbit control
const controls= new OrbitControls(camera,renderer.domElement)
controls.enableDamping=true;


// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(5, 5),
//     material
// )
// plane.rotation.x = -Math.PI * 0.5
// plane.position.y = -0.65
// scene.add(plane)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshStandardMaterial({ color: 0x888888})
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;
scene.add(plane);


//create shapes
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({color:0x870ff0});
const cube = new THREE.Mesh(geometry,material);
scene.add(cube);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0x811311 })
);
cube1.position.x = -1.5;
scene.add(cube1);

// objekte me grupim hierarki
const group = new THREE.Group();
group.scale.y=1;
group.rotation.y=0.2;
scene.add(group);

const cube2= new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshStandardMaterial({color:0xf078D8})
);
cube2.position.x=-3;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5,32,32),
  new THREE.MeshLambertMaterial({color:0x00Dff0,wireframe:true})
)
cube3.position.y=2;
group.add(cube3);



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


//light
const light = new THREE.PointLight(0xffffff,1);
light.position.set(5,5,5);
scene.add(light);

const dlight = new THREE.DirectionalLight(0xffffff, 1);
dlight.position.set(2, 2, 5);
scene.add(dlight);

const ambientLight= new THREE.AmbientLight(0xffffff,1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xff9000,1.5,0.2)
pointLight.position.set(1,-0.5,1)
scene.add(pointLight)

const rectAreaLight= new THREE.RectAreaLight(0x4e00ff,6,1,1)
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x78ff00,4.5,10,Math.PI*0.1,0.25,1)
spotLight.position.set(0,2,3)
spotLight.target.position.x=-0.75
scene.add(spotLight)
scene.add(spotLight.target)

//animation
function animate()
{
  requestAnimationFrame(animate);

  cube.rotation.x +=0.01;
  // group.rotation.z+=0.01

  renderer.render(scene,camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});





