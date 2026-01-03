import React from "react";
import { APPLYINDIA_SOCIAL_LINKS, WEBSITE_NAME } from "../../constant/SharedConstant";

const Footer: React.FC = () => {
  return (
    <footer className="footer-bg text-light mt-auto">
      <div className="container py-5">

        {/* ================= MAIN CONTENT ================= */}
        <div className="row gy-4 align-items-start text-center text-md-start">

          {/* ---------- About ---------- */}
          <div className="col-12 col-md-4">
            <h6 className="footer-title">About Apply India</h6>
            <p className="footer-text">
              Apply India provides verified government job, exam, and
              scholarship notifications across India. Stay updated, stay ahead.
            </p>
          </div>

          {/* ---------- Legal ---------- */}
          <div className="col-12 col-md-4">
            <h6 className="footer-title">Legal</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/disclaimer">Disclaimer</a></li>
              <li><a href="/about">About Us</a></li>
            </ul>
          </div>

          {/* ---------- Social ---------- */}
          <div className="col-12 col-md-4">
            <h6 className="footer-title">Connect With Us</h6>

            <div className="social-wrap justify-content-center justify-content-md-start">
              {APPLYINDIA_SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="social-icon"
                >
                  <img src={item.icon} alt={item.name} />
                </a>
              ))}
            </div>

            <div className="mt-3">
              <a href="/feedback" className="btn btn-outline-light btn-sm">
                Send Feedback
              </a>
            </div>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <hr className="footer-divider my-4" />

        {/* ================= BOTTOM ================= */}
        <div className="text-center small text-muted">
          © {new Date().getFullYear()} {WEBSITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
