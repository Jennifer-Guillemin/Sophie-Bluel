//Formulaire de connexion
const btnLogin = document.querySelector("#btn_login");

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const user = {
    email: email,
    password: password,
  };
  login(user);
});

const login = (user) => {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((rep) => rep.json())
    .then((data) => {
      if (data.token) {
        sessionStorage.setItem("token", JSON.stringify(data.token));
      } else {
        alert("Erreur dans l’identifiant ou le mot de passe");
      }
    });
};

const isLogin = () => {
  return sessionStorage.getItem("token") ? true : false;
};

if (isLogin()) {
  alert("Online");
} else {
  alert("Offline");
}
