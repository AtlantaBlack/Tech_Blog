const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        { model: Post },
        { model: Comment }
      ]
    });

    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;