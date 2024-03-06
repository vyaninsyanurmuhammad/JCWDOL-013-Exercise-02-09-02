import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post, User } from "../../models/types/TwitterProps";

export const addPostThunk = createAsyncThunk(
  "app/addPost",
  async (post: Post) => {
    await fetch("http://localhost:3001/posts", {
      method: "POST",
      body: JSON.stringify(post),
    });

    return post;
  }
);
export const deletePostThunk = createAsyncThunk(
  "app/deletePost",
  async (id: string) => {
    await fetch(`http://localhost:3001/posts/${id}`, {
      method: "DELETE",
    });

    return id;
  }
);

export const updatePostThunk = createAsyncThunk(
  "app/updatePost",
  async (post: Post) => {
    await fetch(`http://localhost:3001/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify(post),
    });

    return post;
  }
);

export const getPostsThunk = createAsyncThunk("app/getPosts", async () => {
  const res = await fetch("http://localhost:3001/posts");

  const data: Post[] = await res.json();

  data.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return [...data];
});

export const getProfileThunk = createAsyncThunk(
  "app/getProfile",
  async (id: string) => {
    const resUser = await fetch(`http://localhost:3001/users/${id}`);
    const resPosts = await fetch(
      `http://localhost:3001/posts?twitted_by=${id}`
    );

    if (resUser.status === 200) {
      const user: User = await resUser.json();
      const posts: Post[] = await resPosts.json();

      return { user, posts };
    }

    return;
  }
);
