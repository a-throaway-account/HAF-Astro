


function resetFilter() {
  activeTag = null;

  tags.forEach(t => {
    t.classList.remove("active", "dim");
  });

  cards.forEach(c => c.classList.remove("hidden"));
}


const words = [
  "strategy.",
  "system design.",
  "experimenting.",
  "compounding.",
  "execution."
];

let i = 0;
let j = 0;
let deleting = false;

const el = document.getElementById("typeText");

function type() {
  const word = words[i];

  if (!deleting) {
    el.textContent = word.slice(0, j++);
    if (j > word.length) {
      deleting = true;
      setTimeout(type, 1200);
      return;
    }
  } else {
    el.textContent = word.slice(0, j--);
    if (j === 0) {
      deleting = false;
      i = (i + 1) % words.length;
    }
  }

  setTimeout(type, deleting ? 40 : 70);
}

type();


// ===== CALENDLY MODAL =====
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

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".blog-track");

  const speed = Math.floor(Math.random() * (38 - 28) + 28);
  track.style.animationDuration = speed + "s";
});


const data = [
  {
    title: "How CLV drives profit",
    cat: "marketing",
    date: "26 Sep 2023",
    img: "https://picsum.photos/600/400?1",
    text: "Lifetime value changes how you acquire customers..."
  },

  {
    title: "ONDC Revolution",
    cat: "tech",
    date: "19 Jun 2023",
    img: "https://picsum.photos/600/400?2",
    text: "Open network is reshaping Indian commerce..."
  },

  {
    title: "D2C Playbooks",
    cat: "d2c",
    date: "21 Aug 2023",
    img: "https://picsum.photos/600/400?3",
    text: "Brands bypass marketplaces to own users..."
  },

  {
    title: "Global Expansion",
    cat: "strategy",
    date: "02 Jan 2024",
    img: "https://picsum.photos/600/400?4",
    text: "How Indian brands go international..."
  }
];

let page = 1;
const perPage = 6;

function render() {
  const container = document.getElementById("blogContainer");
  if (!container) return;   // ← SAFETY

  container.innerHTML = html;
}


/* SEARCH */
document.getElementById("searchInput")
?.addEventListener("input", e => {
  const q = e.target.value.toLowerCase();

  document.querySelectorAll(".blog-toast").forEach(c => {
    c.style.display =
      c.innerText.toLowerCase().includes(q)
        ? "block" : "none";
  });
});

/* FILTER */
document.querySelectorAll(".filter").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".filter")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    const cat = btn.dataset.cat;

    document.querySelectorAll(".blog-toast")
      .forEach(c => {
        c.style.display =
          cat === "all" || c.dataset.cat === cat
            ? "block" : "none";
      });
  };
});

render();

document.addEventListener("DOMContentLoaded", () => {

  const openBtn  = document.getElementById("openCalendly");
  const closeBtn = document.getElementById("closeCalendly");
  const modal    = document.getElementById("calendlyModal");

  if (!openBtn || !modal) {
    console.log("Calendly elements not found", {openBtn, modal});
    return;
  }

  openBtn.addEventListener("click", () => {
    modal.classList.add("open");
  });

  closeBtn?.addEventListener("click", () => {
    modal.classList.remove("open");
  });

  // click outside to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
    }
  });

});
