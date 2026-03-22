const modal = document.getElementById("calendlyModal");
const open  = document.getElementById("openCalendly");
const close = document.getElementById("closeCalendly");

open.addEventListener("click", () =>
  modal.classList.add("open")
);

close.addEventListener("click", () =>
  modal.classList.remove("open")
);

modal.addEventListener("click", e => {
  if (e.target === modal)
    modal.classList.remove("open");
});