
let geometry, material, mesh;

let mesh2;

function setup() {
  geometry = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  mesh2 = new THREE.Mesh(new THREE.BoxGeometry(), material);
  scene.add(mesh);
}

function draw() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
}
