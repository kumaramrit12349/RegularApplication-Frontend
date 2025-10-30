import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getNotificationById, updateNotification } from "../../services/api";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import Toast from "../../components/Toast/Toast";

const EditNotificationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Confirmation modal state
  const [showModal, setShowModal] = useState(false);
  // Toast state
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });
  const showToast = (message: string, type: "success" | "error") => {
    setToast({ show: true, message, type });
  };

  useEffect(() => {
    if (id) {
      getNotificationById(id)
        .then((data) => {
          setForm(data.notification);
          setLoading(false);
        })
        .catch(() => {
          showToast("Failed to load notification", "error");
          setTimeout(() => navigate("/admin/dashboard"), 2000);
        });
    }
  }, [id, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = target instanceof HTMLInputElement ? target.checked : false;

    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true); // Show confirmation modal
  };

  const confirmUpdate = async () => {
    setShowModal(false);
    setSaving(true);

    try {
      await updateNotification(id!, form);
      showToast("Notification updated successfully! Redirecting...", "success");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    } catch (err: any) {
      showToast(err.message || "Failed to update notification", "error");
      setSaving(false);
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

  return (
    <div className="container bg-white rounded mt-5 p-4 shadow mb-5">
      {/* Header with Back Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Edit Notification</h2>
        <Link to="/admin/dashboard" className="btn btn-outline-secondary">
          ← Back to Dashboard
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <h5 className="mt-4 mb-3 text-primary">📋 Basic Information</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Title *</label>
            <input
              name="title"
              className="form-control"
              value={form.title || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Category *</label>
            <select
              name="category"
              className="form-select"
              value={form.category || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Job">Job</option>
              <option value="Result">Result</option>
              <option value="Exam">Exam</option>
              <option value="Admit Card">Admit Card</option>
              <option value="Answer Key">Answer Key</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Department</label>
            <input
              name="department"
              className="form-control"
              value={form.department || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Total Vacancies</label>
            <input
              name="total_vacancies"
              type="number"
              className="form-control"
              value={form.total_vacancies || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="admincard"
                name="isadmincardavailable"
                checked={form.isadmincardavailable || false}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="admincard">
                Admit Card Available
              </label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="result"
                name="isresultpublished"
                checked={form.isresultpublished || false}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="result">
                Result Published
              </label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="answerkey"
                name="isanswerkeypublished"
                checked={form.isanswerkeypublished || false}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="answerkey">
                Answer Key Published
              </label>
            </div>
          </div>
        </div>

        {/* Important Dates */}
        <h5 className="mt-4 mb-3 text-success">📅 Important Dates</h5>
        <div className="row">
          {[
            "application_begin_date",
            "last_date_for_apply",
            "exam_date",
            "admit_card_available_date",
            "result_date",
          ].map((field) => (
            <div className="col-md-6 mb-3" key={field}>
              <label className="form-label text-capitalize">
                {field.replace(/_/g, " ")}
              </label>
              <input
                name={field}
                type="date"
                className="form-control"
                value={
                  form[field]
                    ? new Date(form[field]).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        {/* Fees */}
        <h5 className="mt-4 mb-3 text-warning">💰 Application Fees</h5>
        <div className="row">
          {["general_fee", "obc_fee", "sc_fee", "st_fee", "ph_fee"].map(
            (field) => (
              <div className="col-md-4 mb-3" key={field}>
                <label className="form-label text-capitalize">
                  {field.replace(/_/g, " ")}
                </label>
                <input
                  name={field}
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={form[field] || ""}
                  onChange={handleChange}
                />
              </div>
            )
          )}
          <div className="col-12 mb-3">
            <label className="form-label">Other Fee Details</label>
            <textarea
              name="other_fee_details"
              className="form-control"
              rows={2}
              value={form.other_fee_details || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Eligibility */}
        <h5 className="mt-4 mb-3 text-info">✔️ Eligibility Criteria</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Min Age</label>
            <input
              name="min_age"
              type="number"
              className="form-control"
              value={form.min_age || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Max Age</label>
            <input
              name="max_age"
              type="number"
              className="form-control"
              value={form.max_age || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Age Relaxation Details</label>
            <textarea
              name="age_relaxation_details"
              className="form-control"
              rows={2}
              value={form.age_relaxation_details || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Educational Qualifications */}
        <h6 className="mt-3 mb-3">Educational Qualifications</h6>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Qualification</label>
            <input
              name="qualification"
              className="form-control"
              value={form.qualification || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Specialization</label>
            <input
              name="specialization"
              className="form-control"
              value={form.specialization || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Min Percentage</label>
            <input
              name="min_percentage"
              type="number"
              step="0.01"
              className="form-control"
              value={form.min_percentage || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Additional Details</label>
            <textarea
              name="additional_details"
              className="form-control"
              rows={2}
              value={form.additional_details || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Links */}
        <h5 className="mt-4 mb-3 text-secondary">🔗 Important Links</h5>
        <div className="row">
          {[
            "apply_online_url",
            "notification_pdf_url",
            "official_website_url",
            "admit_card_url",
            "result_url",
            "answer_key_url",
            "other_links",
          ].map((field) => (
            <div className="col-md-6 mb-3" key={field}>
              <label className="form-label text-capitalize">
                {field.replace(/_/g, " ")}
              </label>
              <input
                name={field}
                type="url"
                className="form-control"
                value={form[field] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={saving}
          >
            {saving ? "Updating..." : "Update Notification"}
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      <ConfirmModal
        show={showModal}
        title="Update Notification"
        message="Are you sure you want to update this notification? This will save all your changes."
        confirmText="Update"
        confirmVariant="primary"
        onConfirm={confirmUpdate}
        onCancel={() => setShowModal(false)}
      />

      {/* Toast Notification */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default EditNotificationPage;
