const express= require("express");
const app=express();
const mongoose = require("mongoose");
const path=require("path");
const recipe = require("./models/recepie");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


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


// Index route
app.get("/recipes", async (req,res) => {
    try {
        let recipes = await recipe.find();
        res.render("index.ejs" , {recipes}); 
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
})



//Add New Recipe route

app.get("/recipes/new", (req,res) => {
    try {
        res.render("new.ejs");
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }
     
})

//create route
app.post("/recipes", (req,res) => {
    let {name , description , ingredients , imageUrl , madeOn} = req.body;

    // Split ingredients by commas and trim each ingredient
    let ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());

    let newrecipe = new recipe({
        name : name,
        description : description,
        ingredients : ingredientsArray,
        imageUrl : imageUrl,
        madeOn : madeOn
    })

    newrecipe.save()
    .then((res)=>{
        console.log("new recipe is added");
        res.redirect("/recipes");
    })
    .catch((err) => {
        console.log(err);
    });

    console.log(newrecipe);
    
})




// edit route

app.get("/recipes/:id/edit", async (req,res)=>{

    let { id } = req.params;

    try {
        let rec = await recipe.findById(id);
        if (!rec) {
            return res.status(404).send("Recipe not found");
        }
        res.render("edit.ejs", { rec });
    } catch (err) {
        console.log("Error fetching recipe:", err);
        res.status(500).send("Error fetching recipe");
    }
});

//Update Route
app.put("/recipes/:id", async (req,res)=> {

    let { id } = req.params;
    let { name, description, ingredients, imageUrl } = req.body;

    // Spliting ingredients by commas and trim each ingredient
    let ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());

    try {
        let updatedRecipe = await recipe.findByIdAndUpdate(
            id,
            {
                name: name,
                description: description,
                ingredients: ingredientsArray,
                imageUrl: imageUrl,
            },
            { new: true } 
        );
        console.log("Recipe updated:", updatedRecipe);
        res.redirect("/recipes");
    } catch (err) {
        console.log("Error updating recipe:", err);
        res.status(500).json({ message: err.message });
    }
});




// Delete route

app.delete("/recipes/:id", async (req,res) =>{
    let { id } = req.params;
    
    try {
        let deletedRecipe = await recipe.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return res.status(404).send("Recipe not found");
        }
        console.log("Deleted recipe:", deletedRecipe);
        res.redirect("/recipes");
    } catch (err) {
        console.log("Error deleting recipe:", err);
        res.status(500).send("Error deleting recipe");
    }
});


app.get("/", (req,res)=>{
    res.send("welcome");
});

app.listen( 3000 ,()=>{
    console.log("app is listening");
});



// let recipe1 = new recipe({
//     "name": "Spaghetti Carbonara",
//     "description": "A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.",
//     "ingredients": ["Spaghetti", "Eggs", "Parmesan Cheese", "Pancetta", "Black Pepper"],
//     "imageUrl": "https://unsplash.com/photos/a-plate-of-pasta-and-a-glass-of-wine-on-a-table-mpp9ns6T414",
//     "madeOn": "2024-09-01"
// })

// recipe1.save()
// .then((res)=>{
//     console.log(res);
// })