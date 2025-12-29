// Navbar.tsx (No Hamburger Menu)
import React from "react";
import { Link } from "react-router-dom";
import ProfileSection from "../../features/notifications/components/ProfileSection";
import {
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
// Navbar.tsx (Fixed Profile Dropdown)
<nav className="navbar navbar-dark bg-dark shadow-sm sticky-top" style={{ zIndex: 1060 }}>
  <div className="container-fluid">
    {/* Left: Logo + Apply India */}
    <Link className="navbar-brand d-flex align-items-center pe-3" to="/">
      <img
        src="/logo.png"
        alt="Logo"
        height="35"
        className="me-2 flex-shrink-0"
        style={{ borderRadius: "8px" }}
      />
      <span className="fw-semibold fs-6">{WEBSITE_NAME}</span>
    </Link>

    {/* Right: Profile Section - FIXED Z-INDEX */}
    <div className="d-flex align-items-center justify-content-end position-relative">
      <ul className="navbar-nav mb-0 dropdown" style={{ zIndex: 1070 }}>
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
