import { useEffect, useState } from "react";
import { getPosts } from "../services/posts";
import type { Post } from "../services/posts";
import PostCard from "./PostCard";
import "./FeaturedPosts.css";

function FeaturedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data.slice(0, 6));
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="featured-section">
      <div className="featured-header">
        <span>Latest Articles</span>

        <h2>Featured Stories</h2>

        <p>
          Explore the newest posts from our growing community.
        </p>
      </div>

      {loading ? (
        <div className="loading">
          Loading articles...
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              content={post.content}
              author={post.author ?? { username: "Unknown" }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default FeaturedPosts;