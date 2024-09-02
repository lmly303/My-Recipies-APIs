// Schema for the database is define here. 

const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name : {
        type : String,
        required:true
    },

    description : {
        type : String,
        required:true
    },

    ingredients : {
        type : [String],
        required:true
    },

    imageUrl : {
        type : String
    },
    
    madeOn : {
        type:Date,
    }
})

const recipe = mongoose.model("recipe", recipeSchema);

module.exports = recipe;