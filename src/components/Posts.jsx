import PropTypes from 'prop-types'
import { DeletePost } from './DeletePost'

export default function Post({ _id, title, author, contents }) {
  return (
    <article>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <h3>{title}</h3>
        <DeletePost postId={_id} />
      </div>
      <div>{contents}</div>
      {author && (
        <em>
          Written by <strong>{author}</strong>
        </em>
      )}
    </article>
  )
}

Post.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string,
  contents: PropTypes.string,
}
