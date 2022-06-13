const sequelize = require("../config/connection");
const { Comment } = require("../models");

const commentData = [
	{
		comment_content: "wow so latin",
		user_id: 3,
		post_id: 1
	},
	{
		comment_content: "i understand this perfectly",
		user_id: 2,
		post_id: 1
	},
	{
		comment_content: "did you know that designers use this everywhere?",
		user_id: 1,
		post_id: 2
	}
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
