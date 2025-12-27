// pages/EditNotificationPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getNotificationById, updateNotification } from "../../services/api";
import {
  emptyNotificationForm,
  type NotificationFormValues,
} from "../../types/notification";
import NotificationForm from "./NotificationForm";

const EditNotificationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] =
    useState<NotificationFormValues | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getNotificationById(id)
      .then((data) => {
        const n = data.notification;
        // map backend fields into NotificationFormValues shape if needed
        const mapped: NotificationFormValues = {
          ...emptyNotificationForm,
          ...n,
        };
        setInitialValues(mapped);
        setLoading(false);
      })
      .catch(() => {
        navigate("/admin/dashboard");
      });
  }, [id, navigate]);

  const handleUpdate = async (values: NotificationFormValues) => {
    if (!id) return;
    await updateNotification(id, values);
    navigate("/admin/dashboard");
  };

  if (loading || !initialValues) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container bg-white rounded mt-5 p-4 shadow mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Edit Notification</h2>
        <Link to="/admin/dashboard" className="btn btn-outline-secondary">
          ← Back to Dashboard
        </Link>
      </div>

      <NotificationForm
        mode="edit"
        initialValues={initialValues}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default EditNotificationPage;
