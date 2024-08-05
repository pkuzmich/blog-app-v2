import { initDatabase } from './db/init.js'
import { Post } from './db/models/post.js'

await initDatabase()

const post = new Post({
  title: 'Sample Post',
  author: 'John Doe',
  content: 'This is a sample blog post.',
  tags: ['sample', 'blog', 'mongoose', 'mongodb'],
})

const createdPost = await post.save()
await Post.findByIdAndUpdate(createdPost._id, {
  $set: { title: 'One more post again!' },
})

const posts = await Post.find()
console.log(posts)
