import { FiSearch } from "react-icons/fi";
import "./SearchBar.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: Props) {
  return (
    <div className="search-container">

      <FiSearch className="search-icon" />

      <input
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

    </div>
  );
}

export default SearchBar;