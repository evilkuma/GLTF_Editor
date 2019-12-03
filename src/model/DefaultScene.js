
import * as THREE from 'three'

function DefaultScene(element = document.body) {

  this.scene = new THREE.Scene
  this.scene.background = new THREE.Color(0x222222)

  this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  this.renderer.setSize( element.clientWidth, element.clientHeight );
  element.appendChild( this.renderer.domElement );

  this.setCamera()
  this.camera.position.y = 180

  // --------------

  this.scene.add(new THREE.AmbientLight( 0x404040, 0.7 ))

  var lights = [];
  lights[ 0 ] = new THREE.PointLight( 0xffe7cc, 1, 400 );
  lights[ 1 ] = new THREE.PointLight( 0xffe7cc, 1, 400 );
  lights[ 2 ] = new THREE.PointLight( 0xffe7cc, 1, 400 );

  lights[ 0 ].position.set( 0, 200, 0 );
  lights[ 1 ].position.set( 100, 200, 100 );
  lights[ 2 ].position.set( - 100, - 200, - 100 );

  this.scene.add( ...lights );

  // --------------

  var animate = (function() {

    requestAnimationFrame( animate )

    this.renderer.render( this.scene, this.camera );

  }).bind(this)

  animate()

  window.addEventListener('resize', updateRendererSize.bind(this), false)

}

function updateRendererSize() {

  if(!this.renderer.domElement.parentElement) {

    console.error('cant calc size without parent dom element')
    return

  }

  if(this.camera) {

    const parentElement = this.renderer.domElement.parentElement
    const aspect = parentElement.clientWidth/parentElement.clientHeight
    const width = parentElement.clientWidth
    const height = parentElement.clientHeight

    this.renderer.setSize(width, height)
    this.camera.aspect = aspect

    if (this.camera.type === 'OrthographicCamera') {

      this.camera.left = -width
      this.camera.right = width
      this.camera.top = height
      this.camera.bottom = -height

    }

    this.camera.updateProjectionMatrix()
  }

}

DefaultScene.prototype.setCamera = function(type = 'perspectivecamera') {

  if(!this.renderer.domElement.parentElement) {

    console.error('cant calc size without parent dom element')
    return

  }

  if(this.camera && this.camera.type.toLowerCase() === type.toLowerCase()) 
    return

  if(this.camera && this.camera.parent)
    this.camera.parent.remove(this.camera)

  var parentElement = this.renderer.domElement.parentElement

  switch(type.toLowerCase()) {
    case 'perspectivecamera':
      this.camera = new THREE.PerspectiveCamera(75, parentElement.clientWidth/parentElement.clientHeight, 0.1, 1000000)
      this.camera.position.z = 100
      break;
    case 'orthographiccamera':
      this.camera = new THREE.OrthographicCamera(
        -parentElement.clientWidth,
        parentElement.clientWidth,
        parentElement.clientHeight,
        -parentElement.clientHeight,
        -3000, 10000
      )
      this.camera.position.z = 10
      break;
    default:
      console.error('undefined camera type')
  }

  // this.scene.add(this.camera)

  if(this.ocontrol)
    this.ocontrol.object = this.camera

}

export { DefaultScene }
