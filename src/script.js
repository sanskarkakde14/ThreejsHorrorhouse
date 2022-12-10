import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Fog---
const fog = new THREE.Fog('#262837',0,21)
scene.fog = fog
gui.add(fog,'near').min(-10).max(10).step(0.1).name('Fog/Visibility')
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load ('/textures/door/color.jpg' )
const doorAlphaTexture = textureLoader. load(' /textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load ('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader. load (' /textures/door/height.jpg' )
const doorNormalTexture = textureLoader. load(' /textures/door/normal.jpg' )
const doorMetalnessTexture = textureLoader. load ( '/textures/door/metalness.jpg' )
const doorRoughnessTexture = textureLoader. load (' /textures/door/roughness.jpg')

const bricksColorTexture = textureLoader. load('/textures/bricks/color.jpg' )
const bricksAmbientOcclusionTexture = textureLoader. load (' /textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader. load('/textures/bricks/normal.jpg' )
const bricksRoughnessTexture = textureLoader. load(' /textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader. load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader. load ('/textures /grass /ambientOcclusion.jpg')
const grassNormalTexture = textureLoader. load ('/textures/grass/normal.jpg' )
const grassRoughnessTexture = textureLoader. load (' /textures/grass/roughness.jpg' )

const moonTexture = textureLoader.load('/textures/moon/moon.jpg')

const graveTexture = textureLoader.load('/textures/graves/grave.jpg')

/**
 * House....................................................
 */
const house = new THREE.Group()
scene.add(house)

//MOON
const moonGeometry = new THREE.IcosahedronGeometry(1, 15);
const moonMaterial = new THREE.MeshBasicMaterial({map:moonTexture});
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.set(-5, 5, -1);
gui.add(moonMaterial,'wireframe').name('Moon WireFrame')
gui.add(moonMaterial,'visible').name('Moon On/Off')
scene.add(moon);

//Walls
const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({
        map: bricksNormalTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array,2)
)
walls.position.y=1.25
house.add(walls)

//Roof
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({color:'#b35f45'})
)
roof.rotation.y = Math.PI*0.25
roof.position.y = 3
house.add(roof)

//Door
const door = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2,2,100,100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture,
    })
)
door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2)
)
door.position.y = 1
door.position.z=2+0.01
house.add(door)
  

//Bushes
const bushGeometry = new THREE.SphereBufferGeometry(1,16,16)
const bushMaterial = new THREE.MeshStandardMaterial({color:'#89c854'})

const bush1 = new THREE.Mesh(bushGeometry,bushMaterial)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(0.8,0.2,2.2)

const bush2 = new THREE.Mesh(bushGeometry,bushMaterial)
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.4,0.1,2.1)

const bush3 = new THREE.Mesh(bushGeometry,bushMaterial)
bush3.scale.set(0.4,0.4,0.4)
bush3.position.set(-0.8,0.1,2.2)

const bush4 = new THREE.Mesh(bushGeometry,bushMaterial)
bush4.scale.set(0.15,0.15,0.15)
bush4.position.set(-1,0.05,2.6)

house.add(bush1,bush2,bush3,bush4)

//Graves
const graves = new THREE.Group()
scene.add(graves)
const graveGeometry = new THREE.BoxBufferGeometry(0.6,0.8,0.2)
const graveMaterial = new THREE.MeshStandardMaterial({color:'#b2b6b1'})
gui.add(graveMaterial,'wireframe').name('Grave WireFrame')
gui.add(graves,'visible').name('Graves On/Off')
for( let i = 0 ; i < 50 ; i++ )
{
    const angle = Math.random()*Math.PI*2 //Random angle
    const radius = 3+Math.random()*6 //Rnadom radius
    const x = Math.cos(angle)*radius //X pos via cos
    const z = Math.sin(angle)*radius //Z pos via sin
    const grave = new THREE.Mesh(graveGeometry, graveMaterial) //Mesh generation
    grave.position.set(x, 0.3, z) 
    grave.rotation.y = (Math.random()-0.5)*0.4
    grave.rotation.z = (Math.random()-0.5)*0.4
    grave.castShadow=true
    graves.add(grave)
    
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(50, 50),
    new THREE.MeshStandardMaterial({
        map: grassNormalTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture,
        
    })
)
floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array,2)
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('Ambient Light')
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001).name('Moon Light')
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001).name('Light DirectionX')
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001).name('Light DirectionY')
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001).name('Light DirectionZ')
scene.add(moonLight)

