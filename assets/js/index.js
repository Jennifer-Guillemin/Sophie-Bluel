//La galerie principal
const gallery = document.querySelector(".gallery");
const displayworks = () => {
  gallery.innerHTML = "";

  Works.forEach((element) => {
    gallery.innerHTML += `<figure>
        <img src=${element.imageUrl} alt="${element.title}">
            <figcaption>${element.title}</figcaption>
    </figure>`;
  });
};

getworks();

//La galerie de modale
const displayModalworks = () => {
  modalphotos.innerHTML = "";

  Works.forEach((element) => {
    const imageContainer = document.createElement("div");
    const ModalImg = document.createElement("img");
    const deletedBtn = document.createElement("button");
    deletedBtn.innerHTML = "<i class='fa-solid fa-trash-can'>";

    modalphotos.appendChild(imageContainer);
    imageContainer.className = "imageContainer";

    imageContainer.appendChild(ModalImg);
    ModalImg.className = "ModalImg";
    ModalImg.src = element.imageUrl;
    ModalImg.alt = element.title;

    imageContainer.appendChild(deletedBtn);
    deletedBtn.className = "deleted";

    //message d'alert avant de supprimer
    deletedBtn.addEventListener("click", () => {
      const confirmDelete = window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette photo?"
      );

      if (confirmDelete) {
        deletedWork(element.id);
      }
    });
  });
};

//Les filtres
const filter = document.querySelector(".categories");
const FilterAll = document.getElementById("FilterAll");

FilterAll.addEventListener("click", (input) => {
  displayworks();
  let i = 0;
  input.className = "";
  console.log("Tous");

  const allInputs = document.querySelectorAll(".categories input");
  allInputs.forEach((input) => {
    input.classList.remove("selected");
  });

  FilterAll.classList.add("selected");
});

getcategories();

//Afficher/cacher les élèments
const EditMode = document.getElementById("EditMode");
const logoutBtn = document.getElementById("logoutBtn");
const loginBtn = document.getElementById("loginBtn");
const modifier = document.getElementById("modifier");

document.addEventListener("DOMContentLoaded", function () {
  if (isLogin()) {
    console.log("online");
    diplayEditModeOn();
    login();
    modifierOn();
    ProjetsOn();
  } else {
    console.log("offline");
    diplayEditModeOff();
    logout();
    modifierOff();
    ProjetsOff();
  }
});

logoutBtn.addEventListener("click", function () {
  sessionStorage.removeItem("token");
  location.reload();
});

//La modale
const projets = document.getElementById("projets");
const modal = document.getElementById("modal");
const jsclose1 = document.getElementById("js-close1");
const jsclose2 = document.getElementById("js-close2");
const modalphotos = document.querySelector(".modalphotos");

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modalCloseFunction();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const ModifierBtn = document.querySelector(".ModifierBtn");
  ModifierBtn.addEventListener("click", function () {
    modal.className = "modal";
  });
});

jsclose1.addEventListener("click", function () {
  modalCloseFunction();
});
jsclose2.addEventListener("click", function () {
  modalCloseFunction();
});

const modalgallery = document.getElementById("modalgallery");
const ajoutgallery = document.getElementById("ajoutgallery");
const AddPicture = document.querySelector(".AddPicture");
const ModalBack = document.getElementById("ModalBack");

AddPicture.addEventListener("click", () => {
  modalgallery.className = "DisplayOff";
  ajoutgallery.className = "modalContainer";
  ImgSelected.className = "DisplayOff";
  SelecteImg.className = "ModalAddFile";
  previewImage.src = "";
  ModalAddFile.value = "";
  ModalAddTitle.value = "";
  result.innerText = "";
  ModalValidate.className = "ModalValidate";
  ModalValidate.disabled = true;
});

ModalBack.addEventListener("click", () => {
  modalgallery.className = "modalContainer";
  ajoutgallery.className = "DisplayOff";
});

const ModalAddFile = document.getElementById("ModalAddFile");
const ModalAddTitle = document.querySelector(".ModalAddTitle");
const ModalSelectedCategorie = document.querySelector(
  ".ModalSelectedCategorie"
);
const SelecteImg = document.getElementById("SelecteImg");
const ImgSelected = document.getElementById("ImgSelected");

ModalAddFile.addEventListener("change", (event) => {
  const selectedFile = event.target.files[0];

  if (previewImage.src) {
    URL.revokeObjectURL(previewImage.src);
  }

  if (selectedFile) {
    if (selectedFile.type.startsWith("image/")) {
      if (selectedFile.size <= 4 * 1024 * 1024) {
        const imageURL = URL.createObjectURL(selectedFile);
        SelecteImg.className = "DisplayOff";
        ImgSelected.className = "divImgSelected";
        previewImage.src = imageURL;
      } else {
        alert("La taille du fichier doit être inférieure ou égale à 4 Mo.");
        ModalAddFile.value = "";
      }
    } else {
      alert("Le fichier sélectionné n'est pas une image.");
      ModalAddFile.value = "";
    }
  } else {
    previewImage.src = "";
    ImgSelected.className = "DisplayOff";
    SelecteImg.className = "ModalAddFile";
  }
});

//Catégorie de la modale
const dropdownButton = document.getElementById("result");

dropdownButton.addEventListener("click", function () {
  toggleDropdown();
});

window.onclick = function (event) {
  if (!event.target.matches(".ModalSelectedCategorie")) {
    var dropdowns = document.getElementsByClassName("ModalDropdownContent");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.style.display === "block") {
        openDropdown.style.display = "none";
      }
    }
  }
};

//Vérification du formulaire
const optionchoice = document.querySelector("optionchoice");
const ModalValidate = document.querySelector(".ModalValidate");

function verifierValeurs() {
  if (ModalAddFile.files.length === 0) {
    console.error("Veuillez sélectionner un fichier.");
    ModalValidate.className = "ModalValidate";
    ModalValidate.disabled = true;
    return;
  }

  const titleValue = ModalAddTitle.value.trim();
  if (titleValue === "") {
    console.error("Veuillez entrer un titre.");
    ModalValidate.className = "ModalValidate";
    ModalValidate.disabled = true;
    return;
  }

  const resultValue = ModalSelectedCategorie.textContent.trim();
  if (resultValue === "") {
    console.error("Veuillez sélectionner une catégorie.");
    ModalValidate.className = "ModalValidate";
    ModalValidate.disabled = true;
    return;
  }
  console.log("Toutes les valeurs sont correctes.");
  ModalValidate.className = "ModalValidate ModalValidated";
  ModalValidate.disabled = false;
}

ModalAddFile.addEventListener("input", verifierValeurs);
ModalAddTitle.addEventListener("input", verifierValeurs);

ModalValidate.addEventListener("click", () => {
  AddWorks(CatId);
});
