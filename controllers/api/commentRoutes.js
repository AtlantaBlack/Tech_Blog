const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// post a new comment
router.post("/", withAuth, async (req, res) => {
	try {
		// get contents out of req.body
		const { commentContent, postId } = req.body;
		// get user id
		const userId = req.session.user_id;

		// make new comment
		const newComment = await Comment.create({
			comment_content: commentContent,
			post_id: postId,
			user_id: userId
		});

		res.status(200).json(newComment);
	} catch (error) {
		console.log(`\n----COMMENT ROUTE: POST NEW COMMENT ERR`);
		console.log(error);
		res.status(500).json(error);
	}
});

//update a comment
router.put("/:id", withAuth, async (req, res) => {
	try {
		// get comment id
		const commentId = req.params.id;
		// get contents out of req.body
		const { updatedCommentContent } = req.body;

		// update the comment
		const updatedComment = await Comment.update(
			{
				comment_content: updatedCommentContent
			},
			{
				where: {
					id: commentId
				}
			}
		);

		res.status(200).json(updatedComment);
	} catch (error) {
		console.log(`\n---COMMENT ROUTE: UPDATE COMMENT ID ERROR`);
		console.log(error);
		res.status(500).json(error);
	}
});

// delete a comment
router.delete("/:id", withAuth, async (req, res) => {
	try {
		// get comment id
		const commentId = req.params.id;

		// delete the comment
		const deletedComment = await Comment.destroy({
			where: {
				id: commentId
			}
		});

		res.status(200).json(deletedComment);
	} catch (error) {
		console.log(`\n---COMMENT ROUTE: DELETE COMMENT ID ERROR`);
		console.log(error);
		res.status(500).json(error);
	}
});

module.exports = router;
