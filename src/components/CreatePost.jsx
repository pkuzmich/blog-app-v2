import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { createPost } from '../api/posts.js'

export function CreatePost() {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  const queryClient = useQueryClient()

  const createPostMutation = useMutation({
    mutationFn: () => createPost({ title, author, content }),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
      setTitle('')
      setAuthor('')
      setContent('')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createPostMutation.mutate()
  }

  const handleInputTitleChange = (e) => setTitle(e.target.value)
  const handleInputAuthorChange = (e) => setAuthor(e.target.value)
  const handleContentChange = (e) => setContent(e.target.value)

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={handleInputTitleChange}
        />
      </div>
      <div>
        <label htmlFor='author'>Author:</label>
        <input
          type='text'
          name='author'
          id='author'
          value={author}
          onChange={handleInputAuthorChange}
        />
      </div>
      <div>
        <label htmlFor='content'>Content:</label>
        <textarea
          name='content'
          id='content'
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>
      <button type='submit' disabled={createPostMutation.isPending}>
        {createPostMutation.isPending ? 'Creating...' : 'Create'}
      </button>
      {createPostMutation.isSuccess ? (
        <>
          <br />
          Post created successfully!
        </>
      ) : null}
    </form>
  )
}
