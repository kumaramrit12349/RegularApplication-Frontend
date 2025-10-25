import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getNotificationById, approveNotification } from "../../services/api";

const ReviewNotificationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notification, setNotification] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    if (id) {
      getNotificationById(id)
        .then((data) => {
            console.log('Review', data);
          setNotification(data.notification);
          setLoading(false);
        })
        .catch(() => {
          alert("Failed to load notification");
          navigate("/admin/dashboard");
        });
    }
  }, [id, navigate]);

  const handleApprove = async () => {
    if (window.confirm("Are you sure you want to approve this notification?")) {
      setApproving(true);
      try {
        await approveNotification(id!);
        alert("Notification approved successfully!");
        navigate("/admin/dashboard");
      } catch (err: any) {
        alert(err.message);
        setApproving(false);
      }
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

  if (!notification) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Notification not found</div>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      {/* Header with Actions */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Notification Details</h2>
        <div>
          <Link
            to="/admin/dashboard"
            className="btn btn-outline-secondary me-2"
          >
            ← Back to Dashboard
          </Link>
          <Link to={`/admin/edit/${id}`} className="btn btn-warning me-2">
            Edit
          </Link>
          {!notification.approved_at && (
            <button
              className="btn btn-success"
              onClick={handleApprove}
              disabled={approving}
            >
              {approving ? "Approving..." : "✓ Approve Notification"}
            </button>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-4">
        {notification.approved_at ? (
          <span className="badge bg-success fs-6">✓ Approved</span>
        ) : (
          <span className="badge bg-warning text-dark fs-6">
            ⏳ Pending Approval
          </span>
        )}
      </div>

      {/* Basic Information */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">📋 Basic Information</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Title:</strong>
              <p className="mb-0">{notification.title || "N/A"}</p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Category:</strong>
              <p className="mb-0">
                <span className="badge bg-info">
                  {notification.category || "N/A"}
                </span>
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Total Vacancies:</strong>
              <p className="mb-0">{notification.total_vacancies || "N/A"}</p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Department:</strong>
              <p className="mb-0">{notification.department || "N/A"}</p>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={notification.isadmincardavailable}
                  disabled
                />
                <label className="form-check-label">Admit Card Available</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={notification.isresultpublished}
                  disabled
                />
                <label className="form-check-label">Result Published</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={notification.isanswerkeypublished}
                  disabled
                />
                <label className="form-check-label">Answer Key Published</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Dates */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">📅 Important Dates</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Application Begin Date:</strong>
              <p className="mb-0">
                {notification.application_begin_date
                  ? new Date(
                      notification.application_begin_date
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Last Date to Apply:</strong>
              <p className="mb-0">
                {notification.last_date_for_apply
                  ? new Date(
                      notification.last_date_for_apply
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Exam Date:</strong>
              <p className="mb-0">
                {notification.exam_date
                  ? new Date(notification.exam_date).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Admit Card Available Date:</strong>
              <p className="mb-0">
                {notification.admit_card_available_date
                  ? new Date(
                      notification.admit_card_available_date
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Result Date:</strong>
              <p className="mb-0">
                {notification.result_date
                  ? new Date(notification.result_date).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fees */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-warning text-dark">
          <h5 className="mb-0">💰 Application Fees</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <strong>General:</strong>
              <p className="mb-0">₹{notification.general_fee || "N/A"}</p>
            </div>
            <div className="col-md-4 mb-3">
              <strong>OBC:</strong>
              <p className="mb-0">₹{notification.obc_fee || "N/A"}</p>
            </div>
            <div className="col-md-4 mb-3">
              <strong>SC:</strong>
              <p className="mb-0">₹{notification.sc_fee || "N/A"}</p>
            </div>
            <div className="col-md-4 mb-3">
              <strong>ST:</strong>
              <p className="mb-0">₹{notification.st_fee || "N/A"}</p>
            </div>
            <div className="col-md-4 mb-3">
              <strong>PH:</strong>
              <p className="mb-0">₹{notification.ph_fee || "N/A"}</p>
            </div>
            <div className="col-12 mb-3">
              <strong>Other Fee Details:</strong>
              <p className="mb-0">{notification.other_fee_details || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0">✔️ Eligibility Criteria</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Minimum Age:</strong>
              <p className="mb-0">{notification.min_age || "N/A"} years</p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Maximum Age:</strong>
              <p className="mb-0">{notification.max_age || "N/A"} years</p>
            </div>
            <div className="col-12 mb-3">
              <strong>Age Relaxation:</strong>
              <p className="mb-0">
                {notification.age_relaxation_details || "N/A"}
              </p>
            </div>
          </div>

          <hr />

          <h6 className="mb-3">Educational Qualifications</h6>
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Qualification:</strong>
              <p className="mb-0">{notification.qualification || "N/A"}</p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Specialization:</strong>
              <p className="mb-0">{notification.specialization || "N/A"}</p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Minimum Percentage:</strong>
              <p className="mb-0">{notification.min_percentage || "N/A"}%</p>
            </div>
            <div className="col-12 mb-3">
              <strong>Additional Details:</strong>
              <p className="mb-0">{notification.additional_details || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-secondary text-white">
          <h5 className="mb-0">🔗 Important Links</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {notification.apply_online_url && (
              <div className="col-md-6">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>Apply Online:</strong>
                  <a
                    href={notification.apply_online_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary"
                  >
                    Click Here →
                  </a>
                </div>
              </div>
            )}

            {notification.notification_pdf_url && (
              <div className="col-md-6">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>Notification PDF:</strong>
                  <a
                    href={notification.notification_pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-danger"
                  >
                    Click Here →
                  </a>
                </div>
              </div>
            )}

            {notification.official_website_url && (
              <div className="col-md-6">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>Official Website:</strong>
                  <a
                    href={notification.official_website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-info"
                  >
                    Click Here →
                  </a>
                </div>
              </div>
            )}

            {notification.admit_card_url && (
              <div className="col-md-6">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>Admit Card:</strong>
                  <a
                    href={notification.admit_card_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-success"
                  >
                    Click Here →
                  </a>
                </div>
              </div>
            )}

            {notification.result_url && (
              <div className="col-md-6">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>Result:</strong>
                  <a
                    href={notification.result_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-warning"
                  >
                    Click Here →
                  </a>
                </div>
              </div>
            )}

            {notification.answer_key_url && (
              <div className="col-md-6">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>Answer Key:</strong>
                  <a
                    href={notification.answer_key_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-secondary"
                  >
                    Click Here →
                  </a>
                </div>
              </div>
            )}

            {notification.other_links && (
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>Other Links:</strong>
                  <a
                    href={notification.other_links}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-dark"
                  >
                    Click Here →
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Show message if no links available */}
          {!notification.apply_online_url &&
            !notification.notification_pdf_url &&
            !notification.official_website_url &&
            !notification.admit_card_url &&
            !notification.result_url &&
            !notification.answer_key_url &&
            !notification.other_links && (
              <p className="text-muted mb-0">No links available</p>
            )}
        </div>
      </div>

      {/* Metadata */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">ℹ️ Metadata</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <strong>Created At:</strong>
              <p className="mb-0">
                {new Date(notification.created_at).toLocaleString()}
              </p>
            </div>
            <div className="col-md-6 mb-3">
              <strong>Updated At:</strong>
              <p className="mb-0">
                {notification.updated_at
                  ? new Date(notification.updated_at).toLocaleString()
                  : "N/A"}
              </p>
            </div>
            {notification.approved_at && (
              <>
                <div className="col-md-6 mb-3">
                  <strong>Approved At:</strong>
                  <p className="mb-0">
                    {new Date(notification.approved_at).toLocaleString()}
                  </p>
                </div>
                <div className="col-md-6 mb-3">
                  <strong>Approved By:</strong>
                  <p className="mb-0">{notification.approved_by || "N/A"}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewNotificationPage;
