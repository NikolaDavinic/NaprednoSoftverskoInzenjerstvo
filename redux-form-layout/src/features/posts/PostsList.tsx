import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PostsProps } from "./postsSlice";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { CircularProgress } from "@mui/material";

function PostsList() {
  const dispatch = useDispatch();
  const posts: Array<PostsProps> = useSelector(selectAllPosts);
  const postsError = useSelector(getPostsError);
  const postsStatus = useSelector(getPostsStatus);
  console.log(posts);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content: JSX.Element;
  if (postsStatus === "loading") {
    content = <p>Loading...</p>;
    // <CircularProgress />;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a: PostsProps, b: PostsProps) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post: PostsProps) => {
      console.log(post);
      return <PostsExcerpt key={post.id} post={post} />;
    });
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
}

export default PostsList;
