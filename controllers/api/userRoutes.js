const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        { model: Post },
        { model: Comment }
      ]
    });

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;