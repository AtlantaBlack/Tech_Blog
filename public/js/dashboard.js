// create new post
const addNewBlogPost = async (event) => {
  event.preventDefault();

  console.log('DASHBOARD NEW POST CLICK');

  const postTitle = document.getElementById('post-title').value.trim();
  const postContent = document.getElementById('post-content').value.trim();

  if (postTitle && postContent) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ postTitle, postContent }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Blog post failed.');
    }
  }
};

// update old post

// delete old post

document
  .getElementById('new-post-form')
  .addEventListener('submit', addNewBlogPost);