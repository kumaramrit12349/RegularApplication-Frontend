import React from "react";
import {
  BsCalendar,
  BsFillClipboardCheckFill,
  BsFillPersonFill,
  BsCurrencyRupee,
  BsLink45Deg,
  BsArrowUpRightCircle,
  BsGear,
} from "react-icons/bs";

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
    <main className="container py-5" style={{ maxWidth: 1000 }}>
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
      <div className="mb-4 text-center">
        <h1
          className="fw-bold mb-2"
          style={{ fontSize: "2rem", lineHeight: 1.25 }}
        >
          {notification.title}
        </h1>
        <div className="d-flex justify-content-center flex-wrap mb-2">
          <Chip color="info">{notification.category}</Chip>
          {notification.total_vacancies && (
            <Chip color="secondary">
              Vacancies: {notification.total_vacancies}
            </Chip>
          )}
          {notification.department && (
            <Chip color="primary">
              <BsFillClipboardCheckFill className="me-1" />
              {notification.department}
            </Chip>
          )}
        </div>
      </div>
      {/* Card Grid */}
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {/* Important Dates */}
        <div className="col">
          <Card
            title="Important Dates"
            icon={<BsCalendar className="text-warning" />}
          >
            <LabelValue
              label="Start Date:"
              value={formatDate(notification.application_begin_date)}
            />
            <LabelValue
              label="Last Date To Apply:"
              value={formatDate(notification.last_date_for_apply)}
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
            <div>
              <Chip color="primary">
                Gen: ₹{notification.general_fee || "-"}
              </Chip>
              <Chip color="secondary">OBC: ₹{notification.obc_fee || "-"}</Chip>
              <Chip color="success">SC: ₹{notification.sc_fee || "-"}</Chip>
              <Chip color="danger">ST: ₹{notification.st_fee || "-"}</Chip>
              <Chip color="dark">PH: ₹{notification.ph_fee || "-"}</Chip>
            </div>
            <div className="text-muted mt-2" style={{ minHeight: 20 }}>
              {notification.other_fee_details}
            </div>
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
            <LabelValue
              label="Age Relaxation:"
              value={notification.age_relaxation_details}
            />
            <LabelValue
              label="Qualification:"
              value={notification.qualification}
            />
            <LabelValue
              label="Specialization:"
              value={notification.specialization}
            />
            <LabelValue label="Min %age:" value={notification.min_percentage} />
          </Card>
        </div>
        {/* Links */}
        <div className="col">
          <Card
            title="Important Links"
            icon={<BsLink45Deg className="text-info" />}
          >
            <div className="mb-2 d-flex flex-wrap">
              <LinkButton
                label="Apply Online"
                href={notification.apply_online_url}
                color="primary"
              />
              <LinkButton
                label="Download Notification"
                href={notification.notification_pdf_url}
                color="danger"
              />
              <LinkButton
                label="Official Website"
                href={notification.official_website_url}
                color="info"
              />
              <LinkButton
                label="Download Admit Card"
                href={notification.admit_card_url}
                color="success"
              />
              <LinkButton
                label="Check Result"
                href={notification.result_url}
                color="warning"
              />
              <LinkButton
                label="Answer Key"
                href={notification.answer_key_url}
                color="secondary"
              />
              <LinkButton
                label="Other"
                href={notification.other_links}
                color="dark"
              />
            </div>
          </Card>
        </div>
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
                label="Verified By:"
                value={notification.verified_by}
              />
              <LabelValue
                label="Approved By:"
                value={notification.approved_by}
              />
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
