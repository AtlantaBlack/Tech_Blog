const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// post a new comment
router.post("/", withAuth, async (req, res) => {
	try {

		console.log(`\n---COMMENT ROUTE: POST NEW COMMENT`);
		console.log(req.body);
		console.log("\nHere is req.session:", req.session.user_id, "\n");

		const { commentContent, postId } = req.body;

		const userId = req.session.user_id;

		const newComment = await Comment.create({
			comment_content: commentContent,
			post_id: postId,
			user_id: userId
		});

		console.log(`\n---COMMENT ROUTE: NEW COMMENT`);
		console.log(newComment);

		res.status(200).json(newComment);
	} catch (error) {
    console.log(`\n----COMMENT ROUTE: POST NEW COMMENT ERR`);
		console.log(error);
		res.status(500).json(error);
	}
});

module.exports = router;
