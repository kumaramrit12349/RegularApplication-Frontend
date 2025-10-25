import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-dark text-white py-4 mt-auto border-top border-secondary">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
          <p className="mb-0 small">
            © {new Date().getFullYear()} Regular Application. All rights reserved.
          </p>
        </div>
        <div className="col-md-6 text-center text-md-end">
          <a href="/privacy" className="text-muted text-decoration-none small me-3">
            Privacy Policy
          </a>
          <a href="/terms" className="text-muted text-decoration-none small">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
