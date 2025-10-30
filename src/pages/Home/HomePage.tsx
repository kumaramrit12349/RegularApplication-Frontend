// src/pages/HomePage.tsx
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Navigation from "../../components/Navigation/Navigation";
import SearchBar from "../../components/SearchBar/SearchBar";
import ListView from "../../features/notifications/components/ListView/ListView";
import Footer from "../../components/Footer/Footer";

const temp = {
  job: [
    { name: "Notification 1", notification_id: "Notification#1" },
    { name: "Notification 2", notification_id: "Notification#2" },
    { name: "Notification 3", notification_id: "Notification#3" },
    { name: "Notification 4", notification_id: "Notification#4" },
    { name: "Notification 5", notification_id: "Notification#5" },
  ],
  admitCard: [
    { name: "Notification 1", notification_id: "Notification#1" },
    { name: "Notification 2", notification_id: "Notification#2" },
    { name: "Notification 3", notification_id: "Notification#3" },
    { name: "Notification 4", notification_id: "Notification#4" },
    { name: "Notification 5", notification_id: "Notification#5" },
  ],
  result: [
    { name: "Notification 1", notification_id: "Notification#1" },
    { name: "Notification 2", notification_id: "Notification#2" },
    { name: "Notification 3", notification_id: "Notification#3" },
  ],
  entrance: [
    { name: "Notification 1", notification_id: "Notification#1" },
    { name: "Notification 2", notification_id: "Notification#2" },
  ],
  answer: [
    { name: "Notification 1", notification_id: "Notification#1" },
  ]
};

const HomePage: React.FC = () => {
  const handleItemClick = (item: { name: string; notification_id: string }) => {
    alert(`Clicked on ${item.name} and ${item.notification_id}`);
  };

  return (
    <div className='page'>
      <div className="container py-4">
        <div className="row g-4">
          {Object.entries(temp).map(([category, notifications]) => (
            <div key={category} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <ListView
                  title={category}
                  items={notifications}
                  onItemClick={handleItemClick}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
