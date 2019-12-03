
import { DefaultScene } from './model/DefaultScene'
import { OrbitControls } from './model/OrbitControls'
import * as THREE from 'three'

// remove borders
const els = [ document.querySelector('html'), document.body ]

for(let el of els) {

    el.style.margin = '0'
    el.style.height = '100%'
    el.style.width  = '100%'
    el.style.overflow = 'hidden'

}

const three = new DefaultScene
const controls = new OrbitControls(three.camera, three.renderer.domElement)

const box = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshPhongMaterial({ color: 'lightgreen' })
)

three.scene.add(box)
