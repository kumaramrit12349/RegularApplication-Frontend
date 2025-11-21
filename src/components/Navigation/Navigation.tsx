import React from "react";
import { Link, useLocation } from "react-router-dom";
import { categories } from "../../features/notifications/services/notificationService";


const Navigation: React.FC = () => {
  const location = useLocation();
  const match = location.pathname.match(/\/notification\/category\/([^/]+)/i);
  const activeCategory = match ? decodeURIComponent(match[1]) : "all";

  const isActive = (item: (typeof categories)[number]) => {
    if (item.path === location.pathname) return true;
    if (
      activeCategory &&
      item.value &&
      activeCategory.toLowerCase() === item.value.toLowerCase()
    )
      return true;
    return false;
  };

  return (
    <nav
      className="bg-light border-bottom shadow-sm sticky-top"
      style={{ top: "74px", zIndex: 1020 }}
    >
      <div className="container">
        <div className="overflow-auto">
          <ul className="nav nav-pills py-2 flex-nowrap">
            {categories.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link text-nowrap ${
                    isActive(item)
                      ? "active bg-primary text-white"
                      : "text-dark"
                  }`}
                  style={{ borderRadius: "8px", fontWeight: 500 }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
