// toggle button
const toggleFormButton = document.getElementById("toggle-form-vis");
// new post form
const newPostForm = document.getElementById("new-post-form");

// show the form on click
const showBlogPostForm = () => {
	let form = document.getElementById("new-post-form");
	// add or remove class 'hide' as needed
	form.classList.toggle("hide");
};

// create new post
const addNewBlogPost = async (event) => {
	event.preventDefault();

	// get content out of form
	const postTitle = document.getElementById("post-title").value.trim();
	const postContent = document.getElementById("post-content").value.trim();

	if (postTitle && postContent) {
		const response = await fetch("/api/posts", {
			method: "POST",
			body: JSON.stringify({ postTitle, postContent }),
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (response.ok) {
			document.location.replace("/dashboard");
		} else {
			alert("Blog post failed.");
		}
	}
};

toggleFormButton.addEventListener("click", showBlogPostForm);

newPostForm.addEventListener("submit", addNewBlogPost);
