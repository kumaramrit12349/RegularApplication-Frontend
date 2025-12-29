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
import { formatCategoryTitle } from "../../services/utils";
import { FcViewDetails } from "react-icons/fc";

const formatDate = (d?: string) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

const formatDateTime = (d?: string) =>
  d ? new Date(d).toLocaleString("en-IN") : "—";

const Card = ({
  title,
  icon,
  children,
  className = "",
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`card shadow-sm ${className}`}
    style={{ borderRadius: "1.2em", minHeight: 90, overflow: "hidden" }}
  >
    <div
      className="card-header bg-light border-0 d-flex align-items-center"
      style={{ fontWeight: 600, fontSize: "1.13rem" }}
    >
      {icon && <span className="me-2 fs-5">{icon}</span>}
      {title}
    </div>
    <div className="card-body py-3">{children}</div>
  </div>
);

// Add this helper function at top of component
const formatCurrency = (amount?: string | number) =>
  amount ? `₹${parseFloat(String(amount)).toLocaleString()}` : "—";

const getGroupedFees = (notification: any) => {
  const feesMap: Record<string, string[]> = {};

  const fees = [
    { key: "general_fee", label: "Gen" },
    { key: "obc_fee", label: "OBC" },
    { key: "sc_fee", label: "SC" },
    { key: "st_fee", label: "ST" },
    { key: "ph_fee", label: "PH" },
  ];

  fees.forEach(({ key, label }) => {
    const value = notification[key];
    const formattedValue = formatCurrency(value);

    if (formattedValue !== "—") {
      if (!feesMap[formattedValue]) {
        feesMap[formattedValue] = [];
      }
      feesMap[formattedValue].push(label);
    }
  });

  return Object.entries(feesMap);
};

const LabelValue = ({
  label,
  value,
  bold,
  red,
}: {
  label: string;
  value?: any;
  bold?: boolean;
  red?: boolean;
}) => (
  <div className="d-flex mb-2 align-items-start flex-wrap">
    <span
      className={`me-2${bold ? " fw-bold" : ""}${red ? " text-danger" : ""}`}
    >
      {label}
    </span>
    <span className={`fw-normal${red ? " text-danger fw-bold" : ""}`}>
      {value ?? "—"}
    </span>
  </div>
);

