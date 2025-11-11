import React, { useState } from "react";

interface Notification {
  name: string;
  notification_id: string;
}

interface ListViewProps {
  title: string;
  items: Notification[];
  loading?: boolean;
  onItemClick?: (item: Notification) => void;
}

const ListView: React.FC<ListViewProps> = ({ title, items, loading = false, onItemClick }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, 5);

  return (
    <div className="border-0 mb-4">
      {/* Card Header */}
      <div className="card-header bg-primary text-white py-3">
        <h5 className="mb-0 fw-semibold text-capitalize">{title}</h5>
      </div>

      {/* Card Body */}
      <div className="card-body p-0">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <p className="mb-0">No notifications available</p>
          </div>
        ) : (
          <>
            <ul className="list-group list-group-flush">
              {displayedItems.map((item, index) => (
                <li
                  key={item.notification_id || index}
                  className="list-group-item list-group-item-action d-flex align-items-center gap-3 py-3"
                  onClick={() => onItemClick && onItemClick(item)}
                  style={{
                    cursor: onItemClick ? "pointer" : "default",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (onItemClick) {
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "";
                  }}
                >
                  <span
                    className="rounded-circle bg-primary"
                    style={{
                      width: "8px",
                      height: "8px",
                      flexShrink: 0,
                    }}
                  ></span>
                  <div className="flex-grow-1">
                    <span className="text-dark">{item.name}</span>
                  </div>
                  {onItemClick && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="text-muted"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  )}
                </li>
              ))}
            </ul>
            {items.length > 5 && (
              <div className="p-3 bg-light border-top">
                <button
                  className="btn btn-outline-primary w-100"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="me-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                        />
                      </svg>
                      See Less
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="me-2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                        />
                      </svg>
                      See More ({items.length - 5} more)
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ListView;
