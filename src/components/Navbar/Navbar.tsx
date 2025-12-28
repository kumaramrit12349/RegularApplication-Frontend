// Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import ProfileSection from "../../features/notifications/components/ProfileSection";
import {
  NOTIFICATION_CATEGORIES,
  WEBSITE_NAME,
} from "../../constant/SharedConstant";

interface NavbarProps {
  isAuthenticated: boolean;
  givenName?: string;
  familyName?: string;
  userEmail?: string;
  onLogout: () => void;
  onShowAuthPopup: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isAuthenticated,
  givenName,
  familyName,
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
        {/* Left: logo + brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/logo.png"
            alt="Logo"
            height="40"
            className="me-2"
            style={{ borderRadius: "8px" }}
          />
          <span className="fw-semibold d-none d-sm-inline">{WEBSITE_NAME}</span>
        </Link>

        {/* Right (always visible): profile on mobile + toggler */}
        <div className="d-flex align-items-center">
          {/* Show only avatar on very small screens, full profile on md+ */}
          <ul className="navbar-nav d-flex d-lg-none me-2">
            <ProfileSection
              isAuthenticated={isAuthenticated}
              givenName={givenName}
              familyName={familyName}
              email={userEmail}
              onLogout={onLogout}
              onShowAuthPopup={onShowAuthPopup}
            />
          </ul>

          {/* Burger toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Collapsible content: tabs + desktop profile */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Center / left navigation links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Home link */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {/* Dynamic category links */}
            {NOTIFICATION_CATEGORIES.filter((cat) => cat.value !== "all") // Skip "all"
              .map((category) => (
                <li key={category.value} className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/notification/category/${category.value}`}
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
          </ul>

          {/* Desktop profile (hidden on small screens, shown on lg+) */}
          <ul className="navbar-nav align-items-lg-center d-none d-lg-flex">
            <ProfileSection
              isAuthenticated={isAuthenticated}
              givenName={givenName}
              familyName={familyName}
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
