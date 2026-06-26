const menuItems = [
    /*
    ========================
        Rice & Platters     
    ========================
    */
    {
        id: 1,
        name: "BB Original Chicken",
        price: 100,
        rating: 4.7,
        tags: ["Most Popular"],
        category: "riceAndPlatters",
        image: "../FoodMenu/BB Orginal Chicken.png"
    },

    {
        id: 2,
        name: "BB Spicy Chicken",
        price: 120,
        rating: 4.5,
        tags: ["Spicy"],
        category: "riceAndPlatters",
        image: "../FoodMenu/BB Spicy Chicken.png"
    },

    {
        id: 3,
        name: "BB Butter Chicken",
        price: 120,
        rating: 4.5,
        tags: ["Most Popular", "New"],
        category: "riceAndPlatters",
        image: "../FoodMenu/BB Butter Chicken.png"
    },

    {
        id: 4,
        name: "BB Teriyaki Chicken",
        price: 120,
        rating: 4.5,
        tags: ["Most Popular"],
        category: "riceAndPlatters",
        image: "../FoodMenu/BB Teriyaki Chicken.png"
    },

    {
        id: 5,
        name: "BB Biryani Chicken",
        price: 120,
        rating: 4.5,
        tags: ["Spicy"],
        category: "riceAndPlatters",
        image: "../FoodMenu/BB Biryani Chicken.png"
    },

    /*
    ========================
        Fries & Extras
    ========================
    */
    {
        id: 6,
        name: "Classic Fries (Small)",
        price: 50,
        rating: 4.1,
        tags: ["New"],
        category: "friesAndExtra",
        image: "../FoodMenu/BB Small Fries.png"
    },

    {
        id: 7,
        name: "Classic Fries (Medium)",
        price: 60,
        rating: 4.3,
        tags: ["New"],
        category: "friesAndExtra",
        image: "../FoodMenu/BB Medium Fries.png"
    },

    {
        id: 8,
        name: "Classic Fries (Large)",
        price: 70,
        rating: 4.5,
        tags: ["New", "Most Popular"],
        category: "friesAndExtra",
        image: "../FoodMenu/BB Large Fries.png"
    },

    {
        id: 9,
        name: "BB Chicken Wings (4pcs)",
        price: 120,
        rating: 4.7,
        tags: ["Most Popular"],
        category: "friesAndExtra",
        image: "../FoodMenu/BB Chicken Wings(4pcs).png"
    },

    {
        id: 10,
        name: "BB Mozarella Bars (4pcs)",
        price: 120,
        rating: 4.9,
        tags: ["Most Popular"],
        category: "friesAndExtra",
        image: "../FoodMenu/BB Mozarella Sticks(4pcs).png"
    },

    {
        id: 11,
        name: "Extra Gravy",
        price: 5,
        rating: 1.2,
        tags: ["Most Popular"],
        category: "friesAndExtra",
        image: "../FoodMenu/BB Gravy.png"
    },

    {
        id: 12,
        name: "Extra Sriracha",
        price: 5,
        rating: 3.3,
        tags: ["Most Popular"],
        category: "friesAndExtra",
        image: "../FoodMenu/BB Siracha.png"
    },

    {
        id: 13,
        name: "Extra Sour Cream",
        price: 5,
        rating: 2.8,
        tags: ["Most Popular"],
        category: "friesAndExtra",
        image: "../FoodMenu/BB Sour Cream.png"
    },

    {
        id: 14,
        name: "Extra BBQ",
        price: 5,
        rating: 4.1,
        tags: ["Most Popular"],
        category: "friesAndExtra",
        image: "../FoodMenu/BB BBQ.png"
    },

    {
        id: 15,
        name: "Extra Ketchup",
        price: 5,
        rating: 4.2,
        tags: ["Most Popular"],
        category: "friesAndExtra",
        image: "../FoodMenu/BB Ketchup.png"
    },

    /*
    ========================
        Drinks & Desserts
    ========================
    */
    {
        id: 16,
        name: "BB Vanilla Milkshake",
        price: 65,
        rating: 4.6,
        tags: ["Most Popular"],
        category: "drinksAndDesserts",
        image: "../FoodMenu/BB Vanilla Milkshake.png"
    },

    {
        id: 17,
        name: "BB Choco Milkshake",
        price: 65,
        rating: 4.7,
        tags: ["Best Seller", "New"],
        category: "drinksAndDesserts",
        image: "../FoodMenu/BB Choco Milkshake.png"
    },

    {
        id: 18,
        name: "BB Iced Tea",
        price: 45,
        rating: 4.1,
        tags: ["Best Seller"],
        category: "drinksAndDesserts",
        image: "../FoodMenu/BB Iced Tea.png"
    },

    {
        id: 19,
        name: "Can of Coke",
        price: 35,
        rating: 4.8,
        tags: ["Most Popular"],
        category: "drinksAndDesserts",
        image: "../FoodMenu/BB Canned Coke.png"
    },

    {
        id: 20,
        name: "Can of Sprite",
        price: 35,
        rating: 4.6,
        tags: ["Most Popular"],
        category: "drinksAndDesserts",
        image: "../FoodMenu/BB Canned Sprite.png"
    },

    {
        id: 21,
        name: "Can of Royal",
        price: 35,
        rating: 4.5,
        tags: ["Most Popular", "New"],
        category: "drinksAndDesserts",
        image: "../FoodMenu/BB Canned Royal.png"
    },    

    {
        id: 22,
        name: "Bottled Water",
        price: 35,
        rating: 4.9,
        tags: ["Most Popular"],
        category: "drinksAndDesserts",
        image: "../FoodMenu/BB Bottled Water.png"
    },

    {
        id: 23,
        name: "Ice Cream (Small)",
        price: 25,
        rating: 4.2,
        tags: ["Most Popular", "Healthy"],
        category: "drinksAndDesserts",
        image: "../FoodMenu/BB Ice Cream Small.png"
    },
    
    {
        id: 24,
        name: "Ice Cream (Medium)",
        price: 35,
        rating: 4.1,
        tags: ["Most Popular", "Healthy"],
        category: "drinksAndDesserts",
        image: "../FoodMenu/BB Ice Cream Medium.png"
    },

    {
        id: 25,
        name: "Ice Cream (Large)",
        price: 45,
        rating: 4.9,
        tags: ["Most Popular", "Healthy"],
        category: "drinksAndDesserts",
        image: "../FoodMenu/BB Ice Cream Large.png"
    },

    /*
    ========================
        Student Meals
    ========================
    */
    {
        id: 26,
        name: "Student Chicken Bowl",
        price: 45,
        rating: 2.1,
        tags: ["Most Popular"],
        category: "studentMeals",
        image: "../FoodMenu/BB Student Chicken Bowl.png"
    },

    {
        id: 27,
        name: "Student Beef Bowl",
        price: 45,
        rating: 3.9,
        tags: ["Best Seller"],
        category: "studentMeals",
        image: "../FoodMenu/BB Student Beef Bowl.png"
    },

    {
        id: 28,
        name: "Student Spicy Wings",
        price: 45,
        rating: 4.2,
        tags: ["Spicy"],
        category: "studentMeals",
        image: "../FoodMenu/BB Student Spicy Chicken Wing.png"
    },    

    {
        id: 29,
        name: "Student Veggie Bowl",
        price: 45,
        rating: 4.7,
        tags: ["Vegetarian"],
        category: "studentMeals",
        image: "../FoodMenu/BB Student Veggie Bowl.png"
    },  

    {
        id: 30,
        name: "Student Carb Bowl",
        price: 45,
        rating: 4.7,
        tags: ["Healthy"],
        category: "studentMeals",
        image: "../FoodMenu/BB Student Carb Bowl.png"
    },  

];

// ✅ SAVE MENU TO LOCALSTORAGE (ONLY ONCE)
if (!localStorage.getItem("menuStorage")) {
    localStorage.setItem("menuStorage", JSON.stringify(menuItems));
    console.log("✅ Menu saved to localStorage");
} else {
    console.log("ℹ️ Menu already exists in localStorage");
}