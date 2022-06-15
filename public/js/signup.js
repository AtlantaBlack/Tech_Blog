// sign up form
const signUpForm = document.getElementById("signup-form");

// sign up form handler
const signTheUserUp = async (event) => {
	event.preventDefault();

	// get values
	const username = document.getElementById("username-signup").value.trim();
	const email = document.getElementById("email-signup").value.trim();
	const password = document.getElementById("password-signup").value.trim();

	if (username && email && password) {
		const response = await fetch("api/users", {
			method: "POST",
			body: JSON.stringify({ username, email, password }),
			headers: { "Content-Type": "application/json" }
		});

		if (response.ok) {
			document.location.replace("/");
		} else {
			alert("Sign up failed.");
		}
	}
};

// add event listeners
signUpForm.addEventListener("submit", signTheUserUp);
