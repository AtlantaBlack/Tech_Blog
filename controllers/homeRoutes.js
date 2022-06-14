const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// render the homepage
router.get("/", async (req, res) => {
	try {
		// get all posts
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

		// map posts
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

// render page to view single post and its comments
router.get("/post/:id", async (req, res) => {
	try {
		// get post id
		const postId = req.params.id;
		// get post data
		const postData = await Post.findByPk(postId, {
			include: [
				{
					model: User,
					attributes: ["username"]
				}
			]
		});
		// get associated comment data
		const commentData = await Comment.findAll({
			where: {
				post_id: postId
			},
			include: {
				model: User,
				attributes: ["username"]
			}
		});
		// map the selected post
		const selectedPost = postData.get({ plain: true });
		// map the post's comments
		const postComments = commentData.map((comment) =>
			comment.get({ plain: true })
		);

		// get the host of the session (ie logged-in user)
		const host = req.session.user_id;
		// get their user data
		const userData = await User.findByPk(req.session.user_id, {
			include: [{ model: Post }, { model: Comment }]
		});

		// if there's user data available (ie. user is logged in)
		if (userData) {
			const user = userData.get({ plain: true });

			// console.log(`\n---HOME ROUTE: SELECTED POST`);
			// console.log(selectedPost);

			// console.log(`\n---HOME ROUTE: COMMENTS`);
			// console.log(postComments);

			res.render("post", {
				...user, // send user info to hbs
				...selectedPost,
				postComments,
				host, // send host info to hbs
				logged_in: req.session.logged_in
			});
		} else {
			// otherwise if guest, only send post and comment info on
			res.render("post", {
				...selectedPost,
				postComments,
				logged_in: req.session.logged_in
			});
		}
	} catch (error) {
		console.log(`\n---HOME ROUTE: POST ID ERROR`);
		console.log(error);
		res.status(500).json(error);
	}
});

// render the 'update blog post' page
router.get("/update/:id", withAuth, async (req, res) => {
	try {
		// get specific post id
		const postId = req.params.id;
		// find the post info
		const postData = await Post.findByPk(postId, {
			include: [
				{
					model: User,
					attributes: ["username"]
				}
			]
		});
		// map data
		const selectedPost = postData.get({ plain: true });

		// console.log(`\n---HOME ROUTE: UPDATE SELECTED POST`);
		// console.log(selectedPost);

		res.render("updatePost", {
			...selectedPost,
			logged_in: req.session.logged_in
		});
	} catch (error) {
		console.log(`\n---HOME ROUTE: UPDATE POST ID ERROR`);
		console.log(error);
		res.status(500).json(error);
	}
});

// render the dashboard page
router.get("/dashboard", withAuth, async (req, res) => {
	try {
		// console.log(`\n---HOME ROUTE: REQ SESSION`);
		// console.log(req.session);
		// console.log(req.session.user_id);

		// set up a flag to alert hbs that user is in dashboard
		const dashboardFlag = true;
		// get session host info
		const host = req.session.user_id;

		// console.log("\n---HOST");
		// console.log(host);

		// get user data
		const userData = await User.findByPk(req.session.user_id, {
			include: [{ model: Post }, { model: Comment }]
		});
		// map user data
		const user = userData.get({ plain: true });

		// console.log(`\n---HOME ROUTE: USER`);
		// console.log(user);

		res.render("dashboard", {
			...user,
			dashboardFlag: dashboardFlag, // send flag to hbs
			host,
			logged_in: req.session.logged_in
		});
	} catch (error) {
		console.log(`\n----HOME ROUTE: DASHBOARD ERR`);
		console.log(error);
		res.status(500).json(error);
	}
});

// render signup page
router.get("/signup", (req, res) => {
	if (req.session.logged_in) {
		res.redirect("/dashboard");
		return;
	}
	res.render("signup");
});

// render login page
router.get("/login", (req, res) => {
	if (req.session.logged_in) {
		res.redirect("/dashboard");
		return;
	}
	res.render("login");
});

module.exports = router;
