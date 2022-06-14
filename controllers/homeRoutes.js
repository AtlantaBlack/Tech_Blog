const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// render the homepage
router.get("/", async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [
				{
					model: User,
					attributes: ["username"]
				}
			]
		});

		// console.log(`\n---HOME ROUTE: ALL POSTS DATA`);
		// console.log(postData);

		const posts = postData.map((post) => post.get({ plain: true }));

		// const host = req.session.user_id;

		// console.log(`\n---HOME ROUTE: ALL POSTS (mapped) DATA`);
		// console.log(posts);

		res.render("homepage", {
			posts,
			logged_in: req.session.logged_in
		});
	} catch (error) {
		console.log(`\n---HOME ROUTE: GET ROOT ERR`);
		console.log(error);
		res.status(500).json(error);
	}
});

router.get("/post/:id", async (req, res) => {
	try {
		const host = req.session.user_id;

		const postId = req.params.id;

		const postData = await Post.findByPk(postId, {
			include: [
				{
					model: User,
					attributes: ["username"]
				}
			]
		});

		const commentData = await Comment.findAll({
			where: {
				post_id: postId
			},
			include: {
				model: User,
				attributes: ["username"]
			}
		});

		const selectedPost = postData.get({ plain: true });

		const postComments = commentData.map((comment) =>
			comment.get({ plain: true })
		);

		const userData = await User.findByPk(req.session.user_id, {
			include: [{ model: Post }, { model: Comment }]
		});

		const user = userData.get({ plain: true });

		// console.log(`\n---HOME ROUTE: SELECTED POST`);
		// console.log(selectedPost);

		// console.log(`\n---HOME ROUTE: COMMENTS`);
		// console.log(postComments);

		res.render("post", {
			...user,
			...selectedPost,
			postComments,
			host,
			logged_in: req.session.logged_in
		});
	} catch (error) {
		console.log(`\n---HOME ROUTE: POST ID ERROR`);
		console.log(error);
		res.status(500).json(error);
	}
});

router.get("/dashboard", withAuth, async (req, res) => {
	try {
		// console.log(`\n---HOME ROUTE: REQ SESSION`);
		// console.log(req.session);
		// console.log(req.session.user_id);

		const dashboardFlag = true;

		const host = req.session.user_id;

		console.log("\n---HOST");
		console.log(host);

		const userData = await User.findByPk(req.session.user_id, {
			include: [{ model: Post }, { model: Comment }]
		});

		const user = userData.get({ plain: true });

		console.log(`\n---HOME ROUTE: USER`);
		console.log(user);

		res.render("dashboard", {
			...user,
			dashboardFlag: dashboardFlag,
			host,
			logged_in: req.session.logged_in
		});
	} catch (error) {
		console.log(`\n----HOME ROUTE: DASHBOARD ERR`);
		console.log(error);
		res.status(500).json(error);
	}
});

router.get("/signup", (req, res) => {
	if (req.session.logged_in) {
		res.redirect("/dashboard");
		return;
	}
	res.render("signup");
});

router.get("/login", (req, res) => {
	if (req.session.logged_in) {
		res.redirect("/dashboard");
		return;
	}
	res.render("login");
});

module.exports = router;
