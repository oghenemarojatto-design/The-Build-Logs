import { motion } from "framer-motion";
import {
  FaMicrochip,
  FaFlask,
  FaPalette,
  FaCode,
  FaRocket,
  FaArrowRight,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

import "./Categories.css";

const categories = [
  {
    title: "Technology",
    description:
      "AI, software, gadgets and the technologies shaping tomorrow.",
    icon: <FaMicrochip />,
    articles: "4.2K",
  },
  {
    title: "Science",
    description:
      "Discover breakthroughs, research and the mysteries of our world.",
    icon: <FaFlask />,
    articles: "2.8K",
  },
  {
    title: "Arts & Culture",
    description:
      "Creativity, design, culture and new forms of expression.",
    icon: <FaPalette />,
    articles: "1.9K",
  },
  {
    title: "Programming",
    description:
      "Build better software with practical ideas and developer insights.",
    icon: <FaCode />,
    articles: "3.1K",
  },
  {
    title: "Space",
    description:
      "Explore the universe, space technology and humanity's next frontier.",
    icon: <FaRocket />,
    articles: "1.4K",
  },
];

export default function Categories() {
  return (
    <section className="categories-section">
      <div className="categories-container">

        <motion.div
          className="categories-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="categories-label">
            Explore the world
          </span>

          <h2>
            Find your <span>curiosity.</span>
          </h2>

          <p>
            Explore ideas across technology, science,
            creativity and the subjects that shape our future.
          </p>
        </motion.div>

        <div className="categories-grid">

          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              className="category-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{ y: -8 }}
            >

              <div className="category-icon">
                {category.icon}
              </div>

              <h3>{category.title}</h3>

              <p>{category.description}</p>

              <span className="category-count">
                {category.articles} articles
              </span>

              <Link
                to={`/categories?category=${encodeURIComponent(
                  category.title
                )}`}
                className="category-arrow"
              >
                <FaArrowRight />
              </Link>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}