const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        { model: User },
        { model: Comment }
      ]
    });

    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id
    });
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;