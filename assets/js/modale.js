// Ouvrir la modale
let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = "block";
  modal = target;
  modal.addEventListener("click", closeModal);
  modal
    .querySelector(".modalgallery .js-close")
    .addEventListener("click", closeModal);
  modal
    .querySelector(".ajoutgallery .js-close")
    .addEventListener("click", closeModal);
  modal.querySelector(".modalgallery").addEventListener("click", (e) => {
    e.stopPropagation();
  });
  modal.querySelector(".ajoutgallery").addEventListener("click", (e) => {
    e.stopPropagation();
  });
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

//Fermer la modale
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  const isModalElement = e.target === modal || modal.contains(e.target);
  const isInput = e.target.tagName === "INPUT";
  modal.style.display = "none";
  if (isModalElement && !isInput) {
    return;
  }

  modal.style.display = "none";
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".js-close").removeEventListener("click", closeModal);
  modal = null;
};

//Afficher/cacher la premiere ou la deuxieme modale
document.addEventListener("DOMContentLoaded", function () {
  const AddPicture = document.querySelector(".modalgallery .AddPicture");
  const flecheButton = document.querySelector(".ajoutgallery .fleche");
  const modalGallery = document.querySelector(".modalgallery");
  const ajoutGallery = document.querySelector(".ajoutgallery");

  AddPicture.addEventListener("click", function (event) {
    modalGallery.style.display = "none";
    ajoutGallery.style.display = "flex";
  });

  flecheButton.addEventListener("click", function () {
    modalGallery.style.display = "flex";
    ajoutGallery.style.display = "none";
    resetImagePreview();
  });
});

//Ajouter une image dans la modale
const Imagebtn = document.getElementById("imageInput");

function previewImage(e) {
  const fileInput = e.target;
  const files = fileInput.files;

  if (files.length > 0) {
    const selectedFile = files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById("imagePreview").src = e.target.result;
      document.getElementById("imagePreview").style.display = "block";
      document.querySelector(".contenu-ajoutgallery").style.display = "none";
    };

    reader.readAsDataURL(selectedFile);
  }
}

const closeBtn = document.querySelector(".ajoutgallery .js-close");

closeBtn.addEventListener("click", function () {
  resetImagePreview();
});

function resetImagePreview() {
  document.getElementById("imageInput").value = "";
  document.getElementById("imagePreview").src = "";
  document.getElementById("imagePreview").style.display = "none";
  document.querySelector(".contenu-ajoutgallery").style.display = "block";
}

//Condition pour verifier le formulaire d'ajout photo
