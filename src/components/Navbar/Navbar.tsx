// Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import ProfileSection from "../../features/notifications/components/ListView/ProfileSection";

interface NavbarProps {
  isAuthenticated: boolean;
  userName?: string;
  userEmail?: string;
  onLogout: () => void;
  onShowAuthPopup: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  userName,
  userEmail,
  onLogout,
  onShowAuthPopup,
}) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top"
      style={{ zIndex: 1030 }}
    >
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

        {/* Right Section */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-lg-center">
            <ProfileSection
              isAuthenticated={isAuthenticated}
              name={userName}
              email={userEmail}
              onLogout={onLogout}
              onShowAuthPopup={onShowAuthPopup}
            />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
