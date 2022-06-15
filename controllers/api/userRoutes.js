const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// get all users (for testing)
router.get("/", async (req, res) => {
	try {
		// find all users
		const userData = await User.findAll({
			include: [{ model: Post }, { model: Comment }]
		});

		res.status(200).json(userData);
	} catch (error) {
		res.status(500).json(error);
	}
});

// posting to api/users

// sign up the user
router.post("/", async (req, res) => {
	try {
		// get values out of req.body
		const { username, email, password } = req.body;

		// if all present, proceed with sign up
		if (username && email && password) {
			// create user
			const newUser = await User.create(req.body);
			// save a new session
			req.session.save(() => {
				req.session.user_id = newUser.id; // add user_id
				req.session.logged_in = true; // add logged_in status

				res.status(200).json(newUser);
			});
		} else {
			alert(
				"Signup failed. Please enter a valid username, email, and password."
			);
		}
	} catch (error) {
		console.log(`\n---USER ROUTE: SIGN UP ERROR:`);
		console.log(error);
		res.status(500).json(error);
	}
});

// log user in
router.post("/login", async (req, res) => {
	try {
		// get values
		const { email, password } = req.body;

		// find a user that matches email
		const returningUser = await User.scope("withPassword").findOne({
			where: {
				email: email
			}
		});
		// send error if user not found
		if (!returningUser) {
			return res.status(400).json({
				message: "Incorrect email. Please try again."
			});
		}

		// match the password
		const userPassword = await returningUser.checkPassword(password);

		// if password doesn't match, send error
		if (!userPassword) {
			return res.status(400).json({
				message: "Incorrect password. Please try again."
			});
		}

		// if all good, save the session
		req.session.save(() => {
			req.session.user_id = returningUser.id; // set user_id
			req.session.logged_in = true; // set logged_in status
			// send a backend msg
			const { username } = returningUser;
			const welcomeMsg = `Welcome back, ${username}!`;
			res.status(200).json({
				message: welcomeMsg
			});
		});
	} catch (error) {
		console.log(`\n---USER ROUTE: LOGIN ERROR:`);
		console.log(error);
		res.status(500).json(error);
	}
});

// log user out
router.post("/logout", (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
