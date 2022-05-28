const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = [
  {
    "username": "sallymae",
    "email": "sally@email.com",
    "password": "abc123"
  },
  {
    "username": "gronk",
    "email": "gronk@email.com",
    "password": "abc123"
  },
  {
    "username": "gertrude",
    "email": "gertrude@email.com",
    "password": "abc123"
  }
];

const seedUsers = async () => {
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  });
};

module.exports = seedUsers;