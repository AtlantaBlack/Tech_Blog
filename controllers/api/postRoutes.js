const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all blog posts
router.get("/", async (req, res) => {
	try {
		// find all posts
		const postData = await Post.findAll({
			include: [{ model: User }, { model: Comment }]
		});

		res.status(200).json(postData);
	} catch (error) {
		console.log(`\n---POST ROUTE: GET ALL POSTS ERR`);
		console.log(error);
		res.status(500).json(error);
	}
});

// post a new blog post
router.post("/", withAuth, async (req, res) => {
	try {
		// get contents out of req.body
		const { postTitle, postContent } = req.body;

		// create new post
		const newPost = await Post.create({
			post_title: postTitle,
			post_content: postContent,
			user_id: req.session.user_id
		});

		res.status(200).json(newPost);
	} catch (error) {
		console.log(`\n---POST ROUTE: NEW POST ERR`);
		console.log(error);
		res.status(500).json(error);
	}
});

//update a blog post
router.put("/:id", withAuth, async (req, res) => {
	try {
		// get post id
		const postId = req.params.id;
		// get contents out of req.body
		const { updatedPostTitle, updatedPostContent } = req.body;

		// update the post
		const updatedPost = await Post.update(
			{
				post_title: updatedPostTitle,
				post_content: updatedPostContent
			},
			{
				where: {
					id: postId
				}
			}
		);

		res.status(200).json(updatedPost);
	} catch (error) {
		console.log(`\n---POST ROUTE: UPDATE POST ID ERROR`);
		console.log(error);
		res.status(500).json(error);
	}
});

// delete a blog post
router.delete("/:id", withAuth, async (req, res) => {
	try {
		// get post id
		const postId = req.params.id;

		// delete the post
		const deletedPost = await Post.destroy({
			where: {
				id: postId
			}
		});

		res.status(200).json(deletedPost);
	} catch (error) {
		console.log(`\n---POST ROUTE: DELETE POST ID ERROR`);
		console.log(error);
		res.status(500).json(error);
	}
});

module.exports = router;
