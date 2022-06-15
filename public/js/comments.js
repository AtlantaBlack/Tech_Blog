// leave comment form
const leaveCommentForm = document.getElementById("leave-comment-form");

// add new comment form handler
const addNewComment = async (event) => {
	event.preventDefault();

	// get content
	const commentContent = document
		.getElementById("comment-content")
		.value.trim();

	// use the url to get the post id
	const postId = window.location.toString().split("/").pop().split("?")[0];

	if (!commentContent) {
		alert("Don't forget to write your comment.");
		return;
	}

	if (commentContent) {
		const response = await fetch("/api/comments", {
			method: "POST",
			body: JSON.stringify({ commentContent, postId }),
			headers: {
				"Content-Type": "application/json"
			}
		});

		if (response.ok) {
			document.location.replace(`/posts/${postId}`);
		} else {
			alert("Comment failed.");
		}
	}
};

// add event listeners
leaveCommentForm.addEventListener("submit", addNewComment);
