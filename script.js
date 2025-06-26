document.addEventListener('DOMContentLoaded', () => {
const imageSelect = document.getElementById("imageSelect");
const captionInput = document.getElementById("captionInput");
const mainImage = document.getElementById("mainImage");
const caption = document.getElementById("caption");
const toggle3D = document.getElementById("toggle3D");
const threeCanvas = document.getElementById("threeCanvas");

let is3D = false;
let threeRenderer, threeScene, threeCamera, threeModel;

function getGLBForOption() {
  // Always return op1.glb for 3D view as requested
  return 'assets/op1.glb';
}

function showImage() {
  mainImage.style.display = '';
  threeCanvas.style.display = 'none';
  if (threeRenderer) {
    threeRenderer.dispose();
    threeRenderer.forceContextLoss();
    threeRenderer.domElement = null;
    threeRenderer = null;
  }
  if (threeScene) threeScene = null;
  if (threeCamera) threeCamera = null;
  if (threeModel) threeModel = null;
}

function show3D() {
  mainImage.style.display = 'none';
  threeCanvas.style.display = '';
  if (!window.THREE || !window.GLTFLoader) {
    alert('Three.js or GLTFLoader not loaded!');
    return;
  }
  // Init renderer
  threeRenderer = new THREE.WebGLRenderer({ canvas: threeCanvas, alpha: true, antialias: true });
  threeRenderer.setSize(threeCanvas.clientWidth, threeCanvas.clientHeight, false);
  // Init scene
  threeScene = new THREE.Scene();
  threeCamera = new THREE.PerspectiveCamera(45, threeCanvas.clientWidth / threeCanvas.clientHeight, 0.1, 100);
  threeCamera.position.set(0, 1, 2);
  // Light
  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
  threeScene.add(light);
  // Load model
  const loader = new window.GLTFLoader();
  loader.load(getGLBForOption(), function(gltf) {
    threeModel = gltf.scene;
    threeScene.add(threeModel);
    animate();
  }, undefined, function(error) {
    alert('Failed to load 3D model: ' + error);
  });
}

function animate() {
  if (!threeRenderer || !threeScene || !threeCamera) return;
  if (threeModel) threeModel.rotation.y += 0.01;
  threeRenderer.render(threeScene, threeCamera);
  if (is3D) requestAnimationFrame(animate);
}

toggle3D.addEventListener('click', function() {
  is3D = !is3D;
  if (is3D) {
    show3D();
    toggle3D.textContent = 'IMG';
    toggle3D.title = 'Switch to image view';
  } else {
    showImage();
    toggle3D.textContent = '3D';
    toggle3D.title = 'Switch to 3D view';
  }
});

imageSelect.addEventListener("change", function () {
  mainImage.src = this.value;
  if (is3D) {
    show3D();
  }
});

captionInput.addEventListener("input", function () {
  caption.textContent = this.value;
});

// On load, ensure image is shown
showImage();
});
