import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Jobs", path: "/jobs" },
  { name: "Admit Cards", path: "/admit-card" },
  { name: "Results", path: "/results" },
  { name: "Entrance Exams", path: "/entrance-exams" },
];

const Navigation: React.FC = () => {
  const location = useLocation();
  // Manually extract category from path as string
  const match = location.pathname.match(/\/notification\/category\/([^/]+)/i);
  const category = match ? decodeURIComponent(match[1]) : undefined;

  // For highlighting Admit Cards etc routes
  const isActive = (path: string) => {
    let isActive = false;
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    if (category && path.includes(category)) isActive = true;
    console.log("isActive", isActive);
    return isActive;
  };

  return (
    <nav
      className="bg-light border-bottom shadow-sm sticky-top"
      style={{ top: "74px", zIndex: 1020 }}
    >
      <div className="container">
        <div className="overflow-auto">
          <ul className="nav nav-pills py-2 flex-nowrap">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link text-nowrap ${
                    isActive(item.path)
                      ? "active bg-primary text-white"
                      : "text-dark"
                  }`}
                  style={{ borderRadius: "8px", fontWeight: 500 }}
                >
                  {item.name}
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
