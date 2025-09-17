// ListView.tsx
import React, { useState } from "react";

interface Notification {
  name: string;
  notification_id: string;
}

interface ListViewProps {
  title: string;
  items: Notification[];
  onItemClick?: (item: Notification) => void;
}

const ListView: React.FC<ListViewProps> = ({ title, items, onItemClick }) => {
  const [showAll, setShowAll] = useState(false);

  // show only first 5 if not expanded
  const displayedItems = showAll ? items : items.slice(0, 5);

  return (
    <>
      {/* Card Header */}
      <h5 className="card-header bg-primary text-white text-capitalize">
        {title}
      </h5>

      {/* Card Body */}
      <div className="card-body p-0">
        <ul className="list-group list-group-flush">
          {displayedItems.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex align-items-center gap-2 list-item-clickable"
              onClick={() => onItemClick && onItemClick(item)}
            >
              {/* Blank Circle */}
              <span className="circle-indicator"></span>
              <strong>{item.name}</strong>
            </li>
          ))}
        </ul>

        {/* Show see more/less button only if more than 5 items */}
        {items.length > 5 && (
          <div className="text-center p-2">
            <button
              className="see-more-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll
                ? "See less notifications..."
                : "See more notifications..."}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ListView;
