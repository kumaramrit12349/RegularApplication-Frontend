// ListView.tsx
import React from "react";

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
  return (
    <>
      {/* Card Header */}
      <h5 className="card-header bg-primary text-white text-capitalize">
        {title}
      </h5>

      {/* Card Body */}
      <div className="card-body p-0">
        <ul className="list-group list-group-flush">
          {items.map((item, index) => (
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
      </div>
    </>
  );
};

export default ListView;
