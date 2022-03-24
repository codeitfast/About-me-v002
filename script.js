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

class Dot{
  constructor(color, locationX, locationY, locationZ){
    this.color = color;
    this.locationX = locationX;
    this.locationY = locationY;
    this.locationZ = locationZ;
  }
  makeDot(){
    this.geometry = new THREE.SphereGeometry(Math.random(.1,1)/10,32,32);
    this.material = new THREE.MeshBasicMaterial({color: this.color});
    this.dot = new THREE.Mesh(this.geometry, this.material);
    this.dot.position.x = this.locationX
    this.dot.position.y = this.locationY
    this.dot.position.z = this.locationZ
    scene.add(this.dot)
    
  }
}

var dots = []
for(var i = 0; i < 300; i++){
  var color = "rgb(" + Math.floor(Math.random(0,1)*255) + ", " + Math.floor(Math.random(0,1)*255) + ", " + Math.floor(Math.random(0,1)*255) + ")"
  var x = Math.random()-.5
  var y = Math.random()-.5
  var z = Math.random()-.5
  var newDot = new Dot(new THREE.Color(color),x*5,y*3,z*3)
  newDot.makeDot()
  dots.push(newDot)
}

camera.position.z = 5;
var time = 0;

function animate() {
  time -= .001
  scrollHeight = window.pageYOffset/500

  camera.position.x = Math.cos(scrollHeight + time)*5
  camera.position.z = Math.sin(scrollHeight + time)*5
  if(window.pageYOffset > window.innerHeight*4){
    camera.position.y += (1-camera.position.y)/5
  }else{
    camera.position.y += (100-camera.position.y)/30
  }
  
  camera.lookAt(0,0,0)
  
	requestAnimationFrame( animate );
  
	renderer.render( scene, camera );
}
animate();