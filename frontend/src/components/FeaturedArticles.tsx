import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaClock,
  FaUser,
  FaStar,
} from "react-icons/fa6";

import { getPosts, type Post } from "../services/posts";
import "./FeaturedArticles.css";

export default function FeaturedArticles() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedPosts = async () => {
      try {
        const data = await getPosts();

        // Use posts after the first 3 so they don't
        // duplicate ConnectedArticles.
        setPosts(data.slice(3, 6));
      } catch (error) {
        console.error(
          "Failed to load featured posts:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPosts();
  }, []);

  return (
    <section className="featured-section">
      <div className="featured-container">

        {/* HEADER */}

        <motion.div
          className="featured-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <span className="featured-label">
              <FaStar />
              Featured Stories
            </span>

            <h2>
              Stories worth
              <span> discovering.</span>
            </h2>

            <p>
              Explore some of the latest ideas and
              perspectives from the BlueBlog community.
            </p>
          </div>

          <Link
            to="/posts"
            className="featured-view-all"
          >
            View all
            <FaArrowRight />
          </Link>
        </motion.div>

        {/* LOADING */}

        {loading && (
          <div className="featured-status">
            Loading featured stories...
          </div>
        )}

        {/* EMPTY */}

        {!loading && posts.length === 0 && (
          <div className="featured-status">
            More featured stories will appear here
            as new articles are published.
          </div>
        )}

        {/* POSTS */}

        {!loading && posts.length > 0 && (
          <div className="featured-grid">

            {posts.map((post, index) => (

              <motion.article
                key={post.id}
                className="featured-card"

                initial={{
                  opacity: 0,
                  y: 40,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                viewport={{
                  once: true,
                }}

                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                }}

                whileHover={{
                  y: -8,
                }}
              >

                {/* VISUAL */}

                <div className="featured-visual">

                  <div className="featured-glow" />

                  <span>
                    {index === 0
                      ? "✦"
                      : index === 1
                      ? "◈"
                      : "✧"}
                  </span>

                </div>

                {/* CONTENT */}

                <div className="featured-content">

                  <span className="featured-category">
                    {post.category || "Knowledge"}
                  </span>

                  <h3>{post.title}</h3>

                  <p>
                    {post.content
                      ?.replace(/<[^>]*>/g, "")
                      .slice(0, 140)}

                    {post.content?.length > 140
                      ? "..."
                      : ""}
                  </p>

                  {/* META */}

                  <div className="featured-meta">

                    <div className="featured-author">

                      <div className="featured-avatar">
                        <FaUser />
                      </div>

                      <span>
                        {post.author?.username ||
                          "BlueBlog Writer"}
                      </span>

                    </div>

                    <span className="featured-time">
                      <FaClock />
                      5 min
                    </span>

                  </div>

                  {/* LINK */}

                  <Link
                    to={`/posts/${post.id}`}
                    className="featured-read"
                  >
                    Read story
                    <FaArrowRight />
                  </Link>

                </div>

              </motion.article>

            ))}

          </div>
        )}

      </div>
    </section>
  );
}