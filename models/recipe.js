const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
      text: {
        type: String,
        required: true
      },
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
  );


const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  steps: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [commentSchema],

  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Normal', 'Hard'],
  }
});

router.put('/:recipeId/comments/:commentId', async (req, res) => {
    try {
      const recipe = await recipe.findById(req.params.recipeId);
      const comment = recipe.comments.id(req.params.commentId);
      comment.text = req.body.text;
      await recipe.save();
      res.status(200).json({ message: 'Ok' });
    } catch (err) {
      res.status(500).json(err);
    }
  });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;