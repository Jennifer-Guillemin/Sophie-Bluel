// La galerie
let Works = [];

const gallery = document.querySelector(".gallery");
const getworks = () => {
  fetch("http://localhost:5678/api/works/")
    .then((res) => res.json())
    .then((data) => {
      Works = data;
      displayworks();
    });
};

const displayworks = () => {
  gallery.innerHTML = "";

  Works.forEach((element) => {
    gallery.innerHTML += `<figure>
        <img src=${element.imageUrl} alt="Abajour Tahina">
            <figcaption>${element.title}</figcaption>
    </figure>`;
  });
};

getworks();

// Affichage les photos dans la modale
const modalphotos = document.querySelector(".modalphotos");

const displaymodalworks = () => {
  modalphotos.innerHTML = "";

  Works.forEach((element) => {
    modalphotos.innerHTML += `<div class="imageContainer">
  <img src="${element.imageUrl}" alt="${element.title}" class="ModalImg">
  <button class="deleted"><i class="fa-solid fa-trash-can"></i></button>
</div>`;
  });
};

const getmodalworks = () => {
  fetch("http://localhost:5678/api/works/")
    .then((res) => res.json())
    .then((data) => {
      Works = data;
      displaymodalworks();
    });
};
getmodalworks();

//Les filtres
let categories = [];

const getcategories = () => {
  fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) => {
      categories = data;
      createinputElement();
    });
};

const button = document.querySelector(".categories");
const createinputElement = () => {
  for (let i = 0; i < categories.length; i++) {
    const input = document.createElement("input");
    button.appendChild(input);
    input.type = "button";
    input.value = categories[i].name;

    input.addEventListener("click", () => {
      handleInputClick(categories[i].id, categories[i].name);
      const allInputs = document.querySelectorAll(".categories input");

      allInputs.forEach((otherInput) => {
        otherInput.classList.remove("selected");
      });

      input.classList.add("selected");
      const categorieId = categories[i].id;
      displayWorksByCategorie(categorieId);
    });
  }
};

const filtres = document.getElementById("filtres");

filtres.addEventListener("click", (input) => {
  displayworks();
  let i = 0;
  input.className = "";
  console.log("Tous", [i]);

  const allInputs = document.querySelectorAll(".categories input");
  allInputs.forEach((input) => {
    input.classList.remove("selected");
  });

  filtres.classList.add("selected");
});

getcategories();

const handleInputClick = (categorieId, categorieName) => {
  console.log(" id:", categorieId, ", name :", categorieName);
};

const displayWorksByCategorie = (categorieId) => {
  const filteredWorks = Works.filter((work) => work.categoryId === categorieId);
  displayFilteredWorks(filteredWorks);
};

const displayFilteredWorks = (filteredWorks) => {
  gallery.innerHTML = "";

  filteredWorks.forEach((element) => {
    gallery.innerHTML += `<figure>
        <img src=${element.imageUrl} alt="${element.title}">
            <figcaption>${element.title}</figcaption>
    </figure>`;
  });
};

//Affichage du message d'alerte Online/Offline
const isLogin = () => {
  return sessionStorage.getItem("token") ? true : false;
};

document.addEventListener("DOMContentLoaded", function () {
  if (isLogin()) {
    alert("Online");
    // L'utilisateur est connecté, afficher les éléments masqués
    const hideTopbar = document.getElementById("hide");
    const modifier = document.getElementById("modifier");
    const login = document.getElementById("login");
    const logout = document.getElementById("logout");
    if ((hideTopbar, modifier, login, logout)) {
      hideTopbar.style.display = "flex";
      modifier.style.display = "flex";
      button.style.display = "none";
      login.style.display = "none";
      logout.style.display = "inline-block";
    }
  } else {
    alert("Offline");
  }
});

// Fonction pour déconnecter l'utilisateur
logout.addEventListener("click", function () {
  sessionStorage.removeItem("token");
  window.location.href = "login.html";
});
