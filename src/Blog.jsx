import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PostList } from './components/PostList'
import { CreatePost } from './components/CreatePost'
import { PostFilter } from './components/PostFilter'
import { PostSorting } from './components/PostSorting'
import { getPosts } from './api/posts.js'

export function Blog() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const postsQuery = useQuery({
    queryKey: ['posts', { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  })

  const posts = postsQuery.data ?? []

  const handleFilterChange = (value) => setAuthor(value)
  const handleSortChange = (value) => setSortBy(value)
  const handleSortOrderChange = (value) => setSortOrder(value)

  return (
    <div style={{ padding: 8 }}>
      <CreatePost />
      <hr />
      Filter by:
      <PostFilter field='author' onChange={handleFilterChange} value={author} />
      <br />
      <PostSorting
        fields={['createdAt', 'updatedAt']}
        onChange={handleSortChange}
        value={sortBy}
        orderValue={sortOrder}
        onOrderChange={handleSortOrderChange}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
