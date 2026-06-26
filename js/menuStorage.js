const STORAGE_KEY = "menuItems";

// Initialize menu
function initMenu(){
    localStorage.setItem("menu", JSON.stringify(menuItems));
}

// Get menu
function getMenu(){
    return JSON.parse(localStorage.getItem("menu")) || [];
}

// Save menu
function saveMenu(updatedMenu) {

    // Keep localStorage as backup
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMenu));

    // Save to Firebase
    db.ref("menuItems").set(updatedMenu)
        .then(() => {
            console.log("✅ Menu saved to Firebase");
        })
        .catch((error) => {
            console.error("❌ Firebase Error:", error);
        });
}