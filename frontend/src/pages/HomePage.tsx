import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedArticles from "../components/FeaturedArticles";
import ConnectedArticles from "../components/ConnectedArticles";
import Footer from "../components/Footer";

import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page">

      {/* HERO */}
      <Hero />

      {/* CATEGORIES */}
      <Categories />

      {/* FEATURED ARTICLES */}
      <FeaturedArticles />

      {/* CONNECTED ARTICLES */}
      <ConnectedArticles />

      {/* FOOTER */}
      <Footer />

    </div>
  );
}