import React from "react";
import { Link } from "react-router-dom";
import { BsBuilding, BsCalendar, BsFillLightningFill, BsFillPersonFill, BsFillInfoCircleFill, BsArrowUpRightCircle } from "react-icons/bs";

interface NotificationDetailViewProps {
  notification: any;
  isAdmin?: boolean;
  onApprove?: () => void;
  approving?: boolean;
}

const formatDate = (d?: string) =>
  d ? new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) : "—";

const formatDateTime = (d?: string) =>
  d ? new Date(d).toLocaleString("en-IN") : "—";

const Field = ({ label, value, icon }: { label: string; value?: any; icon?: React.ReactNode }) => (
  <div className="d-flex align-items-center mb-2 flex-wrap">
    {icon && <span className="me-2 text-secondary fs-5">{icon}</span>}
    <span className="fw-semibold me-2" style={{ minWidth: "120px" }}>{label}:</span>
    <span className="flex-grow-1 fw-normal text-break">{value ?? "—"}</span>
  </div>
);

const Chip = ({ children, color = "primary" }: { children: React.ReactNode; color?: string }) => (
  <span className={`badge rounded-pill bg-${color} me-2 mb-2`} style={{ fontSize: '0.97rem' }}>{children}</span>
);

const LinkButton = ({ label, href, color = "primary", external = true }: { label: string; href?: string; color?: string; external?: boolean }) => (
  href ? (
    <a
      href={href}
      className={`btn btn-sm btn-${color} d-inline-flex align-items-center me-2 mb-2`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{ minWidth: 100 }}
    >
      <BsArrowUpRightCircle className="me-1"/>
      {label}
    </a>
  ) : null
);

const NotificationDetailView: React.FC<NotificationDetailViewProps> = ({
  notification,
  isAdmin = false,
  onApprove,
  approving
}) => (
  <div className="container-fluid px-2 px-sm-4 py-3">
    {/* Admin Header Bar */}
    {isAdmin && (
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
        <div className="fs-4 fw-bold">Notification Details</div>
        <div className="d-flex flex-wrap gap-2">
          <Link to="/admin/dashboard" className="btn btn-outline-dark btn-sm">← Dashboard</Link>
          <Link to={`/admin/edit/${notification.id}`} className="btn btn-warning btn-sm">Edit</Link>
          {!notification.approved_at && (
            <button className="btn btn-success btn-sm"
              onClick={onApprove}
              disabled={approving}
            >
              {approving ? "Approving..." : <><BsFillLightningFill className="me-1"/>Approve</>}
            </button>
          )}
        </div>
      </div>
    )}

    {/* Title, Status, Chips */}
    <div className="mb-2">
      <div className="fs-5 fw-bold mb-1">{notification.title}</div>
      <div className="d-flex flex-wrap align-items-center mb-2">
        <Chip color="info">{notification.category}</Chip>
        {notification.total_vacancies && <Chip color="secondary">Vacancies: {notification.total_vacancies}</Chip>}
        {notification.department && <Chip color="primary"><BsBuilding className="me-1" />{notification.department}</Chip>}
      </div>
    </div>

    {/* Key Dates */}
    <div className="row row-cols-2 row-cols-md-4 g-2 mb-2">
      <div><Field label="Start Date" value={formatDate(notification.application_begin_date)} icon={<BsCalendar />} /></div>
      <div style={{ color: "#d32f2f", fontWeight: 700 }}><Field label="Last Date To Apply" value={formatDate(notification.last_date_for_apply)} icon={<BsCalendar />} /></div>
      <div><Field label="Exam Date" value={formatDate(notification.exam_date)} icon={<BsCalendar />} /></div>
      <div><Field label="Admit Card" value={formatDate(notification.admit_card_available_date)} icon={<BsCalendar />} /></div>
    </div>

    {/* Collapsed Details Section */}
    <div className="row g-1">
      <div className="col-12 col-md-6">
        <div className="card mb-2 shadow-sm">
          <div className="card-header bg-light fw-semibold">Eligibility</div>
          <div className="card-body p-2">
            <Field label="Age" value={`${notification.min_age ?? '—'} - ${notification.max_age ?? '—'} yrs`} icon={<BsFillPersonFill />} />
            <Field label="Age Relaxation" value={notification.age_relaxation_details}/>
            <Field label="Qualification" value={notification.qualification}/>
            <Field label="Specialization" value={notification.specialization}/>
            <Field label="Min %age" value={notification.min_percentage} />
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="card mb-2 shadow-sm">
          <div className="card-header bg-light fw-semibold">Fees & Links</div>
          <div className="card-body p-2">
            <div>
              <Chip color="primary">Gen: ₹{notification.general_fee || '-'}</Chip>
              <Chip color="secondary">OBC: ₹{notification.obc_fee || '-'}</Chip>
              <Chip color="success">SC: ₹{notification.sc_fee || '-'}</Chip>
              <Chip color="danger">ST: ₹{notification.st_fee || '-'}</Chip>
              <Chip color="dark">PH: ₹{notification.ph_fee || '-'}</Chip>
            </div>
            <div className="small text-muted mb-2">{notification.other_fee_details}</div>
            {/* Links */}
            <div className="mb-1 mt-2 d-flex flex-wrap">
              <LinkButton label="Apply Online" href={notification.apply_online_url} color="primary"/>
              <LinkButton label="Download Notification" href={notification.notification_pdf_url} color="danger"/>
              <LinkButton label="Official Website" href={notification.official_website_url} color="info"/>
              <LinkButton label="Download Admit Card" href={notification.admit_card_url} color="success"/>
              <LinkButton label="Check Result" href={notification.result_url} color="warning"/>
              <LinkButton label="Answer Key" href={notification.answer_key_url} color="secondary"/>
              <LinkButton label="Other" href={notification.other_links} color="dark"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Admin Section */}
    {isAdmin && (
      <div className="mt-2 card mb-3 shadow-sm">
        <div className="card-header bg-dark text-white fw-semibold">Admin Metadata</div>
        <div className="card-body p-2 small">
          <Field label="Created At" value={formatDateTime(notification.created_at)} icon={<BsFillInfoCircleFill />} />
          <Field label="Updated At" value={formatDateTime(notification.updated_at)} />
          <Field label="Verified By" value={notification.verified_by}/>
          <Field label="Approved By" value={notification.approved_by} />
        </div>
      </div>
    )}
  </div>
);

export default NotificationDetailView;
