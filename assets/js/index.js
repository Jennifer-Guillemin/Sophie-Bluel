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

//Les filtres
let categories = [];
const button = document.querySelector(".categories");
const createinputElement = () => {
  for (let i = 0; i < categories.length; i++) {
    const input = document.createElement("input");
    button.appendChild(input);
    input.type = "submit";
    input.value = categories[i].name;
  }
};

const Filtres = document.querySelectorAll("filtres");

const getcategories = () => {
  fetch("http://localhost:5678/api/categories")
    .then((res) => res.json())
    .then((data) => {
      categories = data;
      createinputElement();
    });
};

getcategories();

// Formulaire de connexion
function validateForm() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessageElement = document.getElementById("error-message");

  errorMessageElement.innerText = "";

  if (email === "" || password === "") {
    errorMessageElement.innerText = "Veuillez remplir tous les champs.";
  } else if (!isValidEmail(email)) {
    errorMessageElement.innerText =
      "Veuillez saisir une adresse e-mail valide.";
  } else {
    if (email === "utilisateur@example.com" && password === "motdepasse") {
      alert("Connexion réussie pour " + email + "!");
    } else {
      errorMessageElement.innerText =
        "Erreur dans l’identifiant ou le mot de passe";
    }
  }
}

function isValidEmail(email) {
  var emailRegex = /[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+/;
  return emailRegex.test(email);
}
