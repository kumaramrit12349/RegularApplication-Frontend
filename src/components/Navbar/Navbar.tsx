import React, { useState } from "react";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* ===== Left Section (Logo + Name) ===== */}
      <div className="navbar-left">
        {/* Logo image/icon */}
        <img
          src="./logo.png" // place logo.png inside public folder
          alt="Logo"
          className="navbar-logo"
        />
        <span className="navbar-title">Regular Application</span>
      </div>

      {/* ===== Right Section (Profile Icon) ===== */}
      <div
        className="navbar-right"
        onClick={() => setOpen(!open)}
        title="User Profile"
      >
        👤
        {open && (
          <div className="profile-dropdown">
            <div className="profile-header">
              <div className="profile-avatar">👤</div>
              <div className="profile-info">
                <div className="profile-name">Doli Kumari</div>
                <div className="profile-email">doli@example.com</div>
              </div>
            </div>
            <hr />
            <ul className="profile-menu">
              <li>My Account</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
