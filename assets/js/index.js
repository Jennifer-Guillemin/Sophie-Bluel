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
