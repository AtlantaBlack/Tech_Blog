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

    // console.log(`\n---POST ROUTE: POST NEW BLOG`);
    // console.log(req.body);

    // const postAuthor = await User.findOne({
    //   where: {
    //     id: req.session.user_id
    //   }
    // });

    // console.log(`\n---POST ROUTE: POST AUTHOR`);
    // console.log(postAuthor);
    // console.log(postAuthor.username);

    // const { username } = postAuthor;

    // const { username } = await User.findOne({
    //   where: {
    //     id: req.session.user_id
    //   }
    // });

    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id
    });

    // console.log(`\n---POST ROUTE: NEW POST DATA`);
    // console.log(newPost);

    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;