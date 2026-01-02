import React from "react";
import {
  BsCalendar,
  BsFillPersonFill,
  BsCurrencyRupee,
  BsLink45Deg,
  BsArrowUpRightCircle,
  BsGear,
  BsDownload,
  BsFileEarmarkText,
} from "react-icons/bs";
import { FcViewDetails } from "react-icons/fc";
import { formatCategoryTitle, getId } from "../../services/utils";

/* ---------------- Helpers ---------------- */

const formatDate = (d?: string) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Not Released";

const formatDateTime = (d?: string) =>
  d ? new Date(d).toLocaleString("en-IN") : "—";

const formatCurrency = (amount?: string | number) =>
  amount ? `₹${parseFloat(String(amount)).toLocaleString()}` : "—";

const formatPercentage = (value?: string | number) => {
  if (value === null || value === undefined) {
    return "Not Specified";
  }
  return `${Number(value)}`;
};

const getGroupedFees = (notification: any) => {
  const map: Record<string, string[]> = {};
  const fees = [
    { key: "general_fee", label: "Gen" },
    { key: "obc_fee", label: "OBC" },
    { key: "sc_fee", label: "SC" },
    { key: "st_fee", label: "ST" },
    { key: "ph_fee", label: "PH" },
  ];

  fees.forEach(({ key, label }) => {
    const value = formatCurrency(notification[key]);
    if (value !== "—") {
      map[value] = map[value] || [];
      map[value].push(label);
    }
  });

  return Object.entries(map);
};

/* ---------------- UI Components ---------------- */

const Card = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="card border-0 shadow-sm rounded-4 h-100">
    <div className="card-header bg-light border-0 fw-semibold d-flex align-items-center gap-2">
      {icon}
      {title}
    </div>
    <div className="card-body">{children}</div>
  </div>
);

const LabelValue = ({
  label,
  value,
  highlight = false,
  fallback,
}: {
  label: string;
  value?: string | null;
  highlight?: boolean;
  fallback?: string;
}) => {
  const displayValue = value ? value : fallback ?? "Not Available";

  return (
    <div className="d-flex mb-2 align-items-start">
      <span
        className={`me-2 fw-semibold ${
          highlight ? "text-danger" : "text-dark"
        }`}
        style={{ fontSize: "0.95rem" }}
      >
        {label}
      </span>

      <span
        className={`${
          highlight ? "text-danger fw-semibold" : "text-secondary"
        }`}
        style={{ fontSize: "0.95rem" }}
      >
        {displayValue}
      </span>
    </div>
  );
};

/* ---------------- Main Component ---------------- */

