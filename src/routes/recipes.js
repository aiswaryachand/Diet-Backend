import express, { response } from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
// import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Create a new recipe
router.post("/",  async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  }catch(err) {
    res.json(err);
  }
});

    // _id: new mongoose.Types.ObjectId(),
    // name: req.body.name,
    // image: req.body.image,
    // ingredients: req.body.ingredients,
    // instructions: req.body.instructions,
    // imageUrl: req.body.imageUrl,
    // cookingTime: req.body.cookingTime,
    // userOwner: req.body.userOwner,
  // });
//    console.log(recipe);

 
        // name: result.name,
        // image: result.image,
        // ingredients: result.ingredients,
        // instructions: result.instructions,
        // _id: result._id,
  

// // Get a recipe by ID
// router.get("/:recipeId", async (req, res) => {
//   try {
//     const result = await RecipesModel.findById(req.params.recipeId);
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Save a Recipe
router.put("/", async (req, res) => {
  try {
  const recipe = await RecipeModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

// Get id of saved recipes
router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

// Get saved recipes
router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });

    console.log(savedRecipes);
    res.json({ savedRecipes});
  } catch (err) {    
    res.json(err);
  }
});

export { router as recipesRouter };