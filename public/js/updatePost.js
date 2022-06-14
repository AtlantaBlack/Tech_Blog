const updateBlogPost = async (event) => {
	event.preventDefault();

	const updatedPostTitle = document.getElementById("post-title").value.trim();

	const updatedPostContent = document
		.getElementById("post-content")
		.value.trim();

	const postId = window.location.toString().split("/").pop();

	if (updatedPostTitle || updatedPostContent) {
		const response = await fetch(`/api/update/${postId}`, {
			method: "PUT",
			body: JSON.stringify({ updatedPostTitle, updatedPostContent, postId }),
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (response.ok) {
			console.log("woohoo");
		} else {
			alert("Update failed.");
		}
	}
};

document
	.getElementById("update-post-form")
	.addEventListener("submit", updateBlogPost);