export default function NotificationDetailView({
  notification,
  isAdmin = false,
  onApprove,
  approving,
}: {
  notification: any;
  isAdmin?: boolean;
  onApprove?: () => void;
  approving?: boolean;
}) {
  return (
    <main className="container py-4">
      <div className="row justify-content-center">
        {/* 🔑 SINGLE WIDTH COLUMN */}
        <div className="col-lg-10 col-xl-9">
          {/* ---------------- Admin Bar ---------------- */}
          {isAdmin && (
            <div className="d-flex justify-content-end gap-2 mb-4">
              <button
                className="btn btn-outline-dark btn-sm"
                onClick={() => window.history.back()}
              >
                ← Dashboard
              </button>
              <a
                href={`/admin/edit/${getId(notification.sk)}`}
                className="btn btn-warning btn-sm"
              >
                Edit
              </a>
              {!notification.approved_at && (
                <button
                  className="btn btn-success btn-sm"
                  onClick={onApprove}
                  disabled={approving}
                >
                  {approving ? "Approving..." : "✓ Approve"}
                </button>
              )}
            </div>
          )}

          {/* ---------------- Title ---------------- */}
          <div className="text-center mb-4">
            <h1
              className="fw-bold mb-3 px-2"
              style={{
                fontSize: "clamp(1.4rem, 5vw, 2.2rem)",
                lineHeight: 1.3,
              }}
            >
              {notification.title}
            </h1>

            {notification.short_description && (
              <div className="short-description-wrapper bg-light border rounded-3 p-3 text-start">
                <div
                  className="short-description-content text-muted lh-lg overflow-hidden"
                  dangerouslySetInnerHTML={{
                    __html: notification.short_description,
                  }}
                />
              </div>
            )}
          </div>

          {/* ---------------- Info Cards ---------------- */}
          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <Card title="Basic Details" icon={<FcViewDetails />}>
                <LabelValue label="Title:" value={notification.title} />
                <LabelValue
                  label="Category:"
                  value={formatCategoryTitle(notification.category)}
                />
                <LabelValue
                  label="Department:"
                  value={notification.department}
                />
                <LabelValue
                  label="Total Vacancy:"
                  value={notification.total_vacancies}
                />
              </Card>
            </div>

            <div className="col-md-6">
              <Card title="Important Dates" icon={<BsCalendar />}>
                <LabelValue
                  label="Start Date:"
                  value={formatDate(notification.start_date)}
                />
                <LabelValue
                  label="Last Date To Apply:"
                  value={formatDate(notification.last_date_to_apply)}
                  highlight
                />
                <LabelValue
                  label="Exam Date:"
                  value={formatDate(notification.exam_date)}
                />
                <LabelValue
                  label="Admit Card:"
                  value={formatDate(notification.admit_card_available_date)}
                />
                <LabelValue
                  label="Result:"
                  value={formatDate(notification.result_date)}
                />
              </Card>
            </div>

            <div className="col-md-6">
              <Card title="Fees" icon={<BsCurrencyRupee />}>
                {getGroupedFees(notification).map(([fee, cats]) => (
                  <LabelValue
                    key={fee}
                    label={`${cats.join("/")} Fee:`}
                    value={fee}
                  />
                ))}
              </Card>
            </div>

            <div className="col-md-6">
              <Card title="Eligibility" icon={<BsFillPersonFill />}>
                <LabelValue
                  label="Age:"
                  value={`${notification.min_age ?? "—"} - ${
                    notification.max_age ?? "—"
                  } Years`}
                />
                <LabelValue
                  label="Qualification:"
                  value={notification.qualification}
                />
                <LabelValue
                  label="Specialization:"
                  value={notification.specialization}
                />
                <LabelValue
                  label="Minimum %:"
                  value={formatPercentage(notification.min_percentage)}
                />
              </Card>
            </div>
          </div>

          {/* ---------------- Important Links (FULL WIDTH) ---------------- */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <BsLink45Deg className="text-info" />
                Important Links
              </h5>

              {notification.apply_online_url && (
                <a
                  href={notification.apply_online_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-100 mb-3 d-flex justify-content-center align-items-center gap-2"
                  style={{ minHeight: 52 }}
                >
                  <BsArrowUpRightCircle />
                  Apply Online
                </a>
              )}

              <div className="row g-3">
                {notification.admit_card_url && (
                  <div className="col-12 col-sm-6">
                    <a
                      href={notification.admit_card_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success w-100"
                    >
                      <BsDownload /> Admit Card
                    </a>
                  </div>
                )}

                {notification.notification_pdf_url && (
                  <div className="col-12 col-sm-6">
                    <a
                      href={notification.notification_pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-danger w-100"
                    >
                      <BsFileEarmarkText /> Notification
                    </a>
                  </div>
                )}

                {notification.official_website_url && (
                  <div className="col-12 col-sm-6">
                    <a
                      href={notification.official_website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-dark w-100"
                    >
                      Official Website
                    </a>
                  </div>
                )}

                {notification.result_url ? (
                  <div className="col-12 col-sm-6">
                    <a
                      href={notification.result_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-warning w-100"
                    >
                      Check Result
                    </a>
                  </div>
                ) : (
                  <div className="col-12 col-sm-6">
                    <button className="btn btn-secondary w-100" disabled>
                      Result (Soon)
                    </button>
                  </div>
                )}

                {notification.answer_key_url && (
                  <div className="col-12 col-sm-6">
                    <a
                      href={notification.answer_key_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-secondary w-100"
                    >
                      Answer Key
                    </a>
                  </div>
                )}

                {notification.other_links && (
                  <div className="col-12 col-sm-6">
                    <a
                      href={notification.other_links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-dark w-100"
                    >
                      Other
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ---------------- Long Description ---------------- */}
          {notification.long_description && (
            <div className="long-description-wrapper bg-light border rounded-3 p-3 mb-4">
              <div
                className="long-description-content text-muted lh-lg overflow-hidden"
                dangerouslySetInnerHTML={{
                  __html: notification.long_description,
                }}
              />
            </div>
          )}

          {/* ---------------- Admin Metadata ---------------- */}
          {isAdmin && (
            <div className="mb-5">
              <Card title="Admin Metadata" icon={<BsGear />}>
                <LabelValue
                  label="Created At:"
                  value={formatDateTime(notification.created_at)}
                />
                <LabelValue
                  label="Modified At:"
                  value={formatDateTime(notification.modified_at)}
                />
                <LabelValue
                  label="Approved By:"
                  value={notification.approved_by || "Not approved yet"}
                />
                <LabelValue
                  label="Approved At:"
                  value={
                    notification.approved_at
                      ? formatDateTime(notification.approved_at)
                      : "Pending approval"
                  }
                />
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
