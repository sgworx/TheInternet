const imageSelect = document.getElementById("imageSelect");
const captionInput = document.getElementById("captionInput");
const mainImage = document.getElementById("mainImage");
const caption = document.getElementById("caption");

imageSelect.addEventListener("change", function () {
  mainImage.src = this.value;
});

captionInput.addEventListener("input", function () {
  caption.textContent = this.value;
});
