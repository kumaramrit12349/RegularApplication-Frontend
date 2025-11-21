import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNotificationById, approveNotification } from "../../services/api";
import NotificationDetailView from "../../components/Generic/NotificationDetailView";

const ReviewNotificationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notification, setNotification] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    if (id) {
      getNotificationById(id)
        .then((data) => {
          setNotification(data.notification);
          setLoading(false);
        })
        .catch(() => {
          alert("Failed to load notification");
          navigate("/admin/dashboard");
        });
    }
  }, [id, navigate]);

  const handleApprove = async () => {
    if (window.confirm("Are you sure you want to approve this notification?")) {
      setApproving(true);
      try {
        await approveNotification(id!);
        alert("Notification approved successfully!");
        navigate("/admin/dashboard");
      } catch (err: any) {
        alert(err.message);
        setApproving(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Notification not found</div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <NotificationDetailView
        notification={notification}
        isAdmin={true}
        onApprove={handleApprove}
        approving={approving}
      />
    </div>
  );
};

export default ReviewNotificationPage;
