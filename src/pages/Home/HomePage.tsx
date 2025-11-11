import React, { useEffect, useState } from "react";
import ListView from "../../features/notifications/components/ListView/ListView";
import { fetchHomePageNotifications } from "../../services/api";

interface ListViewNotification {
  name: string;
  notification_id: string;
}

interface GroupedNotifications {
  [category: string]: ListViewNotification[];
}

const HomePage: React.FC = () => {
  const [grouped, setGrouped] = useState<GroupedNotifications>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const apiResponse = await fetchHomePageNotifications();
        setGrouped(apiResponse.data);
      } catch (error) {
        console.error("Failed to fetch homepage notifications", error);
        setGrouped({});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleItemClick = (item: ListViewNotification) => {
    alert(`Clicked on ${item.name} and ${item.notification_id}`);
  };

  return (
    <div className="page">
      <div className="container py-4">
        <div className="row g-4">
          {loading ? (
            // Loading placeholder for entire page (optional)
            <div className="text-center m-auto py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            Object.entries(grouped).map(([category, notifications]) => (
              <div key={category} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <ListView
                    title={category}
                    items={notifications}
                    loading={loading}
                    onItemClick={handleItemClick}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
