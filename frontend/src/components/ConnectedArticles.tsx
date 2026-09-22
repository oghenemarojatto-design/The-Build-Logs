import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaClock,
  FaLink,
  FaUser,
} from "react-icons/fa6";

import api from "../services/api";
import "./ConnectedArticles.css";

interface Post {
  id: number;
  title: string;
  content: string;
  author?: {
    username: string;
  };
  category?: string;
}

export default function ConnectedArticles() {
  const [articles, setArticles] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get("/posts/");

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        setArticles(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to load connected articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className="connected-section">

      <div className="connected-container">

        {/* HEADER */}

        <motion.div
          className="connected-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">
            <FaLink />
            Connected Knowledge
          </span>

          <h2>
            Ideas are better
            <span> connected.</span>
          </h2>

          <p>
            Discover ideas from the BlueBlog community
            and explore the connections between them.
          </p>
        </motion.div>

        {/* LOADING */}

        {loading && (
          <div className="articles-loading">
            Loading connected articles...
          </div>
        )}

        {/* EMPTY */}

        {!loading && articles.length === 0 && (
          <div className="articles-loading">
            No articles available yet.
          </div>
        )}

        {/* ARTICLES */}

        {!loading && articles.length > 0 && (
          <div className="articles-grid">

            {articles.map((article, index) => (

              <motion.article
                key={article.id}
                className="article-card"

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
                  delay: index * 0.15,
                }}

                whileHover={{
                  y: -8,
                }}
              >

                {/* TOP */}

                <div className="article-top">

                  <span className="article-category">
                    {article.category || "Knowledge"}
                  </span>

                  <span className="connection-count">
                    <FaLink />
                    {index + 1}
                  </span>

                </div>

                {/* ICON */}

                <div className="article-icon">
                  {index === 0 && "✦"}
                  {index === 1 && "◈"}
                  {index === 2 && "✧"}
                </div>

                {/* TITLE */}

                <h3>
                  {article.title}
                </h3>

                {/* DESCRIPTION */}

                <p>
                  {article.content
                    ?.replace(/<[^>]*>/g, "")
                    .slice(0, 130)}

                  {article.content?.length > 130
                    ? "..."
                    : ""}
                </p>

                {/* META */}

                <div className="article-meta">

                  <div className="author">

                    <div className="author-avatar">
                      <FaUser />
                    </div>

                    <span>
                      {article.author?.username ||
                        "BlueBlog Writer"}
                    </span>

                  </div>

                  <div className="read-time">
                    <FaClock />
                    5 min read
                  </div>

                </div>

                {/* LINK */}

                <Link
                  to={`/posts/${article.id}`}
                  className="article-link"
                >
                  Read article
                  <FaArrowRight />
                </Link>

              </motion.article>

            ))}

          </div>
        )}

        {/* BOTTOM BUTTON */}

        <motion.div
          className="articles-action"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link to="/posts">
            Explore all articles
            <FaArrowRight />
          </Link>
        </motion.div>

      </div>

    </section>
  );
}