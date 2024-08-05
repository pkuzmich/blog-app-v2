import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePost } from '../api/posts.js'

export function DeletePost({ postId }) {
  const queryClient = useQueryClient()

  const deletePostMutation = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts'])
    },
  })

  return (
    <button
      type='submit'
      // onClick={() => handleDelete(postId)}
      onClick={() => deletePostMutation.mutate(postId)}
      disabled={deletePostMutation.isPending}
    >
      ❌
    </button>
  )
}

DeletePost.propTypes = {
  postId: PropTypes.string.isRequired,
}
