const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = postData.map(post => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/post/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    const postData = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
        { model: Comment }
      ]
    });

    const selectedPost = postData.get({ plain: true });

    // const commentData = await Comment.findAll({
    //   where: {
    //     post_id: postId
    //   }
    // });

    // const postComments = commentData.map(comment => comment.get({ plain: true }));

    console.log(`\n---HOME ROUTE: SELECTED POST`);
    console.log(selectedPost);

    // console.log(`\n---HOME ROUTE: ASSOCIATED COMMENTS`);
    // console.log(postComments);

    res.render('post', {
      selectedPost
    });

  } catch (error) {
    console.log(`\n---HOME ROUTE: POST ID ERROR`);
    console.log(error);
    res.status(500).json(error);
  }
});


router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // console.log(`\n---HOME ROUTE: REQ SESSION`);
    // console.log(req.session);
    // console.log(req.session.user_id);


    const userData = await User.findByPk(req.session.user_id, {
      include: [
        { model: Post },
        { model: Comment }
      ]
    });

    const user = userData.get({ plain: true });

    // console.log(`\n---HOME ROUTE: USER`);
    // console.log(user);

    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in
    });

  } catch (error) {
    // console.log(`\n----HOME ROUTE: ERROR:`);
    // console.log(error);
    res.status(500).json(error);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

module.exports = router;