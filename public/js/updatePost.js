// update post form
const updatePostForm = document.getElementById("update-post-form");
// delete post button
const deletePostButton = document.getElementById("delete-post-button");

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
			document.location.replace(`/posts/${postId}`);
		} else {
			alert("Update failed.");
		}
	}
};

// delete post handler
const deleteBlogPost = async () => {
	// get post id
	const postId = window.location.toString().split("/").pop();

	// ask user for confirmation before deleting
	if (window.confirm("Are you sure you want to delete this blog post?")) {
		// if yes, start the deletion process
		const response = await fetch(`/api/posts/${postId}`, {
			method: "DELETE"
		});

		if (response.ok) {
			alert("Post successfully deleted.");
			document.location.replace("/dashboard");
		} else {
			alert("Post failed to be deleted.");
		}
	}
};

// add event listeners
updatePostForm.addEventListener("submit", updateBlogPost);
deletePostButton.addEventListener("click", deleteBlogPost);
