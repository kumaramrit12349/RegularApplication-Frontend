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
  BsGlobe,
  BsCheckCircle,
  BsYoutube,
} from "react-icons/bs";
import { FcViewDetails } from "react-icons/fc";
import { formatCategoryTitle } from "../../services/utils";
import type { INotification } from "../../interface/NotificationInterface";

/* ---------------- Helpers ---------------- */

const formatDate = (d?: string) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Not Released";

const formatDateTime = (d?: number | string | null) => {
  if (!d) return "—";

  const date = typeof d === "number" ? new Date(d) : new Date(d);

  return isNaN(date.getTime()) ? "—" : date.toLocaleString("en-IN");
};

const formatCurrency = (amount?: string | number) =>
  amount ? `₹${parseFloat(String(amount)).toLocaleString()}` : "—";

const formatPercentage = (value?: string | number) => {
  if (value === null || value === undefined) {
    return "Not Specified";
  }
  return `${Number(value)}`;
};

const getGroupedFees = (fee?: INotification["fee"]) => {
  if (!fee) return [];

  const map: Record<string, string[]> = {};

  const fees = [
    { key: "general_fee", label: "Gen" },
    { key: "obc_fee", label: "OBC" },
    { key: "sc_fee", label: "SC" },
    { key: "st_fee", label: "ST" },
    { key: "ph_fee", label: "PH" },
  ] as const;

  fees.forEach(({ key, label }) => {
    const value = fee[key];
    if (value !== undefined && value !== null) {
      const formatted = formatCurrency(value);
      map[formatted] = map[formatted] || [];
      map[formatted].push(label);
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
  value?: string | number | null;
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
  notification: INotification;
  isAdmin?: boolean;
  onApprove?: () => void;
  approving?: boolean;
}) {
  if (!notification) return null;

  return (
    <main className="container py-4">
      <div className="row justify-content-center">
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
                href={`/admin/edit/${notification.sk}`}
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
            <h1 className="fw-bold mb-3">{notification.title}</h1>

            {notification.details?.short_description && (
              <div className="bg-light border rounded-3 p-3 text-start">
                <div
                  dangerouslySetInnerHTML={{
                    __html: notification.details.short_description,
                  }}
                />
              </div>
            )}
          </div>

          {/* ---------------- Info Cards ---------------- */}
          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <Card title="Basic Details" icon={<FcViewDetails />}>
                <LabelValue
                  label="Category:"
                  value={formatCategoryTitle(notification.category)}
                />
                <LabelValue
                  label="Department:"
                  value={notification.department}
                />
                <LabelValue
                  label="Total Vacancies:"
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

                {/* <LabelValue
                  label="Admit Card Date:"
                  value={formatDate(notification.admit_card_date)}
                  fallback="Not Released"
                /> */}

                {/* <LabelValue
                  label="Result Date:"
                  value={formatDate(notification.result_date)}
                  fallback="Not Released"
                /> */}

                {/* 🔹 Important Date Notes */}
                {notification.details?.important_date_details && (
                  <div className="mt-3">
                    <div
                      className="text-muted lh-lg"
                      dangerouslySetInnerHTML={{
                        __html: notification.details.important_date_details,
                      }}
                    />
                  </div>
                )}
              </Card>
            </div>

            <div className="col-md-6">
              <Card title="Fees" icon={<BsCurrencyRupee />}>
                {getGroupedFees(notification.fee).map(([fee, cats]) => (
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
                  value={`${notification.eligibility?.min_age ?? "—"} - ${
                    notification.eligibility?.max_age ?? "—"
                  } Years`}
                />
                <LabelValue
                  label="Qualification:"
                  value={notification.eligibility?.qualification}
                />
                <LabelValue
                  label="Specialization:"
                  value={notification.eligibility?.specialization}
                />
                <LabelValue
                  label="Minimum %:"
                  value={formatPercentage(
                    notification.eligibility?.min_percentage
                  )}
                />
              </Card>
            </div>
          </div>

          {/* ---------------- Important Links ---------------- */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <BsLink45Deg className="text-info" />
                Important Links
              </h5>

              {/* 🔵 Apply Online */}
              {notification.links?.apply_online_url && (
                <a
                  href={notification.links.apply_online_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-100 mb-4 d-flex justify-content-center align-items-center gap-2"
                  style={{ minHeight: 52 }}
                >
                  <BsArrowUpRightCircle size={18} />
                  Apply Online
                </a>
              )}

              <div className="row g-3">
                {/* 🟢 Admit Card */}
                {notification.links?.admit_card_url && (
                  <div className="col-12 col-md-6">
                    <a
                      href={notification.links.admit_card_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-success w-100 d-flex justify-content-center align-items-center gap-2"
                    >
                      <BsDownload size={18} />
                      Admit Card
                    </a>
                  </div>
                )}

                {/* 🔴 Notification PDF */}
                {notification.links?.notification_pdf_url && (
                  <div className="col-12 col-md-6">
                    <a
                      href={notification.links.notification_pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-danger w-100 d-flex justify-content-center align-items-center gap-2"
                    >
                      <BsFileEarmarkText size={18} />
                      Notification PDF
                    </a>
                  </div>
                )}

                {/* 🌐 Official Website */}
                {notification.links?.official_website_url && (
                  <div className="col-12 col-md-6">
                    <a
                      href={notification.links.official_website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-dark w-100 d-flex justify-content-center align-items-center gap-2"
                    >
                      <BsGlobe size={18} />
                      Official Website
                    </a>
                  </div>
                )}

                {/* 🟡 Result */}
                {notification.links?.result_url && (
                  <div className="col-12 col-md-6">
                    <a
                      href={notification.links.result_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-warning w-100 d-flex justify-content-center align-items-center gap-2"
                    >
                      <BsCheckCircle size={18} />
                      Result
                    </a>
                  </div>
                )}

                {/* ⚪ Answer Key */}
                {notification.links?.answer_key_url && (
                  <div className="col-12 col-md-6">
                    <a
                      href={notification.links.answer_key_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-secondary w-100 d-flex justify-content-center align-items-center gap-2"
                    >
                      <BsFileEarmarkText size={18} />
                      Answer Key
                    </a>
                  </div>
                )}

                {/* 🔴 YouTube */}
                {notification.links?.youtube_link && (
                  <div className="col-12 col-md-6">
                    <a
                      href={notification.links.youtube_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-danger w-100 d-flex justify-content-center align-items-center gap-2"
                    >
                      <BsYoutube size={18} />
                      YouTube
                    </a>
                  </div>
                )}

                {/* 🔗 Other Links */}
                {notification.links?.other_links && (
                  <div className="col-12 col-md-6">
                    <a
                      href={notification.links.other_links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-dark w-100 d-flex justify-content-center align-items-center gap-2"
                    >
                      <BsLink45Deg size={18} />
                      Other Links
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ---------------- Long Description ---------------- */}
          {notification.details?.long_description && (
            <div className="bg-light border rounded-3 p-3 mb-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: notification.details.long_description,
                }}
              />
            </div>
          )}

          {/* ---------------- Admin Metadata ---------------- */}
          {isAdmin && (
            <div className="row mb-5">
              <div className="col-12">
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
                    value={notification.approved_by || "Pending"}
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
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
