// Default users (only created once)
const defaultUsers = [
    { username: "admin", password: "1234", role: "manager" },
    { username: "cook1", password: "1234", role: "cook" },
    { username: "waiter1", password: "1234", role: "waiter" }
];

// Initialize users in localStorage
function initUsers() {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
}

initUsers();

// Login function   
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const users = JSON.parse(localStorage.getItem("users"));

    console.log("INPUT:", username, password, role);
    console.log("STORED USERS:", users);

    const user = users.find(u =>
        u.username === username &&
        u.password === password &&
        u.role === role
    );

    console.log("FOUND USER:", user);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));

        if (role === "manager") {
            window.location.href = "pages/manager.html";
        } else if (role === "cook") {
            window.location.href = "pages/cook.html";
        } else {
            window.location.href = "pages/waiter.html";
        }
    } else {
        alert("Invalid login credentials!");
    }
}