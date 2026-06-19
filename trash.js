const trashGrid = document.getElementById("trashGrid");

let images = JSON.parse(localStorage.getItem("images")) || {};

let trash = JSON.parse(localStorage.getItem("trash")) || [];

function saveData() {
  localStorage.setItem("images", JSON.stringify(images));
  localStorage.setItem("trash", JSON.stringify(trash));
}

function renderTrash() {
  trashGrid.innerHTML = "";

  if (trash.length === 0) {
    trashGrid.innerHTML = "<h3>Recycle Bin is empty</h3>";
    return;
  }

  trash.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("trash-card");

    div.innerHTML = `
      <img src="${item.img}" alt="Deleted Image">

      <div class="trash-actions">
        <button class="restore-btn">♻️</button>
        <button class="permanent-delete-btn">❌</button>
      </div>
    `;

    div.querySelector(".restore-btn").addEventListener("click", () => {
      if (!images[item.folder]) {
        images[item.folder] = [];
      }

      images[item.folder].push(item.img);

      trash.splice(index, 1);

      saveData();
      renderTrash();
    });

    div.querySelector(".permanent-delete-btn").addEventListener("click", () => {
      const confirmDelete = confirm(
        "Delete this image permanently?"
      );

      if (!confirmDelete) return;

      trash.splice(index, 1);

      saveData();
      renderTrash();
    });

    trashGrid.appendChild(div);
  });
}

renderTrash();