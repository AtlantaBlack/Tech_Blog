const sequelize = require("../config/connection");
const { Comment } = require("../models");

const commentData = [
	{
		comment_content: "Very interesting.",
		user_id: 3,
		post_id: 1
	},
	{
		comment_content: "Cool content. I had never thought about that before.",
		user_id: 2,
		post_id: 1
	},
	{
		comment_content: "Neat!",
		user_id: 1,
		post_id: 4
	},
	{
		comment_content: "Definitely food for thought.",
		user_id: 3,
		post_id: 2
	}
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
