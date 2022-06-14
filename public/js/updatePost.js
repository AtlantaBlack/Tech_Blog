// update blog handler
const updateBlogPost = async (event) => {
	event.preventDefault();

	// get post title and content values
	const updatedPostTitle = document.getElementById("post-title").value.trim();
	const updatedPostContent = document
		.getElementById("post-content")
		.value.trim();

	// get post id
	const postId = window.location.toString().split("/").pop();

	// if either title or content are changed, send updated data to backend
	if (updatedPostTitle || updatedPostContent) {
		const response = await fetch(`/api/posts/${postId}`, {
			method: "PUT",
			body: JSON.stringify({ updatedPostTitle, updatedPostContent, postId }),
			headers: {
				"Content-Type": "application/json"
			}
		});

		// if all good, refresh page
		if (response.ok) {
			document.location.replace(`/post/${postId}`);
		} else {
			alert("Update failed.");
		}
	}
};

const deleteBlogPost = async (event) => {
	// get post id
	const postId = window.location.toString().split("/").pop();

	if (window.confirm("Are you sure you want to delete this blog post?")) {
		const response = await fetch(`/api/posts/${postId}`, {
			method: "DELETE"
		});

		if (response.ok) {
			alert("Post deleted");
			document.location.replace("/dashboard");
		} else {
			alert("Post failed to be deleted.");
		}
	}
};

// add event listener to the form button
document
	.getElementById("update-post-form")
	.addEventListener("submit", updateBlogPost);

document
	.getElementById("delete-post-button")
	.addEventListener("click", deleteBlogPost);
