const toggleFormButton = document.getElementById("toggle-form-vis");

// show the form on click
const showBlogPostForm = () => {
	let form = document.getElementById("new-post-form");

	console.log("CLICK");
	console.log(form);

	form.classList.toggle("hide");
};

// create new post
const addNewBlogPost = async (event) => {
	event.preventDefault();

	console.log("DASHBOARD NEW POST CLICK");

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

// update old post

// delete old post

toggleFormButton.addEventListener("click", showBlogPostForm);

document
	.getElementById("new-post-form")
	.addEventListener("submit", addNewBlogPost);
