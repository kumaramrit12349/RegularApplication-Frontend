import React, { useState } from "react";
import { addNotification } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import Toast from "../../components/Toast/Toast";

const initialForm = {
  title: "",
  category: "",
  department: "",
  total_vacancies: "",
  isAdminCardAvailable: false,
  isResultPublished: false,
  isAnswerKeyPublished: false,
  application_begin_date: "",
  last_date_for_apply: "",
  exam_date: "",
  admit_card_available_date: "",
  result_date: "",
  general_fee: "",
  obc_fee: "",
  sc_fee: "",
  st_fee: "",
  ph_fee: "",
  other_fee_details: "",
  min_age: "",
  max_age: "",
  age_relaxation_details: "",
  qualification: "",
  specialization: "",
  min_percentage: "",
  additional_details: "",
  apply_online_url: "",
  notification_pdf_url: "",
  official_website_url: "",
  admit_card_url: "",
  result_url: "",
  answer_key_url: "",
  other_links: "",
};

const AddNotificationPage: React.FC = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const confirmAdd = async () => {
    setShowModal(false);
    setLoading(true);

    try {
      await addNotification(form);
      showToast("Notification added successfully! Redirecting...", "success");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1500);
    } catch (err: any) {
      showToast(err.message || "Failed to create notification", "error");
      setLoading(false);
    }
  };

  return (
    <div className="container bg-white rounded mt-5 p-4 shadow">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Add New Notification</h2>
        <Link to="/admin/dashboard" className="btn btn-secondary">
          ← Back to Dashboard
        </Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <h5 className="mt-4">Notification Details</h5>

        <div className="mb-3">
          <label className="form-label">Title *</label>
          <input
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category *</label>
          <select
            name="category"
            className="form-select"
            value={form.category}
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

        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            name="department"
            className="form-control"
            value={form.department}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Total Vacancies</label>
          <input
            name="total_vacancies"
            type="number"
            className="form-control"
            value={form.total_vacancies}
            onChange={handleChange}
          />
        </div>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="admincard"
            name="isAdminCardAvailable"
            checked={form.isAdminCardAvailable}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="admincard">
            Admit Card Available
          </label>
        </div>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="result"
            name="isResultPublished"
            checked={form.isResultPublished}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="result">
            Result Published
          </label>
        </div>

        <div className="form-check form-switch mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="answerkey"
            name="isAnswerKeyPublished"
            checked={form.isAnswerKeyPublished}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="answerkey">
            Answer Key Published
          </label>
        </div>

        <h5 className="mt-4">Important Dates</h5>
        {[
          "application_begin_date",
          "last_date_for_apply",
          "exam_date",
          "admit_card_available_date",
          "result_date",
        ].map((d) => (
          <div className="mb-3" key={d}>
            <label className="form-label text-capitalize">
              {d.replace(/_/g, " ")}
            </label>
            <input
              name={d}
              type="date"
              className="form-control"
              value={form[d as keyof typeof form] as string}
              onChange={handleChange}
            />
          </div>
        ))}

        <h5 className="mt-4">Fees</h5>
        {["general_fee", "obc_fee", "sc_fee", "st_fee", "ph_fee"].map((f) => (
          <div className="mb-3" key={f}>
            <label className="form-label text-capitalize">
              {f.replace(/_/g, " ")}
            </label>
            <input
              name={f}
              type="number"
              step="0.01"
              className="form-control"
              value={form[f as keyof typeof form] as string}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="mb-3">
          <label className="form-label">Other Fee Details</label>
          <textarea
            name="other_fee_details"
            className="form-control"
            value={form.other_fee_details}
            onChange={handleChange}
          />
        </div>

        <h5 className="mt-4">Eligibility</h5>
        <div className="mb-3">
          <label className="form-label">Min Age</label>
          <input
            name="min_age"
            type="number"
            className="form-control"
            value={form.min_age}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Max Age</label>
          <input
            name="max_age"
            type="number"
            className="form-control"
            value={form.max_age}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age Relaxation Details</label>
          <textarea
            name="age_relaxation_details"
            className="form-control"
            value={form.age_relaxation_details}
            onChange={handleChange}
          />
        </div>

        <h5 className="mt-4">Educational Qualifications</h5>
        <div className="mb-3">
          <label className="form-label">Qualification</label>
          <input
            name="qualification"
            className="form-control"
            value={form.qualification}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Specialization</label>
          <input
            name="specialization"
            className="form-control"
            value={form.specialization}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Min Percentage</label>
          <input
            name="min_percentage"
            type="number"
            step="0.01"
            className="form-control"
            value={form.min_percentage}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Additional Details</label>
          <textarea
            name="additional_details"
            className="form-control"
            value={form.additional_details}
            onChange={handleChange}
          />
        </div>

        <h5 className="mt-4">Links</h5>
        {[
          "apply_online_url",
          "notification_pdf_url",
          "official_website_url",
          "admit_card_url",
          "result_url",
          "answer_key_url",
          "other_links",
        ].map((l) => (
          <div className="mb-3" key={l}>
            <label className="form-label text-capitalize">
              {l.replace(/_/g, " ")}
            </label>
            <input
              name={l}
              type="url"
              className="form-control"
              value={form[l as keyof typeof form] as string}
              onChange={handleChange}
            />
          </div>
        ))}

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Notification"}
        </button>
      </form>
      {/* Confirmation Modal */}
      <ConfirmModal
        show={showModal}
        title="Add Notification"
        message="Are you sure you want to create this notification? It will be saved as pending and need approval before going live."
        confirmText="Create"
        confirmVariant="success"
        onConfirm={confirmAdd}
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

export default AddNotificationPage;
