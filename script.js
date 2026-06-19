// =========================
// FILTER SYSTEM
// =========================

const buttons = document.querySelectorAll(".filter-btn");
const folders = document.querySelectorAll(".folder");

buttons.forEach(button => {
  button.addEventListener("click", () => {

    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    folders.forEach(folder => {
      if (filter === "all" || folder.dataset.category === filter) {
        folder.style.display = "block";
      } else {
        folder.style.display = "none";
      }
    });

  });
});


// =========================
// OPEN FOLDER
// =========================

function openFolder(folderName) {
  window.location.href = `gallery.html?folder=${folderName}`;
}


// =========================
// TRASH COUNT
// =========================

function updateTrashCount() {
  let trash = JSON.parse(localStorage.getItem("trash")) || [];

  let el = document.getElementById("trashCount");
  if (el) {
    el.innerText = trash.length;
  }
}

updateTrashCount();
window.addEventListener("focus", updateTrashCount);


// =========================
// 🔒 PRIVATE VAULT SYSTEM
// =========================

function openVault() {
  let savedPin = localStorage.getItem("vaultPin");

  // First time PIN setup
  if (!savedPin) {
    let newPin = prompt("Set your Vault PIN:");
    if (!newPin) return;

    localStorage.setItem("vaultPin", newPin);
    alert("Vault Created 🔒");

    // optional continue to unlock
  }

  let enteredPin = prompt("Enter Vault PIN:");

  if (!enteredPin) {
    alert("Invalid PIN ❌");
    return;
  }

  if (enteredPin === localStorage.getItem("vaultPin")) {
    window.location.href = "vault.html";
  } else {
    alert("Wrong PIN ❌");
  }
}


// =========================
// VAULT STORAGE
// =========================

function saveToVault(imageData) {
  let vault = JSON.parse(localStorage.getItem("vault")) || [];

  vault.push(imageData);

  localStorage.setItem("vault", JSON.stringify(vault));
}


// get vault images
function getVaultData() {
  return JSON.parse(localStorage.getItem("vault")) || [];
}


// clear vault (future use)
function clearVault() {
  localStorage.removeItem("vault");
}


// move image to vault
function moveToVault(imageData) {
  let vault = JSON.parse(localStorage.getItem("vault")) || [];

  vault.push(imageData);

  localStorage.setItem("vault", JSON.stringify(vault));

  alert("Moved to Vault 🔒");
}
function changeVaultPin() {
  let current = localStorage.getItem("vaultPin");

  let entered = prompt("Enter current PIN:");

  if (entered !== current) {
    alert("Wrong PIN ❌");
    return;
  }

  let newPin = prompt("Enter new PIN:");

  if (!newPin || newPin.length < 3) {
    alert("Invalid PIN ❌");
    return;
  }

  localStorage.setItem("vaultPin", newPin);
  alert("PIN changed successfully 🔐");
}


function resetVaultPin() {
  let current = localStorage.getItem("vaultPin");

  if (!current) {
    alert("No PIN set ❌");
    return;
  }

  let entered = prompt("Enter current PIN to remove Vault lock:");

  if (entered !== current) {
    alert("Wrong PIN ❌");
    return;
  }

  let confirmReset = confirm("This will REMOVE Vault PIN completely. Continue?");

  if (!confirmReset) return;

  localStorage.removeItem("vaultPin");

  alert("Vault PIN removed 🧹 (Vault unlocked permanently)");
}
