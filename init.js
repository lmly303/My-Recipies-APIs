// it is used to insert some random data
const mongoose = require("mongoose");
const recipe = require("./models/recepie");

main()
.then(()=>{
    console.log("connection successful");
})
.catch((err) => {
    console.log(err.message);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/myrecipies');
}


let newrecipes = [
    {
        "name": "Vegetable Stir Fry",
        "description": "A quick and healthy stir-fry with fresh vegetables and a savory sauce.",
        "ingredients": ["Broccoli", "Bell Peppers", "Carrots", "Soy Sauce", "Garlic", "Ginger"],
        "imageUrl": "https://example.com/vegetable-stir-fry.jpg",
        "madeOn": "2024-08-25T14:00:00Z"
    },
    {
        "name": "Banana Pancakes",
        "description": "Fluffy pancakes made with ripe bananas and served with maple syrup.",
        "ingredients": ["Bananas", "Flour", "Milk", "Eggs", "Baking Powder", "Maple Syrup"],
        "imageUrl": "https://example.com/banana-pancakes.jpg",
        "madeOn": "2024-08-30T09:00:00Z"
    },
    {
        "name": "Chicken Tikka Masala",
        "description": "A popular Indian dish with marinated chicken chunks in a creamy spiced tomato sauce.",
        "ingredients": ["Chicken", "Yogurt", "Garlic", "Ginger", "Tomato Puree", "Garam Masala"],
        "imageUrl": "https://example.com/chicken-tikka-masala.jpg",
        "madeOn": "2024-09-02T12:00:00Z"
    },
    {
        "name": "Caprese Salad",
        "description": "A fresh and simple Italian salad with tomatoes, mozzarella, basil, and olive oil.",
        "ingredients": ["Tomatoes", "Fresh Mozzarella", "Basil Leaves", "Olive Oil", "Salt", "Balsamic Glaze"],
        "imageUrl": "https://example.com/caprese-salad.jpg",
        "madeOn": "2024-08-28T18:30:00Z"
    },
    {
        "name": "Beef Tacos",
        "description": "Tasty tacos filled with seasoned beef, lettuce, cheese, and salsa.",
        "ingredients": ["Ground Beef", "Taco Seasoning", "Tortillas", "Lettuce", "Cheddar Cheese", "Salsa"],
        "imageUrl": "https://example.com/beef-tacos.jpg",
        "madeOn": "2024-08-27T19:00:00Z"
    } 
];

recipe.insertMany(newrecipes);