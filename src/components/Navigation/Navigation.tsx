import React from "react";


const Navigation: React.FC = () => {
  return (
    <>
      {/* Main Navbar */}
      <nav className="main-navbar">
        <div className="container">
          
        </div>
      </nav>

      {/* Sub Navbar */}
      <nav className="sub-navbar">
        <div className="container">
          <ul className="sub-nav-list mt-4">
            <li className="sub-nav-item">Home</li>
            <li className="sub-nav-item">Jobs</li>
            <li className="sub-nav-item">Admit Cards</li>
            <li className="sub-nav-item">Results</li>
            <li className="sub-nav-item">Entrance Exams</li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
