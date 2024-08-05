import { Fragment } from 'react'
import Post from './Posts'
import PropTypes from 'prop-types'

export function PostList({ posts = [] }) {
  return (
    <>
      {posts.map((post) => (
        <Fragment key={post._id}>
          <Post {...post} />
          <hr />
        </Fragment>
      ))}
    </>
  )
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
}
