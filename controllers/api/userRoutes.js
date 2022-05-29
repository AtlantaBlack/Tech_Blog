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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(`\n---EMAIL/PASSWORD`);
    console.log(email);
    console.log(password);

    const returningUser = await User.scope('withPassword').findOne({
      where: {
        email: email
      }
    });

    // console.log(`\n----RETURNING USER`);
    // console.log(returningUser);

    if (!returningUser) {
      return res.status(400).json({
        "message": "Incorrect email. Please try again."
      });
    }

    const userPassword = await returningUser.checkPassword(password);

    if (!userPassword) {
      return res.status(400).json({
        "message": "Incorrect password. Please try again."
      });
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      const { username } = returningUser;
      const welcomeMsg = `Welcome back, ${username}!`;
      res.status(200).json({
        "message": welcomeMsg
      });
    });

  } catch (error) {
    // console.log(`\n------ERROR:`);
    // console.log(error);
    res.status(500).json(error);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;