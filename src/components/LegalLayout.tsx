import React from "react";

const LegalLayout: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="container my-5">
      <div className="bg-white shadow-sm rounded-4 p-4 p-md-5">
        <h1 className="mb-4 fw-bold">{title}</h1>
        <div className="legal-content">{children}</div>
      </div>
    </div>
  );
};

export default LegalLayout;