const Chip = ({
  children,
  color = "primary",
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <span
    className={`badge rounded-pill bg-${color} me-2 mb-2 px-3 py-2`}
    style={{ fontSize: "1.03rem", letterSpacing: ".01em" }}
  >
    {children}
  </span>
);

const LinkButton = ({
  label,
  href,
  color = "primary",
}: {
  label: string;
  href?: string;
  color?: string;
}) =>
  href ? (
    <a
      href={href}
      className={`btn btn-${color} my-1 me-2`}
      style={{
        fontWeight: 500,
        borderRadius: "1.6em",
        fontSize: "1.02rem",
        minWidth: 135,
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <BsArrowUpRightCircle className="me-1" style={{ fontSize: "1.1em" }} />
      {label}
    </a>
  ) : null;

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
    <main className="container" style={{ maxWidth: 1000 }}>
      {/* Admin Action Bar - Right aligned */}
      {isAdmin && (
        <div
          className="d-flex justify-content-end align-items-center mb-4 gap-2"
          style={{ minHeight: "40px" }}
        >
          <button
            className="btn btn-outline-dark btn-sm me-2"
            onClick={() => window.history.back()}
          >
            ← Dashboard
          </button>
          <a
            href={`/admin/edit/${notification.id}`}
            className="btn btn-warning btn-sm me-2"
          >
            Edit
          </a>
          {!notification.approved_at && (
            <button
              className="btn btn-success btn-sm"
              onClick={onApprove}
              disabled={approving}
            >
              {approving ? "Approving..." : "✓ Approve Notification"}
            </button>
          )}
        </div>
      )}
      {/* Title & meta chips */}
      <div className="mb-5 text-center w-100 overflow-hidden">
        <h1
          className="fw-bold mb-3 mx-auto px-2"
          style={{
            maxWidth: "900px",
            fontSize: "clamp(1.4rem, 5vw, 2.2rem)",
            lineHeight: 1.3,
          }}
        >
          {notification.title}
        </h1>

        {notification.short_description && (
          <div className="d-flex justify-content-center px-2">
            <div
              className="short-description-wrapper mt-3 px-3 py-3 rounded-3 bg-light border w-100"
              style={{ maxWidth: "900px" }}
            >
              <div
                className="short-description-content text-muted lh-lg text-start"
                dangerouslySetInnerHTML={{
                  __html: notification.short_description,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Card Grid */}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {/* Basic Details */}
        <div className="col">
          <Card
            title="Basic Details"
            icon={<FcViewDetails className="text-warning" />}
          >
            <LabelValue label="Title:" value={notification.title} />
            <LabelValue
              label="Category:"
              value={formatCategoryTitle(notification.category)}
              bold
              red
            />
            <LabelValue label="Department:" value={notification.department} />
            <LabelValue
              label="Total Vacancy:"
              value={notification.total_vacancies}
            />
          </Card>
        </div>
        {/* Important Dates */}
        <div className="col">
          <Card
            title="Important Dates"
            icon={<BsCalendar className="text-warning" />}
          >
            <LabelValue
              label="Start Date:"
              value={formatDate(notification.start_date)}
            />
            <LabelValue
              label="Last Date To Apply:"
              value={formatDate(notification.last_date_to_apply)}
              bold
              red
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
        {/* Fees */}
        <div className="col">
          <Card
            title="Fees"
            icon={<BsCurrencyRupee className="text-success" />}
          >
            {getGroupedFees(notification).map(([feeValue, categories]) => (
              <LabelValue
                key={feeValue}
                label={`${categories.join("/")} Fee:`}
                value={feeValue}
              />
            ))}
            {notification.other_fee_details && (
              <div className="mt-3 pt-2 border-top">
                <div
                  className="text-muted small lh-sm"
                  dangerouslySetInnerHTML={{
                    __html: notification.other_fee_details,
                  }}
                />
              </div>
            )}
          </Card>
        </div>
        {/* Eligibility */}
        <div className="col">
          <Card
            title="Eligibility"
            icon={<BsFillPersonFill className="text-primary" />}
          >
            <LabelValue
              label="Age:"
              value={`${notification.min_age ?? "—"} - ${
                notification.max_age ?? "—"
              } yrs`}
            />
            {/* <LabelValue
              label="Age Relaxation:"
              value={notification.age_relaxation_details}
            /> */}
            <LabelValue
              label="Qualification:"
              value={notification.qualification}
            />
            <LabelValue
              label="Specialization:"
              value={notification.specialization}
            />
            <LabelValue
              label="Min Percentage:"
              value={notification.min_percentage}
            />
            {notification.age_relaxation_details && (
              <div className="mt-3 pt-2 border-top">
                <div
                  className="text-muted small lh-sm"
                  dangerouslySetInnerHTML={{
                    __html: notification.age_relaxation_details,
                  }}
                />
              </div>
            )}
          </Card>
        </div>
        {/* Links */}
        <div className="w-100">
          <div className="card border-0 rounded-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <BsLink45Deg className="text-info" />
                Important Links
              </h5>

              {/* Primary Action */}
              {notification.apply_online_url && (
                <a
                  href={notification.apply_online_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
                  style={{ minHeight: "52px" }}
                >
                  <BsArrowUpRightCircle />
                  Apply Online
                </a>
              )}

              {/* Secondary Actions */}
              <div className="row g-2">
                {notification.admit_card_url && (
                  <div className="col-6">
                    <a
                      href={notification.admit_card_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{ minHeight: "46px" }}
                    >
                      <BsDownload />
                      Admit Card
                    </a>
                  </div>
                )}

                {notification.notification_pdf_url && (
                  <div className="col-6">
                    <a
                      href={notification.notification_pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{ minHeight: "46px" }}
                    >
                      <BsFileEarmarkText />
                      Notification
                    </a>
                  </div>
                )}

                {notification.official_website_url && (
                  <div className="col-6">
                    <a
                      href={notification.official_website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{ minHeight: "46px" }}
                    >
                      <BsArrowUpRightCircle />
                      Official Website
                    </a>
                  </div>
                )}

                {notification.result_url ? (
                  <div className="col-6">
                    <a
                      href={notification.result_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-warning w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{ minHeight: "46px" }}
                    >
                      Check Result
                    </a>
                  </div>
                ) : (
                  <div className="col-6">
                    <button
                      className="btn btn-secondary w-100 opacity-50"
                      disabled
                      style={{ minHeight: "46px" }}
                    >
                      Result (Soon)
                    </button>
                  </div>
                )}

                {notification.answer_key_url ? (
                  <div className="col-6">
                    <a
                      href={notification.answer_key_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{ minHeight: "46px" }}
                    >
                      Answer Key
                    </a>
                  </div>
                ) : (
                  <div className="col-6">
                    <button
                      className="btn btn-outline-secondary w-100 opacity-50"
                      disabled
                      style={{ minHeight: "46px" }}
                    >
                      Answer Key
                    </button>
                  </div>
                )}

                {notification.other_links && (
                  <div className="col-6">
                    <a
                      href={notification.other_links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2"
                      style={{ minHeight: "46px" }}
                    >
                      Other
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5 text-center w-100 overflow-hidden">
        {notification.long_description && (
          <div className="d-flex justify-content-center px-2">
            <div
              className="long-description-wrapper mt-3 px-3 py-3 rounded-3 bg-light border w-100"
              style={{ maxWidth: "900px" }}
            >
              <div
                className="long-description-content text-muted lh-lg text-start"
                dangerouslySetInnerHTML={{
                  __html: notification.long_description,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Admin Section */}
      {isAdmin && (
        <div className="row row-cols-1 g-4 mt-2">
          <div className="col">
            <Card
              title="Admin Metadata"
              icon={<BsGear className="text-dark" />}
            >
              <LabelValue
                label="Created At:"
                value={formatDateTime(notification.created_at)}
              />
              <LabelValue
                label="Updated At:"
                value={formatDateTime(notification.updated_at)}
              />
              <LabelValue
                label="Approved By:"
                value={notification.approved_at}
              />
              <LabelValue
                label="Approved at:"
                value={notification.approved_by}
              />
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
