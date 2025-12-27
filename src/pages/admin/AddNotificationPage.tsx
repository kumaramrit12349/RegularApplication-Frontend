// pages/AddNotificationPage.tsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { addNotification } from "../../services/api";
import {
  emptyNotificationForm,
  type NotificationFormValues,
} from "../../types/notification";
import NotificationForm from "./NotificationForm";

const AddNotificationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreate = async (values: NotificationFormValues) => {
    await addNotification(values);
    navigate("/admin/dashboard");
  };

  return (
    <div className="container bg-white rounded mt-5 p-4 shadow">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Add New Notification</h2>
        <Link to="/admin/dashboard" className="btn btn-secondary">
          ← Back to Dashboard
        </Link>
      </div>

      <NotificationForm
        mode="create"
        initialValues={emptyNotificationForm}
        onSubmit={handleCreate}
      />
    </div>
  );
};

export default AddNotificationPage;
