import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface ProfileSectionProps {
  isAuthenticated: boolean;
  givenName?: string;
  familyName?: string;
  email?: string;
  onLogout: () => void;
  onShowAuthPopup: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  isAuthenticated,
  givenName,
  familyName,
  email,
  onLogout,
  onShowAuthPopup,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // For initials: first letter of given_name + first letter of family_name
  const firstInitial = givenName?.trim()?.[0]?.toUpperCase() || "";
  const lastInitial = familyName?.trim()?.[0]?.toUpperCase() || "";
  const initials =
    (firstInitial + lastInitial) || "👤";

  const fullName =
    [givenName, familyName].filter(Boolean).join(" ") || "Guest User";
  const displayEmail = email || "";

  if (!isAuthenticated) {
    return (
      <>
        <li className="nav-item me-2">
          <button
            className="btn btn-outline-light btn-sm"
            onClick={onShowAuthPopup}
          >
            Log in
          </button>
        </li>
        <li className="nav-item">
          <button
            className="btn btn-primary btn-sm"
            onClick={onShowAuthPopup}
          >
            Sign up
          </button>
        </li>
      </>
    );
  }

  return (
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
          <span style={{ fontSize: "16px", fontWeight: 600 }}>{initials}</span>
        </div>
        <span className="d-none d-md-inline me-1">{fullName}</span>
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
          <div className="px-3 py-3 border-bottom">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                style={{ width: "50px", height: "50px", fontSize: "20px", fontWeight: 600 }}
              >
                {initials}
              </div>
              <div>
                <div className="fw-semibold">{fullName}</div>
                {displayEmail && (
                  <div className="text-muted small">{displayEmail}</div>
                )}
              </div>
            </div>
          </div>

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
                  onLogout();
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
};

export default ProfileSection;
