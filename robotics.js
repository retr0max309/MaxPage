// Swiper configurations
new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

new Swiper("#slider2", {
  freeMode: true,
  spaceBetween: 30,
  slidesPerView: "auto",
  scrollbar: {
    el: ".swiper-scrollbar",
    hide: false,
    draggable: true,
    snapOnRelease: false,
  },
});

new Swiper("#slider3", {
  freeMode: true,
  spaceBetween: 30,
  slidesPerView: "auto",
  scrollbar: {
    el: ".swiper-scrollbar-3",
    hide: false,
    draggable: true,
    snapOnRelease: false,
  },
});

new Swiper("#slider4", {
  freeMode: true,
  spaceBetween: 30,
  slidesPerView: "auto",
  scrollbar: {
    el: ".swiper-scrollbar-4",
    hide: false,
    draggable: true,
    snapOnRelease: false,
  },
});

new Swiper("#slider5", {
  freeMode: true,
  spaceBetween: 30,
  slidesPerView: "auto",
  scrollbar: {
    el: ".swiper-scrollbar-5",
    hide: false,
    draggable: true,
    snapOnRelease: false,
  },
});

// Search functionality
let inpSeach = false;

function openSearch() {
  if (!inpSeach) {
    document.getElementById("btnSearch").classList.add("d-none");
    document.getElementById("inpSearch").classList.remove("d-none");
    document.getElementById(
      "box-shadow"
    ).innerHTML = `<div style="z-index:0 !important" onclick="openSearch()" class="modal-backdrop fade show"></div>`;
    inpSeach = true;
  } else {
    document.getElementById("btnSearch").classList.remove("d-none");
    document.getElementById("inpSearch").classList.add("d-none");
    document.getElementById("box-shadow").innerHTML = "";
    inpSeach = false;
  }
}

let inpSeachRS = false;

function openSearchRS() {
  if (!inpSeachRS) {
    document.getElementById("btnSearchRS").classList.add("d-none");
    document.getElementById("inpSearchRS").classList.remove("d-none");
    document.getElementById(
      "box-shadow"
    ).innerHTML = `<div style="z-index:0 !important" onclick="openSearchRS()" class="modal-backdrop fade show"></div>`;
    inpSeachRS = true;
  } else {
    document.getElementById("btnSearchRS").classList.remove("d-none");
    document.getElementById("inpSearchRS").classList.add("d-none");
    document.getElementById("box-shadow").innerHTML = "";
    inpSeachRS = false;
  }
}

function closeTopbar() {
  let element = document.getElementById("topbar");

  if (!element.classList.contains("d-none")) {
    element.classList.add("d-none");
  }
}

function animateBars() {
  let bar_1 = document.querySelector(".icon-bar-1");
  let bar_2 = document.querySelector(".icon-bar-2");
  let bar_3 = document.querySelector(".icon-bar-3");

  bar_1.classList.toggle("icon-bar-1-active");
  bar_2.classList.toggle("icon-bar-2-active");
  bar_3.classList.toggle("icon-bar-3-active");
}

window.addEventListener("resize", () => {
  let element = document.getElementById("topbar");

  if (element.classList.contains("d-none")) {
    if (window.innerWidth >= 992) {
      element.classList.remove("d-none");
    }
  }
});

// Funciones para la barra lateral de favoritos
let favoriteSets = [];

// Añadir a favoritos
function addToFavorites(name, imageUrl) {
  const exists = favoriteSets.some((set) => set.name === name);

  if (!exists) {
    // Añadir el set al arreglo
    favoriteSets.push({ name, imageUrl });

    // Actualizar la barra lateral
    updateFavoriteSidebar();

    // Cambiar color del corazón a rojo
    const heartIcon = document.querySelector(
      `[onclick="addToFavorites('${name}', '${imageUrl}')"] ion-icon`
    );
    if (heartIcon) {
      heartIcon.setAttribute("name", "heart");
      heartIcon.style.color = "red";
    }
  } else {
    alert("Este set ya está en tus favoritos.");
  }
}

// Actualizar la barra lateral de favoritos
function updateFavoriteSidebar() {
  const sidebar = document.getElementById("favoriteItems");
  sidebar.innerHTML = ""; // Limpiar contenido anterior

  favoriteSets.forEach((set) => {
    const listItem = document.createElement("li");
    listItem.style.cssText =
      "display: flex; align-items: center; margin-bottom: 10px; padding: 10px; border-radius: 8px; background-color: #f9f9f9; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);";
    listItem.innerHTML = `
      <img src="${set.imageUrl}" alt="${set.name}" style="width: 50px; height: 50px; margin-right: 10px; border-radius: 4px;">
      <span style="flex-grow: 1; font-size: 1rem; color: #333;">${set.name}</span>
      <button onclick="removeFromFavorites('${set.name}')" style="background-color: #e74c3c; color: white; border: none; border-radius: 4px; padding: 5px 10px; cursor: pointer; transition: background 0.3s ease;">
        Remove
      </button>
    `;
    sidebar.appendChild(listItem);
  });
}

// Eliminar de favoritos
// Restaurar todos los corazones después de eliminar de favoritos
function removeFromFavorites(name) {
    // Filtrar y eliminar el set de la lista de favoritos
    favoriteSets = favoriteSets.filter(set => set.name !== name);
    updateFavoriteSidebar();
  
    // Actualizar estado de los corazones
    document.querySelectorAll('[onclick^="addToFavorites"]').forEach(button => {
      const setName = button.getAttribute('onclick').match(/addToFavorites\('(.*?)'/)[1];
      const icon = button.querySelector('ion-icon');
      if (!favoriteSets.some(set => set.name === setName)) {
        icon.setAttribute("name", "heart-outline");
        icon.style.color = "#1f7ebf"; // Color original
      }
    });
  }
  


// Función para abrir la barra lateral
function openSidebar() {
  document.getElementById("favoriteSidebar").classList.add("open");
}

// Función para cerrar la barra lateral
function closeSidebar() {
  document.getElementById("favoriteSidebar").classList.remove("open");
}
