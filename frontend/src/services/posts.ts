import api from "./api";

export interface Author {
  username: string;
}

export interface Comment {
  id: number;
  content: string;
  author?: Author;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  category?: string;
  author?: Author;
  comments?: Comment[];
  likes_count?: number;
  liked_by_user?: boolean;
  created_at?: string;
  updated_at?: string;
}

/* Get all posts */
export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get("/posts/");
  return response.data;
};

/* Get one post */
export const getPost = async (id: number): Promise<Post> => {
  const response = await api.get(`/posts/${id}/`);
  return response.data;
};

/* Create a post */
export const createPost = async (
  title: string,
  content: string
): Promise<Post> => {
  const response = await api.post("/posts/create/", {
    title,
    content,
  });

  return response.data;
};

/* Create a comment */
export const createComment = async (
  postId: number,
  content: string
): Promise<Comment> => {
  const response = await api.post(
    `/posts/${postId}/comments/create/`,
    {
      content,
    }
  );

  return response.data;
};

/* Like an article */
export const likePost = async (postId: number) => {
  const response = await api.post(`/posts/${postId}/like/`);
  return response.data;
};

/* Unlike an article */
export const unlikePost = async (postId: number) => {
  const response = await api.delete(`/posts/${postId}/like/remove/`);
  return response.data;
};

/* Bookmark an article */
export const bookmarkPost = async (postId: number) => {
  const response = await api.post(`/posts/${postId}/bookmark/`);
  return response.data;
};

/* Remove a bookmark */
export const removeBookmark = async (postId: number) => {
  const response = await api.delete(`/posts/${postId}/bookmark/remove/`);
  return response.data;
};



/* Get the logged-in user's bookmarks */
export const getBookmarks = async () => {
  const response = await api.get("/bookmarks/");
  return response.data;
};
