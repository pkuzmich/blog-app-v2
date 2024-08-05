import {
  createPost,
  deletePost,
  getPostById,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  updatePost,
} from '../services/posts.js'

export function postsRoutes(app) {
  // Define an API route to get all of posts
  app.get('/api/v1/posts', async (req, res) => {
    const { sortBy, sortOrder, author, tag } = req.query
    const options = { sortBy, sortOrder }

    try {
      if (author && tag) {
        return res
          .status(400)
          .json({ error: 'query by either author or tag, not both' })
      } else if (author) {
        return res.json(await listPostsByAuthor(author, options))
      } else if (tag) {
        return res.json(await listPostsByTag(tag, options))
      } else {
        return res.json(await listAllPosts(options))
      }
    } catch (error) {
      console.error('error listing posts', error)
      return res.status(500).end()
    }
  })

  // Define an API route to get a single post
  app.get('/api/v1/posts/:id', async (req, res) => {
    const { id } = req.params

    try {
      const post = getPostById(id)
      if (post === null) return res.status(404).end()
      return res.json(post)
    } catch (error) {
      console.error('error getting post', error)
      return res.status(500).end()
    }
  })

  // Define an API route to CREATE a post
  app.post('/api/v1/posts', async (req, res) => {
    try {
      const post = await createPost(req.body)
      return res.json(post)
    } catch (error) {
      console.error('error creating post', error)
      return res.status(500).end()
    }
  })

  // Define an API route to UPDATE a post
  app.patch('/api/v1/posts/:id', async (req, res) => {
    try {
      const post = await updatePost(req.params.id, req.body)
      return res.json(post)
    } catch (error) {
      console.error('error updating post', error)
      return res.status(500).end()
    }
  })

  // Define an API route to DELETE a post
  app.delete('/api/v1/posts/:id', async (req, res) => {
    try {
      const { deleteCount } = await deletePost(req.params.id)
      if (deleteCount === 0) return res.sendStatus(404)
      return res.status(204).end()
    } catch (error) {
      console.error('error deleting post', error)
      return res.status(500).end()
    }
  })
}
