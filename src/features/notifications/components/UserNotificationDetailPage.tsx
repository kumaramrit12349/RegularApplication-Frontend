import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNotificationBySlug } from "../../../services/api";
import NotificationDetailView from "../../../components/Generic/NotificationDetailView";

const UserNotificationDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  console.log('title', slug);
  // const id = "9e0944c6-e351-4ff8-9eac-2c26c217fd85";
  const [notification, setNotification] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      getNotificationBySlug(slug)
        .then((data) => {
          setNotification(data.notification);
          setLoading(false);
        })
        .catch(() => {
          setNotification(null);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return <div className="container mt-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }
  if (!notification) {
    return <div className="container mt-5"><div className="alert alert-danger">Notification not found</div></div>;
  }
  return <div className="container mt-5 mb-5">
    <NotificationDetailView notification={notification} />
  </div>;
};

export default UserNotificationDetailPage;
