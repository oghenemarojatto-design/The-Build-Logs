import "./AdvancedCategories.css";
import { FiCode, FiDatabase, FiCpu, FiMonitor, FiSmartphone, FiGlobe, FiLayers } from "react-icons/fi";

const advancedCategories = [
  {
    icon: <FiCode />, 
    title: "Frontend",
    description: "Modern web development frameworks",
    posts: "120+ Posts",
    color: "from-blue-500 to-cyan-500",
    connection: "React ↔ Vue ↔ Angular",
  },
  {
    icon: <FiDatabase />,
    title: "Backend", 
    description: "Server-side technologies",
    posts: "95+ Posts",
    color: "from-purple-500 to-pink-500",
    connection: "Node.js ↔ Python ↔ Go",
  },
  {
    icon: <FiCpu />,
    title: "Artificial Intelligence",
    description: "Machine learning & AI systems", 
    posts: "80+ Posts",
    color: "from-orange-500 to-red-500",
    connection: "ML ↔ DL ↔ RL",
  },
  {
    icon: <FiMonitor />,
    title: "Web Development",
    description: "Full-stack development tutorials",
    posts: "160+ Posts", 
    color: "from-green-500 to-emerald-500",
    connection: "HTML ↔ CSS ↔ JS",
  },
  {
    icon: <FiSmartphone />,
    title: "Mobile Apps",
    description: "Cross-platform mobile development",
    posts: "70+ Posts",
    color: "from-indigo-500 to-blue-500",
    connection: "Flutter ↔ React Native",
  },
  {
    icon: <FiGlobe />,
    title: "Cloud",
    description: "Cloud computing & DevOps",
    posts: "60+ Posts",
    color: "from-sky-500 to-teal-500",
    connection: "AWS ↔ Azure ↔ GCP",
  },
  {
    icon: <FiLayers />,
    title: "Interdisciplinary",
    description: "Science meets Technology & Arts",
    posts: "45+ Posts",
    color: "from-rose-500 to-violet-500",
    connection: "Science ↔ Art ↔ Tech",
  },
];

function AdvancedCategories() {
  return (
    <section className="advanced-categories">
      <div className="categories-header">
        <div className="header-badge">
          <span>🧠 Smart Categories</span>
        </div>

        <h2>Interconnected Knowledge Domains</h2>

        <p>
          Discover how disciplines connect and inspire each other. Each category
          bridges to others, creating a complete ecosystem of learning.
        </p>

        <div className="connection-visualization">
          <div className="connection-line"></div>
          <div className="connection-line"></div>
          <div className="connection-line"></div>
          <div className="connection-line"></div>
        </div>
      </div>

      <div className="categories-grid">
        {advancedCategories.map((category) => (
          <div key={category.title} className="category-card">
            <div className="card-glow"></div>
            
            <div className="category-header">
              <div className={`category-icon ${category.color}`}>
                {category.icon}
              </div>
              
              <div className="category-meta">
                <h3>{category.title}</h3>
                <span className="category-connection">
                  {category.connection}
                </span>
              </div>
            </div>

            <p className="category-description">
              {category.description}
            </p>

            <div className="category-footer">
              <div className="connection-indicator">
                <div className="connection-dot"></div>
                <span>Connected articles</span>
              </div>
              <span className="article-count">
                {category.posts}
              </span>
            </div>

            <div className="hover-effect"></div>
          </div>
        ))}
      </div>

      <div className="knowledge-network">
        <div className="network-node node-1">
          <span>🧠</span>
        </div>
        <div className="network-node node-2">
          <span>⚛️</span>
        </div>
        <div className="network-node node-3">
          <span>📊</span>
        </div>
        <div className="network-node node-4">
          <span>🌐</span>
        </div>
        <div className="network-node node-5">
          <span>🎨</span>
        </div>
        <div className="network-connection">
          <div className="connection-line"></div>
          <div className="connection-line"></div>
          <div className="connection-line"></div>
        </div>
      </div>
    </section>
  );
}

export default AdvancedCategories;
