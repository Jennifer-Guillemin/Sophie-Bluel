let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  target.style.display = "block";
  target.setAttribute("aria-hidden", "false");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.querySelector(".js-close").addEventListener("click", closeModal);
};

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
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal.querySelector(".js-close").removeEventListener("click", closeModal);
  modal = null;
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});
