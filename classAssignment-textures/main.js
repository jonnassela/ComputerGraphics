import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.z = 100
camera.position.y=80


const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)


const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true


const textureLoader = new THREE.TextureLoader()
const flagTexture = textureLoader.load('textures/alb.webp')
const redTexture = textureLoader.load('textures/red.jpg')


const globe = new THREE.Mesh(
  new THREE.SphereGeometry(15, 64, 64),
  new THREE.MeshStandardMaterial({
    map: flagTexture,
    roughness: 0.8
  })
)
scene.add(globe)

const sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(15, 64, 64),
  new THREE.MeshStandardMaterial({
    map: redTexture,
    roughness: 0.8
  })
)
sphere1.position.x = -40
sphere1.position.y=-20
scene.add(sphere1)

const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(15, 64, 64),
  new THREE.MeshStandardMaterial({
    map: redTexture,
    roughness: 0.8
  })
)
sphere2.position.x = 40
sphere2.position.y=-21
sphere2.position.z=-20
scene.add(sphere2)

const radius = 60;
const yLevel = 0;


sphere1.position.set(
  Math.cos(0) * radius,
  yLevel,
  Math.sin(0) * radius
);


const angle2 = THREE.MathUtils.degToRad(72);
sphere2.position.set(
  Math.cos(angle2) * radius,
  yLevel,
  Math.sin(angle2) * radius
);


const sphere3 = new THREE.Mesh(
  new THREE.SphereGeometry(15, 64, 64),
  new THREE.MeshStandardMaterial({
    map: redTexture,
    roughness: 0.8
  })
);
const angle3 = THREE.MathUtils.degToRad(144);
sphere3.position.set(
  Math.cos(angle3) * radius,
  yLevel,
  Math.sin(angle3) * radius
);
scene.add(sphere3);


const sphere4 = new THREE.Mesh(
  new THREE.SphereGeometry(15, 64, 64),
  new THREE.MeshStandardMaterial({
    map: redTexture,
    roughness: 0.8
  })
);
const angle4 = THREE.MathUtils.degToRad(216);
sphere4.position.set(
  Math.cos(angle4) * radius,
  yLevel,
  Math.sin(angle4) * radius
);
scene.add(sphere4);


const sphere5 = new THREE.Mesh(
  new THREE.SphereGeometry(15, 64, 64),
  new THREE.MeshStandardMaterial({
    map: redTexture,
    roughness: 0.8
  })
);
const angle5 = THREE.MathUtils.degToRad(288);
sphere5.position.set(
  Math.cos(angle5) * radius,
  yLevel,
  Math.sin(angle5) * radius
);
scene.add(sphere5);



const light = new THREE.DirectionalLight(0xffffff, 2)
light.position.set(10, 10, 10)
scene.add(light)

const ambient = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambient)

function animate() {
  requestAnimationFrame(animate)

  globe.rotation.y += 0.002
  sphere1.rotation.y +=0.002
  sphere2.rotation.y +=0.002


  controls.update()
  renderer.render(scene, camera)
}

animate()

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
