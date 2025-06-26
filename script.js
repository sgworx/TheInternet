document.addEventListener('DOMContentLoaded', () => {
const imageSelect = document.getElementById("imageSelect");
const mainImage = document.getElementById("mainImage");
const mainModel = document.getElementById("mainModel");
const toggle3D = document.getElementById("toggle3D");
let is3D = false;

function updateMedia() {
  const selected = imageSelect.options[imageSelect.selectedIndex];
  mainImage.src = selected.value;
  mainModel.src = selected.getAttribute('data-glb');
}

toggle3D.addEventListener('click', function() {
  is3D = !is3D;
  if (is3D) {
    mainImage.style.display = 'none';
    mainModel.style.display = '';
    toggle3D.textContent = '3D';
    toggle3D.title = 'Currently showing 3D model';
  } else {
    mainImage.style.display = '';
    mainModel.style.display = 'none';
    toggle3D.textContent = 'IMG';
    toggle3D.title = 'Currently showing image';
  }
});

imageSelect.addEventListener("change", function () {
  updateMedia();
  if (is3D) {
    mainModel.style.display = '';
    mainImage.style.display = 'none';
  } else {
    mainModel.style.display = 'none';
    mainImage.style.display = '';
  }
});

// Initialize
updateMedia();
mainModel.style.display = 'none';
});
