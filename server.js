require('dotenv').config();

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// FOR TESTING API CALLS
const { User, Post } = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  res.render('dashboard');
})

// TESTING RESPONSES RECEIVED
app.get('/api/users', async (req, res) => {
  try {
    const userData = await User.findAll({
      // attributes: {
      //   exclude: ['password']
      // },
      include: { model: Post }
    });

    res.status(200).send(userData);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: {
        model: User
      }
    });

    res.status(200).send(postData);
  } catch (error) {
    res.status(500).send(error);
  }
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App now listening on port ${PORT}`));
});