import React from 'react'
import { PostsProps } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButton from './ReactionButton'

type PostsExcerptProps = {
    post: PostsProps
}

const PostsExcerpt = ({post}: PostsExcerptProps) => {
  return (
    <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body.substring(0,100)}</p>

            <p>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
                <ReactionButton post={post}/>
            </p>
        </article>
  )
}

export default PostsExcerpt