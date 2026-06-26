const firebaseConfig = {
    apiKey: "AIzaSyAgBbtHlBAut9zhb4OYTiKjVmN9RNy5vCw",
    authDomain: "bigboys-bistro.firebaseapp.com",
    databaseURL: "https://bigboys-bistro-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bigboys-bistro",
    storageBucket: "bigboys-bistro.firebasestorage.app",
    messagingSenderId: "494119258264",
    appId: "1:494119258264:web:a0151d4ae8fa9f2c8be8ed"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

console.log("🔥 Firebase Realtime Database Connected!");
