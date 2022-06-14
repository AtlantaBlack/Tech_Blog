const updateBlogPost = async (event) => {
	event.preventDefault();

	const updatedPostTitle = document.getElementById("post-title").value.trim();

	const updatedPostContent = document
		.getElementById("post-content")
		.value.trim();

	const postId = window.location.toString().split("/").pop();

	console.log(updatedPostTitle);
	console.log(updatedPostContent);
	console.log(postId);

	if (updatedPostTitle || updatedPostContent) {
		const response = await fetch(`/api/posts/${postId}`, {
			method: "PUT",
			body: JSON.stringify({ updatedPostTitle, updatedPostContent, postId }),
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (response.ok) {
			document.location.replace(`/post/${postId}`);
			console.log("woohoo");
		} else {
			alert("Update failed.");
		}
	}
};

document
	.getElementById("update-post-form")
	.addEventListener("submit", updateBlogPost);
