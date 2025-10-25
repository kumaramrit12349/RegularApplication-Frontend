import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top" style={{ zIndex: 1030 }}>
      <div className="container-fluid">
        {/* Logo + Brand Name */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/logo.png"
            alt="Logo"
            height="40"
            className="me-2"
            style={{ borderRadius: "8px" }}
          />
          <span className="fw-semibold">Regular Application</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right Section - Profile Dropdown */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item dropdown position-relative" ref={dropdownRef}>
              <button
                className="btn btn-link nav-link d-flex align-items-center text-white text-decoration-none p-0"
                onClick={() => setOpen(!open)}
                style={{ cursor: "pointer", border: "none", background: "none" }}
              >
                <div
                  className="rounded-circle bg-secondary d-flex align-items-center justify-content-center me-2"
                  style={{ width: "35px", height: "35px" }}
                >
                  <span style={{ fontSize: "18px" }}>👤</span>
                </div>
                <span className="d-none d-md-inline me-1">Profile</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {open && (
                <div
                  className="dropdown-menu dropdown-menu-end show"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    minWidth: "280px",
                    marginTop: "8px",
                    zIndex: 1031,
                  }}
                >
                  {/* Profile Header */}
                  <div className="px-3 py-3 border-bottom">
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                        style={{ width: "50px", height: "50px", fontSize: "24px" }}
                      >
                        👤
                      </div>
                      <div>
                        <div className="fw-semibold">Doli Kumari</div>
                        <div className="text-muted small">doli@example.com</div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <ul className="list-unstyled mb-0">
                    <li>
                      <Link
                        className="dropdown-item py-2"
                        to="/profile"
                        onClick={() => setOpen(false)}
                      >
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item py-2"
                        to="/settings"
                        onClick={() => setOpen(false)}
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button
                        className="dropdown-item py-2 text-danger"
                        onClick={() => {
                          setOpen(false);
                          // Add logout logic here
                          alert("Logout clicked");
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
