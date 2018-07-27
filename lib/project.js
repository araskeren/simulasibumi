var scene, kamera, renderer, mesh;
//Sceene adalah dunia.
//Kamera adalah mata.
//renderer adalah gambar yang di lihat oleh mata
//Mesh adalah obejct di dalam sceene(dunia) dia mempunyai geometri dan material(warna,texture)
//Mesh mempunyai posisi dan rotasi di dalam dunia
var keyboard = {};
var player = { tinggi:2, kecepatan:0.05, turnSpeed:Math.PI*0.005 };
function init(){
  //Membuat dunia dan kamera.
  scene = new THREE.Scene();
	kamera = new THREE.PerspectiveCamera(60, 1280/720,0.1, 0);

  var textureBumi = new THREE.TextureLoader().load( 'lib/earth.jpg' );
  var textureBulan = new THREE.TextureLoader().load( 'lib/moon.jpg' );
  //Membuat mesh.

  bulan = new THREE.Mesh(
		new THREE.SphereGeometry(0.3, 10, 10),// lebar, tinggi, kedalaman
    new THREE.MeshBasicMaterial({map:textureBulan, wireframe:false})
  );
  //bulan.position.x=10;
  scene.add(bulan);
  bulan.position.x = 10;

  bumi = new THREE.Mesh(
		new THREE.SphereGeometry(5, 32, 32),// lebar, tinggi, kedalaman
    new THREE.MeshBasicMaterial({map:textureBumi,wireframe:false})
  );

  scene.add(bumi);

  //Bantuan Arah
  var axisHelper = new THREE.AxesHelper( 10 );
  scene.add( axisHelper );
  // memindahkan kamera ke 0,0,-5
  kamera.position.set(13,player.tinggi,-5);
  // mengubah sudut pandang kamera ke titik 0,0,0
  kamera.lookAt(new THREE.Vector3(0,0,0));

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(1200,720);
  document.body.appendChild(renderer.domElement);

  animate();

}
function animate(){
  requestAnimationFrame(animate);

  //mesh.rotation.x += 0.01;
  bumi.rotation.y += 0.01;
  bulan.rotation.y += 0.02;

  bulan.position.x += Math.cos(bumi.rotation.y + Math.PI/2) *0.09;
  bulan.position.z -= -Math.cos(bumi.rotation.y) * 0.06;
  //bulan.position.y -= -Math.cos(bulan.rotation.y) * 0.04;
  //console.log(bulan.position.x);
  //console.log(bulan.position.z);
  // Inputan Keyboard
	if(keyboard[87]){ // W
		kamera.position.x -= Math.sin(kamera.rotation.y) * player.kecepatan;
		kamera.position.z -= -Math.cos(kamera.rotation.y) * player.kecepatan;
	}
	if(keyboard[83]){ // S
		kamera.position.x += Math.sin(kamera.rotation.y) * player.kecepatan;
		kamera.position.z += -Math.cos(kamera.rotation.y) * player.kecepatan;
	}
	if(keyboard[65]){ // A
		// Redirect motion by 90 degrees
		kamera.position.x += Math.sin(kamera.rotation.y + Math.PI/2) * player.kecepatan;
		kamera.position.z += -Math.cos(kamera.rotation.y + Math.PI/2) * player.kecepatan;
	}
	if(keyboard[68]){ // D
		kamera.position.x += Math.sin(kamera.rotation.y - Math.PI/2) * player.kecepatan;
		kamera.position.z += -Math.cos(kamera.rotation.y - Math.PI/2) * player.kecepatan;
	}

  // Keyboard untuk merubah sudut pandang(titik pandang)
  if(keyboard[37]){ // panah kiri
		//kamera.rotation.y -= 0.01;
    kamera.rotation.y += Math.PI * 0.005;
	}
  if(keyboard[38]){ // panah atas
		kamera.rotation.x += Math.PI * 0.005;
	}
	if(keyboard[39]){ // panah kanan
    kamera.rotation.y -= Math.PI * 0.005;
	}
  if(keyboard[40]){ // panah bawah
		kamera.rotation.x -= Math.PI * 0.005;
	}

  console.log(kamera.rotation.y);

  kamera.lookAt(new THREE.Vector3(0,0,0));
  renderer.render(scene,kamera);
}
function keyDown(event){
  keyboard[event.keyCode] = true;
}
function keyUp(event){
  keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;
