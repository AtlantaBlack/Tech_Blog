// update comment form
const updateCommentForm = document.getElementById("update-comment-form");
// delete comment button
const deleteCommentButton = document.getElementById("delete-comment-button");

// update comment handler
const updateComment = async (event) => {
	event.preventDefault();

	// get comment content values
	const updatedCommentContent = document
		.getElementById("comment-content")
		.value.trim();

	// get comment id
	const commentId = window.location.toString().split("/").pop();

	// if is changed, send updated data to backend
	if (updatedCommentContent) {
		const response = await fetch(`/api/comments/${commentId}`, {
			method: "PUT",
			body: JSON.stringify({
				updatedCommentContent,
				commentId
			}),
			headers: {
				"Content-Type": "application/json"
			}
		});

		// if all good, refresh page
		if (response.ok) {
			document.location.replace(document.referrer);
			// document.location.replace(`/comments/${commentId}`);
		} else {
			alert("Update comment failed.");
		}
	}
};

// delete post handler
const deleteComment = async () => {
	// get comment id
	const commentId = window.location.toString().split("/").pop();

	// ask user for confirmation before deleting
	if (window.confirm("Are you sure you want to delete this comment?")) {
		// if yes, start the deletion process
		const response = await fetch(`/api/comments/${commentId}`, {
			method: "DELETE"
		});

		if (response.ok) {
			alert("Comment successfully deleted.");
			document.location.replace(document.referrer);
		} else {
			alert("Comment failed to be deleted.");
		}
	}
};

// add event listeners
updateCommentForm.addEventListener("submit", updateComment);
deleteCommentButton.addEventListener("click", deleteComment);
