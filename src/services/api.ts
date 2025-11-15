const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Interface matching your form data
export interface NotificationFormData {
  // Notifications table
  title: string;
  category: string;
  department: string;
  total_vacancies: string;
  isAdminCardAvailable: boolean;
  isResultPublished: boolean;
  isAnswerKeyPublished: boolean;
  
  // Important dates
  application_begin_date: string;
  last_date_for_apply: string;
  exam_date: string;
  admit_card_available_date: string;
  result_date: string;
  
  // Fees
  general_fee: string;
  obc_fee: string;
  sc_fee: string;
  st_fee: string;
  ph_fee: string;
  other_fee_details: string;
  
  // Eligibility
  min_age: string;
  max_age: string;
  age_relaxation_details: string;
  
  // Education
  qualification: string;
  specialization: string;
  min_percentage: string;
  additional_details: string;
  
  // Links
  apply_online_url: string;
  notification_pdf_url: string;
  official_website_url: string;
  admit_card_url: string;
  result_url: string;
  answer_key_url: string;
  other_links: string;
}

// Add notification with all related data
export const addNotification = async (data: NotificationFormData) => {
  const response = await fetch(`${API_BASE_URL}/notification/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error("Failed to add notification");
  }
  
  return response.json();
};

// Fetch all notifications
export const fetchHomePageNotifications = async () => {
  const response = await fetch(`${API_BASE_URL}/notification/home`);
  if (!response.ok) throw new Error("Failed to fetch notifications");
  return response.json();
};

// Fetch all notifications
export const fetchNotifications = async () => {
  const response = await fetch(`${API_BASE_URL}/notification/view`);
  if (!response.ok) throw new Error("Failed to fetch notifications");
  return response.json();
};

// Get single notification by ID
export const getNotificationById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/notification/getById/${id}`);
  if (!response.ok) throw new Error("Failed to fetch notification");
  return response.json();
};

// Update notification
export const updateNotification = async (id: string, data: any) => {
  const response = await fetch(`${API_BASE_URL}/notification/edit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update notification");
  return response.json();
};

// Approve notification
export const approveNotification = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/notification/approve/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ approved_by: 'admin', verified_by: 'admin' }),
  });
  if (!response.ok) throw new Error("Failed to approve notification");
  return response.json();
};

// Delete/Archive notification
export const deleteNotification = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/notification/delete/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete notification");
  return response.json();
};


// Unarchive notification
export const unarchiveNotification = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/notification/unarchive/${id}`, {
    method: "PATCH",
  });
  if (!response.ok) throw new Error("Failed to unarchive notification");
  return response.json();
};

// fetch notification by Category
export const fetchNotificationsByCategory = async (category: string, page: number, limit: number) => {
  const response = await fetch(
    `${API_BASE_URL}/notification/category/${encodeURIComponent(category)}?page=${page}&limit=${limit}`
  );
  if (!response.ok) throw new Error("Failed to fetch notifications");
  return await response.json();
};



