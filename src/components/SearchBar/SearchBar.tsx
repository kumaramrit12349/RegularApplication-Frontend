import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const categories = [
  { label: "All", value: "all" },
  { label: "Jobs", value: "jobs" },
  { label: "Results", value: "results" },
  { label: "Admit Cards", value: "admit-card" },
  { label: "Exams", value: "exams" },
];

interface SearchBarProps {
  onSearch?: (query: string, filter: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search notifications...",
}) => {
  const { category: urlCategory } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (urlCategory) {
      setFilter(urlCategory);
    } else {
      setFilter("all");
    }
  }, [urlCategory]);

  const handleSearch = () => {
    if (onSearch) onSearch(query, filter);
    if (filter !== "all") {
      navigate(`/notification/category/${filter}`);
    } else {
      navigate("/");
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFilter(val);
    setQuery("");
    if (val !== "all") {
      navigate(`/notification/category/${val}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-light py-3 border-bottom">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="input-group shadow-sm">
              <select
                className="form-select"
                style={{ maxWidth: "150px" }}
                value={filter}
                onChange={handleFilterChange}
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="form-control"
                value={query}
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                className="btn btn-primary px-4"
                onClick={handleSearch}
                type="button"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