//Door light
const doorLight = new THREE.PointLight('#ff7d46',1,7)
doorLight.position.set(0,2.2,2.7)
house.add(doorLight)

//GHOSTS
const ghost1 = new THREE.PointLight('#ff00ff',2,3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff',2,4)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00',3,4)
scene.add(ghost3)

const ghost4 = new THREE.PointLight('#32cd32',2,4)
scene.add(ghost4)

const ghost5 = new THREE.PointLight('#FF5F1F',3,3)
scene.add(ghost5)

const ghost6 = new THREE.PointLight('#ffffff',8,3)
scene.add(ghost6)

const ghost7 = new THREE.PointLight('#800020',15,4)
scene.add(ghost7)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 3
camera.position.z = 9
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxPolarAngle = Math.PI / 2.2
controls.minPolarAngle = Math.PI / 7.2;
controls.minDistance = 7
controls.maxDistance = 12
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled=true
renderer.shadowMap.type=THREE.PCFSoftShadowMap

//Shadows
renderer.shadowMap.enabled=true
moonLight.castShadow=true
doorLight.castShadow=true
ghost1.castShadow=true
ghost2.castShadow=true
ghost3.castShadow=true
ghost4.castShadow=true
ghost5.castShadow=true
ghost6.castShadow=true
walls.castShadow=true
bush1.castShadow=true
bush2.castShadow=true
bush3.castShadow=true
bush4.castShadow=true
floor.receiveShadow=true
doorLight.shadow.mapSize.width=256
doorLight.shadow.mapSize.height=256
doorLight.shadow.camera.far=7
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    moon.rotation.y=elapsedTime-15
    //GHOSTS animation
    const ghost1Angle = elapsedTime*0.5
    ghost1.position.x = Math.cos(ghost1Angle)*4
    ghost1.position.z = Math.sin(ghost1Angle)*4
    ghost1.position.y = Math.sin(elapsedTime*3)

    const ghost2Angle = -elapsedTime*0.5
    ghost2.position.x = Math.cos(ghost2Angle)*5
    ghost2.position.z = Math.sin(ghost2Angle)*5
    ghost2.position.y = Math.sin(elapsedTime*4)+Math.sin(elapsedTime*2.5)

    const ghost3Angle = -elapsedTime*0.18
    ghost3.position.x = Math.cos(ghost3Angle)*(7+Math.sin(elapsedTime*0.32))
    ghost3.position.z = Math.sin(ghost3Angle)*(7+Math.sin(elapsedTime*0.5))
    ghost3.position.y = Math.sin(elapsedTime*5)+Math.sin(elapsedTime*0.2)

    const ghost4Angle = elapsedTime*0.1
    ghost4.position.x = Math.cos(ghost4Angle)*(9+Math.sin(elapsedTime*0.32))
    ghost4.position.z = Math.sin(ghost4Angle)*(9+Math.sin(elapsedTime*0.5))
    ghost4.position.y = Math.sin(elapsedTime*7)+Math.sin(elapsedTime*0.2)

    const ghost5Angle = elapsedTime*0.3
    ghost5.position.x = Math.cos(ghost5Angle)*7
    ghost5.position.z = Math.sin(ghost5Angle)*6
    ghost5.position.y = Math.sin(elapsedTime*10)

    const ghost6Angle = elapsedTime*0.1
    ghost6.position.x = Math.cos(ghost6Angle)*20
    ghost6.position.z = Math.sin(ghost6Angle)*20
    ghost6.position.y = Math.sin(elapsedTime*10)

    const ghost7Angle = -elapsedTime*0.11
    ghost7.position.x = Math.cos(ghost7Angle)*20
    ghost7.position.z = Math.sin(ghost7Angle)*20
    ghost7.position.y = Math.sin(elapsedTime*10)
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()