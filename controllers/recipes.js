const express = require("express");
const verifyToken = require("../middleware/verify-token");
const Recipe = require("../models/recipe");
const { model } = require("mongoose");
const router = express.Router();

// ========= Public Routes ===========

// ======= Protected Routes ==========
router.use(verifyToken);

// CREATE RECIPE
router.post("/", async (req, res) => {
  try {
    req.body.author = req.user._id;
    const recipe = await Recipe.create(req.body);
    recipe._doc.author = req.user; // Adding user data to the recipe object
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json(error);
  }
});

// INDEX - GET ALL RECIPES
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({})
      .populate("author")
      .sort({ createdAt: "desc" });
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(error);
  }
});

// SHOW - GET ONE RESIPE
router.get("/:recipeId", async (req, res) => {
  try {
    const recipes = await Recipe.findById(req.params.recipeId).populate(
      "author"
    );
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE A RECIPE
router.put("/:recipeId", async (req, res) => {
  try {
    // Find the recipe
    const recipe = await Recipe.findById(req.params.recipeId);

    // Check if user owns the recipe
    if (!recipe.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    // Update the recipe
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.recipeId,
      req.body,
      { new: true }
    );

    // Add the user object
    updatedRecipe._doc.author = req.user;

    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE A RECIPE
router.delete("/:recipeId", async (req, res) => {
  try {
    // Find the recipe
    const recipe = await Recipe.findById(req.params.recipeId);

    // Check if user owns the recipe
    if (!recipe.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    // Delete the recipe
    await Recipe.findByIdAndDelete(req.params.recipeId);

    res.status(204).json();
  } catch (error) {
    res.status(500).json(error);
  }
});

// create comment
router.post("/:recipeId/comments", async (req, res) => {
  try {
    req.body.author = req.user._id;
    const recipe = await Recipe.findById(req.params.recipeId);
    recipe.comments.push(req.body);
    await recipe.save();

    // Find the newly created comment:
    const newComment = recipe.comments[recipe.comments.length - 1];

    newComment._doc.author = req.user;

    // Respond with the newComment:
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update comment
router.put("/:recipeId/comments/:commentId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    const comment = recipe.comments.id(req.params.commentId);
    comment.text = req.body.text;
    comment.set(req.body);
    await recipe.save();
    res.status(200).json({ message: "Ok" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete comment
router.delete("/:recipeId/comments/:commentId", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeId);
    // Delete the comment
    recipe.comments.remove({ _id: req.params.commentId });
    await recipe.save();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
