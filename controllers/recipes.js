const express = require('express')
const verifyToken = require('../middleware/verify-token')
const Recipe = require('../models/recipe')  
const { model } = require('mongoose')
const router = express.Router()

// ========= Public Routes ===========

// ======= Protected Routes ========== 
router.use(verifyToken)

// CREATE RECIPE
router.post('/', async (req, res) => {
    try {
        req.body.author = req.user._id
        const recipe = await Recipe.create(req.body)
        recipe._doc.author = req.user  // Adding user data to the recipe object
        res.status(201).json(recipe)
    } catch (error) {
        res.status(500).json(error)
    }
})

// INDEX - GET ALL RECIPES
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find({}).populate('author').sort({ createdAt: 'desc' })
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json(error)
    }
})

// SHOW - GET ONE RESIPE
router.get('/:recipesId', async (req, res) => {
    try {
      const recipes = await Recipe.findById(req.params.recipesId).populate('author');
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json(error);
    }
  })



module.exports = router;