const params = new URLSearchParams(window.location.search);
const folder = params.get("folder");

const title = document.getElementById("folderTitle");
const gallery = document.getElementById("galleryGrid");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

/* =========================
   DEFAULT IMAGES
========================= */
const defaultImages = {
  camera: [
    "images/quran1.png",
    "images/quran2.png",
    
  ],
  screenshots: [
    "https://picsum.photos/500/600?4",
    "https://picsum.photos/500/600?5",
    "https://picsum.photos/500/600?6"
  ],
  whatsapp: [
    "https://picsum.photos/500/600?7",
    "https://picsum.photos/500/600?8"
  ],
  downloads: [
    "https://picsum.photos/500/600?9",
    "https://picsum.photos/500/600?10"
  ],
  snapchat: [
    "https://picsum.photos/500/600?11",
    "https://picsum.photos/500/600?12"
  ],
  pictures: [
    "https://picsum.photos/500/600?13",
    "https://picsum.photos/500/600?14"
  ]
};

/* =========================
   LOAD / INIT DATA
========================= */
let images = JSON.parse(localStorage.getItem("images"));

if (!images || typeof images !== "object") {
  images = structuredClone(defaultImages);
  localStorage.setItem("images", JSON.stringify(images));
}

let trash = JSON.parse(localStorage.getItem("trash")) || [];
let vault = JSON.parse(localStorage.getItem("vault")) || [];

/* SAVE */
function saveData() {
  localStorage.setItem("images", JSON.stringify(images));
  localStorage.setItem("trash", JSON.stringify(trash));
  localStorage.setItem("vault", JSON.stringify(vault));
}

/* TITLE */
title.innerText = folder ? folder.toUpperCase() : "GALLERY";

/* =========================
   RENDER GALLERY
========================= */
function renderGallery() {
  gallery.innerHTML = "";

  if (!images[folder] || images[folder].length === 0) {
    gallery.innerHTML = "<h3>No Images Found</h3>";
    return;
  }

  images[folder].forEach((img, index) => {
    const div = document.createElement("div");
    div.classList.add("image-card");

    div.innerHTML = `
      <img src="${img}" alt="image">

      <button class="delete-btn">🗑️</button>
      <button class="vault-btn">🔒</button>
    `;

    /* OPEN MODAL */
    div.querySelector("img").addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img;
    });

    /* DELETE → TRASH */
    div.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();

      images[folder].splice(index, 1);

      trash.push({
        img: img,
        folder: folder
      });

      saveData();
      renderGallery();
    });

    /* MOVE TO VAULT */
    div.querySelector(".vault-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      moveToVault(folder, index, img);
    });

    gallery.appendChild(div);
  });
}

/* =========================
   MOVE TO VAULT
========================= */
function moveToVault(folderName, index, imageData) {

  if (!images[folderName]) return;

  let vault = JSON.parse(localStorage.getItem("vault")) || [];

  // 💥 FIX: always normalize path
  let safePath = imageData;

  vault.push({
    img: safePath,
    folder: folderName
  });

  images[folderName].splice(index, 1);

  localStorage.setItem("vault", JSON.stringify(vault));
  localStorage.setItem("images", JSON.stringify(images));

  renderGallery();
}

/* =========================
   MODAL CLOSE
========================= */
closeBtn.onclick = () => {
  modal.style.display = "none";
};

modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

/* START */
renderGallery();
