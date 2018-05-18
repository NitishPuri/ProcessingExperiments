
let geometry, material, mesh;

function setup() {
  geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

function draw() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
}
