export const getPosts = async (queryParam) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` + new URLSearchParams(queryParam),
  )
  return res.json()
}

export const createPost = async (post) => {
  const result = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  })

  return await result.json()
}

export const deletePost = async (postId) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete post')
  }
}
