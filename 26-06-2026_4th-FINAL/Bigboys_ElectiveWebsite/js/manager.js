let currentMenu = [];
let selectedIndex = null;
let activeCategory = "all";

// INIT
loadMenu();
applyFilters();

console.log("MENU DATA:", currentMenu);

// INITIAL RENDER
applyFilters();

function loadMenu() {
    let stored = JSON.parse(localStorage.getItem("menuItems"));

    if (!stored || stored.length === 0) {
        console.warn("⚠️ No saved menu, using default menuItems");
        stored = typeof menuItems !== "undefined" ? menuItems : [];

        localStorage.setItem("menuItems", JSON.stringify(stored));
    }

    currentMenu = stored;
}

// =======================
// RENDER MENU
// =======================
function renderMenu(menu) {
    const grid = document.getElementById("menuGrid");
    grid.innerHTML = "";

    menu.forEach((item) => {
        const card = document.createElement("div");
        card.className = "food-card";

        card.innerHTML = `
            <img src="${item.image}">
            <h3>${item.name}</h3>
            <p class="price-rating">₱${item.price} • ⭐${item.rating}</p>

            <div class="tags">
                ${item.tags?.map(tag => `<span class="tag" data-tag="${tag}">${tag}</span>`).join("") || ""}
            </div>
        `;

        // IMPORTANT: use ID instead of indexOf
        card.onclick = () => selectFood(item.id);

        grid.appendChild(card);
    });
}

// =======================
// SELECT FOOD
// =======================
function selectFood(id) {
    selectedIndex = currentMenu.findIndex(item => item.id === id);
    const item = currentMenu[selectedIndex];

    if (!item) return;

    // show panel
    document.getElementById("emptyState").style.display = "none";
    document.getElementById("editorPanel").style.display = "block";

    // fill fields
    document.getElementById("foodImage").src = item.image;
    document.getElementById("foodName").value = item.name;
    document.getElementById("foodPrice").value = item.price;
    document.getElementById("foodRating").value = item.rating || 0;

    // reset tag buttons
    document.querySelectorAll(".tag-controls button")
        .forEach(btn => btn.classList.remove("active"));

    // activate tags
    (item.tags || []).forEach(tag => {
        const btn = [...document.querySelectorAll(".tag-controls button")]
            .find(b => b.textContent === tag);

        if (btn) btn.classList.add("active");
    });
}

// =======================
// TOGGLE TAG
// =======================
function toggleTag(button, tag) {
    if (selectedIndex === null) return;

    let item = currentMenu[selectedIndex];
    item.tags = item.tags || [];

    if (item.tags.includes(tag)) {
        item.tags = item.tags.filter(t => t !== tag);
        button.classList.remove("active");
    } else {
        item.tags.push(tag);
        button.classList.add("active");
    }
}

function saveMenu(menu) {

    // Save locally
    localStorage.setItem("menuItems", JSON.stringify(menu));

    // Save to Firebase
    db.ref("menuItems").set(menu)
        .then(() => {
            console.log("✅ Menu saved to Firebase");
        })
        .catch((error) => {
            console.error("❌ Firebase Error:", error);
        });

}

// =======================
// SAVE FOOD
// =======================
function saveFood() {
    if (selectedIndex === null) return;

    const item = currentMenu[selectedIndex];

    item.name = document.getElementById("foodName").value;
    item.price = parseFloat(document.getElementById("foodPrice").value);
    item.rating = parseFloat(document.getElementById("foodRating").value);

    saveMenu(currentMenu);

    applyFilters();
}

// =======================
// CANCEL EDIT
// =======================
function cancelEdit() {
    selectedIndex = null;

    document.getElementById("editorPanel").style.display = "none";
    document.getElementById("emptyState").style.display = "block";
}

// =======================
// CATEGORY FILTER
// =======================
function filterMenu(category, btn) {
    activeCategory = category;

    document.querySelectorAll(".categories button")
        .forEach(b => b.classList.remove("active"));

    if (btn) btn.classList.add("active");

    applyFilters();
}

// =======================
// SEARCH
// =======================
function searchFood() {
    applyFilters();
}

// =======================
// APPLY FILTERS (SAFE)
// =======================
function applyFilters() {
    let filtered = [...currentMenu];

    // SEARCH
    const searchInput = document.getElementById("searchInput");
    const keyword = searchInput ? searchInput.value.toLowerCase() : "";

    if (keyword) {
        filtered = filtered.filter(item =>
            item.name.toLowerCase().includes(keyword)
        );
    }

    // CATEGORY
    if (activeCategory !== "all") {
        filtered = filtered.filter(item => item.category === activeCategory);
    }

    // SORT (SAFE)
    const sortSelect = document.getElementById("sortSelect");
    const sortType = sortSelect ? sortSelect.value : "default";

    if (sortType === "high") {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortType === "low") {
        filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    }

    renderMenu(filtered);
}

// =======================
// DEFAULT ACTIVE BUTTON
// =======================
window.onload = () => {
    const firstBtn = document.querySelector(".categories button");
    if (firstBtn) firstBtn.classList.add("active");
    
};

// =======================
// SHOW LOGGED USER
// =======================
function loadUser() {
    const userData = localStorage.getItem("currentUser");

    if (!userData) return;

    const user = JSON.parse(userData);

    const welcomeText = document.getElementById("welcomeUser");

    if (welcomeText) {
        welcomeText.textContent = `— Welcome, ${user.username}!`;
    }
}

window.addEventListener("storage", (e) => {
    if (e.key === "menuItems") {
        console.log("🔄 Menu updated!");
        loadMenu();
        applyFilters();
    }
});

loadUser();