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
    `/posts/${postId}/comments/`,
    {
      content,
    }
  );

  return response.data;
};