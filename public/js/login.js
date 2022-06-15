// login form
const loginForm = document.getElementById("login-form");

// login form handler
const logTheUserIn = async (event) => {
	event.preventDefault();

	// get content values
	const email = document.getElementById("email-login").value.trim();
	const password = document.getElementById("password-login").value.trim();

	if (email && password) {
		const response = await fetch("/api/users/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" }
		});

		if (response.ok) {
			document.location.replace("/");
		} else {
			alert("Login failed.");
		}
	}
};

// add event listeners
loginForm.addEventListener("submit", logTheUserIn);
