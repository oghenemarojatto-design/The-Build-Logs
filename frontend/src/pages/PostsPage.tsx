import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaClock,
  FaMagnifyingGlass,
  FaPlus,
  FaUser,
} from "react-icons/fa6";

import { getPosts } from "../services/posts";
import type { Post } from "../services/posts";

import "./PostsPage.css";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error("Failed to load posts:", err);
      setError("Unable to load articles.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const query = search.toLowerCase();

    return (
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.category?.toLowerCase().includes(query) ||
      post.author?.username.toLowerCase().includes(query)
    );
  });

  return (
    <main className="posts-page">

      {/* Background */}
      <div className="posts-glow posts-glow-one" />
      <div className="posts-glow posts-glow-two" />

      {/* Hero */}
      <section className="posts-hero">

        <motion.div
          className="posts-hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="posts-label">
            BLUEBLOG ARTICLES
          </span>

          <h1>
            Explore ideas
            <br />
            that <span>matter.</span>
          </h1>

          <p>
            Discover stories, knowledge and ideas from
            the BlueBlog community.
          </p>

          {/* Search */}
          <div className="posts-search">
            <FaMagnifyingGlass />

            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Create Post */}
        <motion.div
          className="posts-create"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
        >
          <Link to="/create-post">
            <FaPlus />
            Create Post
          </Link>
        </motion.div>

      </section>

      {/* Articles */}
      <section className="posts-section">

        <div className="posts-section-header">

          <div>
            <span className="section-mini-label">
              LATEST KNOWLEDGE
            </span>

            <h2>
              Latest <span>articles</span>
            </h2>
          </div>

          <span className="post-count">
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1
              ? "article"
              : "articles"}
          </span>

        </div>

        {/* Loading */}
        {loading && (
          <div className="posts-status">
            <div className="loading-spinner" />
            <p>Loading articles...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="posts-status error">
            <p>{error}</p>

            <button onClick={loadPosts}>
              Try again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          filteredPosts.length === 0 && (
            <div className="posts-status">
              <h3>No articles found</h3>

              <p>
                Try searching for something else.
              </p>
            </div>
          )}

        {/* Posts */}
        {!loading &&
          !error &&
          filteredPosts.length > 0 && (
            <div className="posts-grid">

              {filteredPosts.map((post, index) => (

                <motion.article
                  key={post.id}
                  className="post-card"

                  initial={{
                    opacity: 0,
                    y: 35,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                  }}

                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}

                  whileHover={{
                    y: -8,
                  }}
                >

                  {/* Visual */}
                  <div className="post-visual">

                    <div className="visual-orbit orbit-one" />

                    <div className="visual-orbit orbit-two" />

                    <div className="post-symbol">
                      {index % 3 === 0
                        ? "✦"
                        : index % 3 === 1
                        ? "◈"
                        : "✧"}
                    </div>

                    <span className="post-category">
                      {post.category || "Knowledge"}
                    </span>

                  </div>

                  {/* Content */}
                  <div className="post-card-content">

                    <h3>
                      {post.title}
                    </h3>

                    <p>
                      {post.content.length > 130
                        ? `${post.content.slice(
                            0,
                            130
                          )}...`
                        : post.content}
                    </p>

                    {/* Meta */}
                    <div className="post-meta">

                      <div className="post-author">

                        <div className="post-avatar">
                          <FaUser />
                        </div>

                        <span>
                          {post.author?.username ||
                            "Anonymous"}
                        </span>

                      </div>

                      <div className="post-time">
                        <FaClock />
                        <span>5 min read</span>
                      </div>

                    </div>

                    {/* Read Article */}
                    <Link
                      to={`/posts/${post.id}`}
                      className="read-post"
                    >
                      <span>Read article</span>

                      <FaArrowRight />
                    </Link>

                  </div>

                </motion.article>

              ))}

            </div>
          )}

      </section>

    </main>
  );
}