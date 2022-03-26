$( document ).ready(function(){
  setTimeout(function(){
    $("#python").addClass("show")
  }, 0)
  setTimeout(function(){
    $("#javascript").addClass("show")
  }, 400)
  setTimeout(function(){
    $("#html").addClass("show")
  }, 800)
  setTimeout(function(){
    $("#css").addClass("show")
  }, 1200)
})





const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById('render').appendChild( renderer.domElement );
renderer.setClearColor(0x141414);

const light = new THREE.PointLight( 0xa0a0ff, 3, 500 );
light.position.set( 0, 0, 0 );
scene.add( light );


class Dot{
  constructor(color, locationX, locationY, locationZ){
    this.color = color;
    this.locationX = locationX;
    this.locationY = locationY;
    this.locationZ = locationZ;
  }
  makeDot(){
    var random = Math.random(0,1)
    this.geometry = new THREE.SphereGeometry(Math.random(.1,1)/10,32,32);
    if(random < .5){
      this.material = new THREE.MeshBasicMaterial({color: this.color});
    }else if(random < 1){
      this.material = new THREE.MeshLambertMaterial({color: this.color, transparent: true});
    }
    this.dot = new THREE.Mesh(this.geometry, this.material);
    this.dot.position.x = this.locationX
    this.dot.position.y = this.locationY
    this.dot.position.z = this.locationZ
    scene.add(this.dot)
    
  }
}

var dots = []
for(var i = 0; i < 500; i++){
  var color = "rgb(" + Math.floor(Math.random(0,1)*255) + ", " + Math.floor(Math.random(0,1)*255) + ", " + Math.floor(Math.random(0,1)*255) + ")"
  var x = Math.random()-.5
  var y = Math.random()-.5
  var z = Math.random()-.5
  var newDot = new Dot(new THREE.Color(color),x*10,y*3,z*5)
  newDot.makeDot()
  dots.push(newDot)
}


var loader = new THREE.GLTFLoader();
loader.load('./water_with_direction.glb', function(gltf){

  
  const water = gltf.scene//.children.find((child)=>child.name === "Plane")
  water.scale.set(.5 * water.scale.x, .5 * water.scale.y, .5 * water.scale.z)
  water.position.y = -3
  water.position.x = 5
  water.position.z = 0
  scene.add(water)
})

loader.load('./water_with_direction.glb', function(gltf){
    const water2 = gltf.scene//.children.find((child)=>child.name === "Plane")
  water2.scale.set(.5 * water2.scale.x, .5 * water2.scale.y, .5 * water2.scale.z)
  water2.position.y = 3
  water2.position.x = -5
  water2.position.z = 0
  water2.rotation.z = Math.PI
  scene.add(water2)
})



camera.position.z = 5;
var time = 0;

function animate() {
  time -= .001
  scrollHeight = window.pageYOffset/500

  camera.position.x = Math.cos(scrollHeight + time)*5
  camera.position.z = Math.sin(scrollHeight + time)*5
  if(window.pageYOffset > window.innerHeight*3){
    camera.position.y += (1-camera.position.y)/5
  }else{
    camera.position.y += (100-camera.position.y)/30
  }
  
  camera.lookAt(0,0,0)
  
	requestAnimationFrame( animate );
  
	renderer.render( scene, camera );
}
animate();

window.addEventListener('resize', function(){
  const width = window.innerWidth
  const height = window.innerHeight
  camera.aspect = width/height;
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
})