
import { DefaultScene } from './model/DefaultScene'
import { OrbitControls } from './model/OrbitControls'
import { GLTFLoader } from './model/GLTFLoader'
import * as THREE from 'three'
import dat from 'dat.gui'

// remove borders
const els = [ document.querySelector('html'), document.body ]

for(let el of els) {

    el.style.margin = '0'
    el.style.height = '100%'
    el.style.width  = '100%'
    el.style.overflow = 'hidden'

}

const gui = new dat.GUI
const three = new DefaultScene
const controls = new OrbitControls(three.camera, three.renderer.domElement)

const SCOPE = {}

{
    /**
     * load GLTF by button
     */

    const file = document.createElement('input')
    file.type = 'file'
    const file_reader = new FileReader
    const gltf_loader = new GLTFLoader
    
    file.onchange = e => file_reader.readAsText(e.path[0].files[0])
    
    file_reader.onload = e =>
        gltf_loader.parse(e.target.result, undefined, res => {

            const mesh = res.scene.children[0]

            three.scene.add(mesh)

        })
    
    SCOPE.load = () => file.click()

}

// add to gui
gui.add(SCOPE, 'load')
