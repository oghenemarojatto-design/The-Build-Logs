import "./CategoriesPage.css";
export default function CategoriesPage() {
  const categories = [
    "Technology",
    "Artificial Intelligence",
    "Programming",
    "Science",
    "Cybersecurity",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Cloud Computing",
    "Business",
    "Startups",
    "Design"
  ];

  return (
    <div className="categories-page">
      <h1>Explore Categories</h1>

      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category} className="category-card">
            <h3>{category}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}