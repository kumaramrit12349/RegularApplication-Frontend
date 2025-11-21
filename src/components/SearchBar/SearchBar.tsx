import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { categories } from "../../features/notifications/services/notificationService";

interface SearchBarProps {
  onSearch?: (query: string, filter: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search notifications...",
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const match = location.pathname.match(/\/notification\/category\/([^/]+)/i);
  const urlCategory = match ? decodeURIComponent(match[1]) : "all";

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(urlCategory);

  useEffect(() => {
    setFilter(urlCategory);
    setQuery(""); // <- This clears search field every time category changes
  }, [urlCategory]);

  const handleSearch = () => {
    if (onSearch) onSearch(query, filter);
    // Route should update, including search query in state
    if (filter !== "all") {
      navigate(
        `/notification/category/${filter}?searchValue=${encodeURIComponent(
          query
        )}`
      );
    } else {
      navigate(`/?searchValue=${encodeURIComponent(query)}`);
    }
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFilter(val);
    setQuery(""); // <- This resets the search input immediately on dropdown change
    // Also navigate to category WITHOUT old search param:
    if (val !== "all") {
      navigate(`/notification/category/${val}`);
    } else {
      navigate("/");
    }
  };

    // Clear search input and remove from URL/query params
  const handleClearSearch = () => {
    setQuery("");
    if (filter !== "all") {
      navigate(`/notification/category/${filter}`); // Remove searchValue from URL
    } else {
      navigate(`/`);
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
              {query && (
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={handleClearSearch}
                  tabIndex={-1}
                  style={{ zIndex: 2 }}
                  aria-label="Clear search"
                >
                  &#x2715;
                </button>
              )}
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
