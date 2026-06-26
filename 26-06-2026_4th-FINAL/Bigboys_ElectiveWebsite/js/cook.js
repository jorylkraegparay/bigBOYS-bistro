let firebaseOrders = [];

function getOrders() {
    return firebaseOrders;
}
function saveOrders(orders) {

    localStorage.setItem("orders", JSON.stringify(orders));

    return db.ref("orders").set(orders);

}
// track which card is expanded
let activeIndex = null;

// =======================
// RENDER BOTH COLUMNS
// =======================
function renderCook() {
    const incomingDiv = document.getElementById("incomingOrders");
    const cookingDiv = document.getElementById("cookingOrders");

    incomingDiv.innerHTML = "";
    cookingDiv.innerHTML = "";

    let orders = getOrders();

    if (orders.length === 0) {
        incomingDiv.innerHTML = "<p>No pending orders</p>";
        cookingDiv.innerHTML = "<p>No cooking orders</p>";
        return;
    }

    orders.forEach((order, index) => {

        let itemsHTML = "";
        order.items.forEach(item => {
            itemsHTML += `<p>${item.name} x${item.qty}</p>`;
        });

        // 🔥 ACTION PANEL
        let actionPanel = "";

        if (activeIndex === index) {
            if (order.status === "pending") {
                actionPanel = `
                    <div class="action-panel">
                        <button onclick="startCooking(${index})">Start Cooking</button>
                        <button onclick="cancelOrder(${index})">Cancel</button>
                    </div>
                `;
            } else if (order.status === "cooking") {
                actionPanel = `
                    <div class="action-panel">
                        <button onclick="completeOrder(${index})">Done</button>
                        <button onclick="returnToIncoming(${index})">Return</button>
                        <button onclick="cancelOrder(${index})">Cancel</button>
                    </div>
                `;
            }
        }

        const card = `
            <div class="order-card clickable" onclick="toggleActions(${index})">
                <h3>Order #${order.id}</h3>
                <div class="order-items">${itemsHTML}</div>
                ${actionPanel}
            </div>
        `;

        if (order.status === "pending") {
            incomingDiv.innerHTML += card;
        } else if (order.status === "cooking") {
            cookingDiv.innerHTML += card;
        }
    });
}

// =======================
// TOGGLE ACTION PANEL
// =======================
function toggleActions(index) {
    activeIndex = activeIndex === index ? null : index;
    renderCook();
}

// =======================
// MOVE TO COOKING
// =======================
function startCooking(index) {

    let orders = getOrders();

    orders[index].status = "cooking";

    saveOrders(orders).then(() => {

        db.ref("notifications/orderCooking").set({
            time: Date.now(),
            orderId: orders[index].id
        });

        activeIndex = null;

        renderCook();

    });

}
// =======================
// RETURN TO INCOMING
// =======================
function returnToIncoming(index) {
    let orders = getOrders();
    orders[index].status = "pending";
    saveOrders(orders);

    activeIndex = null;
    renderCook();
}

// =======================
// COMPLETE ORDER
// =======================
function completeOrder(index) {

    let orders = getOrders();

    const completedOrder = orders[index];

    // Remove the completed order
    orders.splice(index, 1);

    saveOrders(orders).then(() => {

        // 🔥 Notify waiter that the order is ready
        db.ref("notifications/orderReady").set({
            time: Date.now(),
            orderId: completedOrder.id
        });

        activeIndex = null;

        renderCook();

    });

}

// =======================
// CANCEL ORDER
// =======================
function cancelOrder(index) {
    let orders = getOrders();

    if (!confirm(`Cancel Order #${orders[index].id}?`)) return;

    orders.splice(index, 1);
    saveOrders(orders);

    activeIndex = null;
    renderCook();
}
// =======================
// LIVE SYNC
// =======================
window.addEventListener("storage", (e) => {
    if (e.key === "orders") {
        renderCook();
    }
});

// =======================
// FIREBASE LIVE SYNC
// =======================
db.ref("orders").on("value", (snapshot) => {

    firebaseOrders = snapshot.val() || [];

    console.log("🔥 Orders updated from Firebase");

    renderCook();

});