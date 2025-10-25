import React, { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string, filter: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search notifications...",
  onSearch,
}) => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query, filter);
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
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="jobs">Jobs</option>
                <option value="results">Results</option>
                <option value="admit-cards">Admit Cards</option>
                <option value="exams">Exams</option>
              </select>
              <input
                type="text"
                className="form-control"
                placeholder={placeholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                className="btn btn-primary px-4"
                type="button"
                onClick={handleSearch}
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
