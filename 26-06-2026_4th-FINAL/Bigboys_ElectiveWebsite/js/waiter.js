// AUTH
function checkAuth(requiredRole) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user || user.role !== requiredRole) {
        alert("Access denied!");
        window.location.href = "../index.html";
    }
}
checkAuth("waiter");

// WELCOME USER
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
document.getElementById("welcomeUser").innerText =
    currentUser ? `- Welcome ${currentUser.username}!` : "";

// ✅ LOAD MENU
let menu = [];

// Listen for menu updates from Firebase
db.ref("menuItems").on("value", (snapshot) => {

    const data = snapshot.val();

    if (data) {
        menu = Object.values(data);

        console.log("🔥 Menu updated from Firebase");

        applyFilters(); // Refresh the menu display
    }

});

// ✅ FALLBACK
if (!menu || menu.length === 0) {
    console.warn("⚠️ LocalStorage empty, using fallback menuItems");
    menu = typeof menuItems !== "undefined" ? menuItems : [];
}

console.log("PARSED MENU:", menu);

// STATE
let order = [];
let activeCategory = "all";
let sortMode = "default";

// 🔥 FORMAT ORDER ID (001, 002, etc.)
function formatOrderId(num) {
    return String(num).padStart(3, "0");
}

// 🔥 GET NEXT ORDER NUMBER
function getNextOrderNumber() {
    let counter = parseInt(localStorage.getItem("orderCounter")) || 0;
    counter++;
    localStorage.setItem("orderCounter", counter);
    return formatOrderId(counter);
}

// DISPLAY MENU
function displayMenu(items) {
    const grid = document.getElementById("menuGrid");
    grid.innerHTML = "";

    if (!items || items.length === 0) {
        grid.innerHTML = "<p>No food found</p>";
        return;
    }

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "food-card";

       card.innerHTML = `
    <img src="${item.image}">

    <div class="food-info">

        <h3>${item.name}</h3>

        <p class="price-rating">
            ₱${item.price} • ⭐${item.rating}
        </p>

        <div class="tags">
            ${item.tags?.map(tag =>
                `<span class="tag" data-tag="${tag}">${tag}</span>`
            ).join("")}
        </div>

        <button onclick="addToOrder(${item.id})">
            Add
        </button>

    </div>
`;

        grid.appendChild(card);
    });
}

// SEARCH
function searchFood() {
    applyFilters();
}

// FILTER CATEGORY
function filterMenu(category, btn) {
    activeCategory = category;

    document.querySelectorAll(".categories button")
        .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    applyFilters();
}

// APPLY FILTERS
function applyFilters() {
    let filtered = [...menu];

    const searchValue = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    

    // CATEGORY
    if (activeCategory !== "all") {
        filtered = filtered.filter(item =>
            item.category === activeCategory
        );
    }

    // SEARCH
    if (searchValue) {
        filtered = filtered.filter(item =>
            item.name.toLowerCase().includes(searchValue)
        );
    }

    // SORT
    // SORT
    if (sortMode === "high") {
        filtered.sort((a, b) => b.rating - a.rating);
    }
    else if (sortMode === "low") {
        filtered.sort((a, b) => a.rating - b.rating);
    }

    displayMenu(filtered);
}

// ADD TO ORDER
function addToOrder(id) {
    const item = menu.find(m => m.id == id);
    if (!item) return;

    const existing = order.find(o => o.id == id);

    if (existing) {
        existing.qty++;
    } else {
        order.push({ ...item, qty: 1 });
    }

    renderOrder();
}

// RENDER ORDER
function renderOrder() {
    const orderList = document.getElementById("orderList");
    const totalPrice = document.getElementById("totalPrice");
    const emptyState = document.getElementById("emptyState");

    orderList.innerHTML = "";

    if (order.length === 0) {

    emptyState.style.display = "flex";

    orderList.innerHTML = "";

    totalPrice.textContent = "Total: ₱0";

    return;
    }
    emptyState.style.display = "none";

    let total = 0;

    order.forEach((item, index) => {
        total += item.price * item.qty;

        orderList.innerHTML += `
            <div class="order-item">
                <div class="order-info">
                    <div class="order-top">
                        <span class="order-name">${item.name}</span>
                    </div>
                    <div class="order-price">₱${item.price}</div>
                </div>

                <div class="qty-controls">
                    <button class="qty-btn minus" onclick="changeQty(${index}, -1)">-</button>
                    <span class="qty-number">${item.qty}</span>
                    <button class="qty-btn plus" onclick="changeQty(${index}, 1)">+</button>
                </div>
            </div>
        `;
    });

    totalPrice.textContent = `Total: ₱${total}`;
}

function clearOrder() {
    if (order.length === 0) return;

    order = [];
    renderOrder();
}

// CHANGE QTY
function changeQty(index, change) {
    order[index].qty += change;

    if (order[index].qty <= 0) {
        order.splice(index, 1);
    }

    renderOrder();
}

// 🚀 PLACE ORDER (UPDATED)
function placeOrder() {

    if (order.length === 0) {
        alert("No items in order!");
        return;
    }

    const orderNumber = getNextOrderNumber();

    const newOrder = {
        id: orderNumber,
        items: order,
        total: order.reduce((sum, i) => sum + i.price * i.qty, 0),
        status: "pending"
    };

    // 🔥 Read current orders from Firebase
    db.ref("orders").once("value").then(snapshot => {

        let orders = snapshot.val() || [];

        orders.push(newOrder);

        // 🔥 Save updated orders back to Firebase
        db.ref("orders").set(orders);

        // Optional: keep localStorage for backup during migration
        localStorage.setItem("orders", JSON.stringify(orders));

        alert(`📩 Order #${orderNumber} is now sent into the kitchen!`);

        order = [];
        renderOrder();

    }).catch(error => {
        console.error("❌ Firebase Error:", error);
    });

}
function loadMenu() {
    menu = JSON.parse(localStorage.getItem("menuItems")) || [];
    displayMenu(menu);
}

// 🔥 MENU LIVE UPDATE
window.addEventListener("storage", (e) => {
    if (e.key === "menuItems") {
        console.log("🔄 Menu updated from manager!");
        loadMenu();
    }
});

// 🔥 ORDER COOKING ALERT
db.ref("notifications/orderCooking").on("value", (snapshot) => {

    const data = snapshot.val();

    if (!data) return;

    alert(`👨‍🍳 Order #${data.orderId} is in the kitchen!.`);

});

// 🔥 ORDER READY ALERT (WITH 001 FORMAT)
db.ref("notifications/orderReady").on("value", (snapshot) => {

    const data = snapshot.val();

    if (!data) return;

    alert(`✅ Order #${data.orderId} Now Serving!`);

});

function toggleSort(){

    const up = document.getElementById("upArrow");
    const down = document.getElementById("downArrow");

    if(sortMode === "default"){

        sortMode = "high";

        up.classList.add("active-arrow");
        down.classList.remove("active-arrow");

    }

    else if(sortMode === "high"){

        sortMode = "low";

        up.classList.remove("active-arrow");
        down.classList.add("active-arrow");

    }

    else{

        sortMode = "default";

        up.classList.remove("active-arrow");
        down.classList.remove("active-arrow");

    }

    applyFilters();
}

// INIT
document.querySelector(".categories button").classList.add("active");
displayMenu(menu);