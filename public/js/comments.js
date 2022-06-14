const addNewComment = async (event) => {
	event.preventDefault();

	// console.log("COMMENT POST CLICK");

	const commentContent = document
		.getElementById("comment-content")
		.value.trim();

	// use the url to get the post id
	const postId = window.location.toString().split("/").pop().split("?")[0];

	// console.log(postId);

	if (commentContent) {
		const response = await fetch("/api/comments", {
			method: "POST",
			body: JSON.stringify({ commentContent, postId }),
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (response.ok) {
			document.location.replace(`/post/${postId}`);
		} else {
			alert("Comment failed.");
		}
	}
};

document
	.getElementById("leave-comment-form")
	.addEventListener("submit", addNewComment);
