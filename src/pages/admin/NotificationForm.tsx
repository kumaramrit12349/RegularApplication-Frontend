// components/NotificationForm/NotificationForm.tsx
import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import type { NotificationFormValues } from "../../types/notification";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import Toast from "../../components/Toast/Toast";
import { NOTIFICATION_CATEGORIES } from "../../constant/SharedConstant";

type Props = {
  mode: "create" | "edit";
  initialValues: NotificationFormValues;
  onSubmit: (values: NotificationFormValues) => Promise<void>;
};

const NotificationForm: React.FC<Props> = ({
  mode,
  initialValues,
  onSubmit,
}) => {
  const [form, setForm] = useState<NotificationFormValues>(initialValues);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
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

    setForm(
      (prev) =>
        ({
          ...prev,
          [name]:
            type === "checkbox"
              ? checked
              : target.type === "number"
              ? value === ""
                ? ""
                : Number(value)
              : value,
        } as NotificationFormValues)
    );
  };

  const handleShortDescriptionChange = (value: string) => {
    setForm((prev) => ({ ...prev, short_description: value }));
  };

  const handleLongDescriptionChange = (value: string) => {
    setForm((prev) => ({ ...prev, long_description: value }));
  };

  const handleImportantDatesDetailsChange = (value: string) => {
    setForm((prev) => ({ ...prev, important_date_details: value }));
  };

  const handleOtherFeeDetailsChange = (value: string) => {
    setForm((prev) => ({ ...prev, other_fee_details: value }));
  };

  const handleAgeRelaxationChange = (value: string) => {
    setForm((prev) => ({ ...prev, age_relaxation_details: value }));
  };

  const handleAdditionalDetailsChange = (value: string) => {
    setForm((prev) => ({ ...prev, additional_details: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmSubmit = async () => {
    setShowModal(false);
    setSaving(true);

    try {
      await onSubmit(form);
      showToast(
        mode === "create"
          ? "Notification created successfully!"
          : "Notification updated successfully!",
        "success"
      );
    } catch (err: any) {
      showToast(err?.message || "Failed to save notification", "error");
      setSaving(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h5 className="mt-4">Basic Information</h5>
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
            {NOTIFICATION_CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
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

        {/* Short / Long description */}
        <div className="mb-3">
          <label className="form-label">Short Description</label>
          <ReactQuill
            theme="snow"
            value={form.short_description}
            onChange={handleShortDescriptionChange}
            placeholder="Enter short summary..."
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Long Description</label>
          <ReactQuill
            theme="snow"
            value={form.long_description}
            onChange={handleLongDescriptionChange}
            placeholder="Enter detailed description..."
          />
        </div>

        {/* Toggles */}
        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="admitcard"
            name="has_admit_card"
            checked={form.has_admit_card}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="admitcard">
            Admit Card Published
          </label>
        </div>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="result"
            name="has_result"
            checked={form.has_result}
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
            name="has_answer_key"
            checked={form.has_answer_key}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="answerkey">
            Answer Key Published
          </label>
        </div>

        {/* Important dates */}
        <h5 className="mt-4">Important Dates</h5>
        {[
          "start_date",
          "last_date_to_apply",
          "exam_date",
          "admit_card_available_date",
          "result_date",
        ].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">
              {field.replace(/_/g, " ")}
            </label>
            <input
              name={field}
              type="date"
              className="form-control"
              value={(form as any)[field] || ""}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="mb-3">
          <label className="form-label">Important Date Details</label>
          <ReactQuill
            theme="snow"
            value={form.important_date_details || ""}
            onChange={handleImportantDatesDetailsChange}
          />
        </div>

        {/* Fees */}
        <h5 className="mt-4">Fees</h5>
        {["general_fee", "obc_fee", "sc_fee", "st_fee", "ph_fee"].map(
          (field) => (
            <div className="mb-3" key={field}>
              <label className="form-label text-capitalize">
                {field.replace(/_/g, " ")}
              </label>
              <input
                name={field}
                type="number"
                step="0.01"
                className="form-control"
                value={(form as any)[field]}
                onChange={handleChange}
              />
            </div>
          )
        )}

        <div className="mb-3">
          <label className="form-label">Other Fee Details</label>
          <ReactQuill
            theme="snow"
            value={form.other_fee_details}
            onChange={handleOtherFeeDetailsChange}
          />
        </div>

        {/* Ages */}
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
          <ReactQuill
            theme="snow"
            value={form.age_relaxation_details}
            onChange={handleAgeRelaxationChange}
          />
        </div>

        {/* Education */}
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
          <ReactQuill
            theme="snow"
            value={form.additional_details || ""}
            onChange={handleAdditionalDetailsChange}
          />
        </div>

        {/* Links */}
        <h5 className="mt-4">Links</h5>
        {[
          "youtube_link",
          "apply_online_url",
          "notification_pdf_url",
          "official_website_url",
          "admit_card_url",
          "answer_key_url",
          "result_url",
          "other_links",
        ].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">
              {field.replace(/_/g, " ")}
            </label>
            <input
              name={field}
              type="url"
              className="form-control"
              value={(form as any)[field] || ""}
              onChange={handleChange}
            />
          </div>
        ))}

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={saving}
        >
          {saving
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
            ? "Add Notification"
            : "Update Notification"}
        </button>
      </form>

      <ConfirmModal
        show={showModal}
        title={mode === "create" ? "Add Notification" : "Update Notification"}
        message={
          mode === "create"
            ? "Are you sure you want to create this notification?"
            : "Are you sure you want to update this notification?"
        }
        confirmText={mode === "create" ? "Create" : "Update"}
        confirmVariant="primary"
        onConfirm={confirmSubmit}
        onCancel={() => setShowModal(false)}
      />

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((t) => ({ ...t, show: false }))}
      />
    </>
  );
};

export default NotificationForm;
