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
  showSeeMore?: boolean;
  showAllItems?: boolean;
}

const ListView: React.FC<ListViewProps> = ({
  title,
  items,
  loading = false,
  onItemClick,
  showSeeMore = true,
  showAllItems = false
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAllItems ? items : (showAll ? items : items.slice(0, 5));

  return (
    <div className="border-0 mb-4 shadow-sm rounded bg-white">
      {/* Card Header */}
      <div
        className="card-header bg-primary text-white py-3"
        style={{
          borderTopLeftRadius: "0.6rem",
          borderTopRightRadius: "0.6rem",
        }}
      >
        <h5 className="mb-0 fw-semibold text-capitalize ms-2" style={{ fontSize: "1.1rem" }}>
          {title}
        </h5>
      </div>
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
            <ul className="list-group list-group-flush px-1 px-sm-2">
              {displayedItems.map((item, index) => (
                <li
                  key={item.notification_id || index}
                  className="list-group-item d-flex align-items-center gap-2 py-3 border-0"
                  onClick={() => onItemClick && onItemClick(item)}
                  style={{
                    cursor: onItemClick ? "pointer" : "default",
                    transition: "background 0.2s, box-shadow 0.2s",
                    borderRadius: "0.6rem",
                    marginBottom: "0.5rem",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    fontSize: "1.06rem"
                  }}
                  onMouseEnter={(e) => {
                    if (onItemClick) {
                      e.currentTarget.style.backgroundColor = "#f5f9fd";
                      e.currentTarget.style.boxShadow = "0 2px 8px #d9e8fa";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "";
                    e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                  }}
                >
                  <span
                    className="rounded-circle bg-primary d-inline-block"
                    style={{
                      width: "10px",
                      height: "10px",
                      flexShrink: 0,
                      marginRight: "10px",
                    }}
                  />
                  <div className="flex-grow-1">
                    <span className="text-dark" style={{ wordBreak: "break-word", fontSize: "1.08rem" }}>
                      {item.name}
                    </span>
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
            {showSeeMore && !showAllItems && items.length > 5 && (
              <div className="p-3 bg-light border-top">
                {showAll ? (
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => setShowAll(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                    </svg>
                    See Less
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => {
                      window.open(`/notification/category/${encodeURIComponent(title)}`, "_blank");
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                    </svg>
                    See More
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ListView;
