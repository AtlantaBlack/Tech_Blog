const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { model: User },
        { model: Comment }
      ]
    });

    res.status(200).send(postData);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;