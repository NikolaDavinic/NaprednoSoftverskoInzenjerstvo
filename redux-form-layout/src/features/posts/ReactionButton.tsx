import { useDispatch } from "react-redux";
import { PostsProps, reactionAdded } from "./postsSlice";
import React from "react";

const reactionEmoji: object = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};

interface ReactionButtonProps {
  post: PostsProps;
}

const ReactionButton = ({ post }: ReactionButtonProps) => {
  const dispatch = useDispatch();

  const reactButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji}
        {post.reactions[name]}
      </button>
    );
  });

  return <div>{reactButtons}</div>;
};

export default ReactionButton;
