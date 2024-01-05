//Formulaire de connexion
const email = document.getElementById(email);
const password = document.getElementById(password);

const login = () => {
  fetch("http://localhost:5678/api/users/login").then((log) => log.json());
};

export function ajoutListenerEnvoyer() {
  const formulaire = document.querySelector(".formulaire");
  formulaire.addEventListener("submit", function (event) {
    event.preventDefault();

    login();
  });
}

fetch("http://localhost:5678/api/users/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
});
