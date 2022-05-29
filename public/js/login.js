const logTheUserIn = async (event) => {
  event.preventDefault();

  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  console.log(`\n----EMAIL`);
  console.log(email);

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

const signTheUserUp = async (event) => {
  event.preventDefault();

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

document
  .getElementById("login-form")
  .addEventListener("submit", logTheUserIn);

document
  .getElementById("signup-form")
  .addEventListener("submit", signTheUserUp);