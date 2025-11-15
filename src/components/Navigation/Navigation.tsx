import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Admit Cards", path: "/admit-cards" },
    { name: "Results", path: "/results" },
    { name: "Entrance Exams", path: "/entrance-exams" },
  ];

  return (
    <nav className="bg-light border-bottom shadow-sm sticky-top" style={{ top: '74px', zIndex: 1020 }}>
      <div className="container">
        <div className="overflow-auto">
          <ul className="nav nav-pills py-2 flex-nowrap">
            {navItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link text-nowrap ${
                    location.pathname === item.path
                      ? "active bg-primary text-white"
                      : "text-dark"
                  }`}
                  style={{ borderRadius: "8px", fontWeight: "500" }}
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
