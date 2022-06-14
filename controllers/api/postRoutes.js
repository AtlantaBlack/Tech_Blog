const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all blog posts
router.get("/", async (req, res) => {
	try {
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
router.post("/", async (req, res) => {
	try {
		console.log(`\n---POST ROUTE: POST NEW BLOG`);
		console.log(req.body);

		const { postTitle, postContent } = req.body;

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
			post_title: postTitle,
			post_content: postContent,
			user_id: req.session.user_id
		});

		// console.log(`\n---POST ROUTE: NEW POST DATA`);
		// console.log(newPost);

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
	} catch (error) {
		console.log(`\n---HOME ROUTE: UPDATE POST ID ERROR`);
		console.log(error);
		res.status(500).json(error);
	}
});

// router.put("/:id", withAuth, async (req, res) => {
// 	try {
// 		console.log(req.body);
// 	} catch (error) {
// 		console.log(`\n----POST ROUTE: UPDATE POST ERROR`);
// 		console.log(error);
// 		res.status(500).json(error);
// 	}
// });

module.exports = router;
