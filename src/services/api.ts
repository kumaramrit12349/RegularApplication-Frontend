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

export interface AuthStatus {
  isAuthenticated: boolean;
  user?: {
    given_name?: string;
    family_name?: string;
    email?: string;
    sub?: string;
  };
}

// Add notification with all related data
export const addNotification = async (data: NotificationFormData) => {
  const response = await fetch(`${API_BASE_URL}/notification/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: 'include', // <-- send cookies to localhost:4000
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
  const response = await fetch(`${API_BASE_URL}/notification/view`, {
    method: 'GET',
    credentials: 'include', // <-- send cookies to localhost:4000
  });
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
    credentials: "include", // send cookies
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
    credentials: "include", // send cookies
  });
  if (!response.ok) throw new Error("Failed to approve notification");
  return response.json();
};

// Delete/Archive notification
export const deleteNotification = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/notification/delete/${id}`, {
    method: "DELETE",
    credentials: "include", // send cookies
  });
  if (!response.ok) throw new Error("Failed to delete notification");
  return response.json();
};


// Unarchive notification
export const unarchiveNotification = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/notification/unarchive/${id}`, {
    method: "PATCH",
    credentials: "include", // send cookies
  });
  if (!response.ok) throw new Error("Failed to unarchive notification");
  return response.json();
};

// fetch notification by Category
export const fetchNotificationsByCategory = async (
  category: string,
  page: number,
  limit: number,
  searchValue?: string
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (searchValue && searchValue.trim() !== "") {
    params.append("searchValue", searchValue);
  }

  const response = await fetch(
    `${API_BASE_URL}/notification/category/${encodeURIComponent(
      category
    )}?${params}`
  );

  if (!response.ok) throw new Error("Failed to fetch notifications");
  return await response.json();
};


export const signUpUser = async (
  given_name: string,
  family_name: string,
  email: string,
  password: string,
  gender: string
) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ given_name, family_name, email, password, gender }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to sign up");
  }
  return await response.json();
};


export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // crucial for cookies
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to login");
  }

  return response.json();
};



export const logoutUser = async () => {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const verifyAccount = async (email: string, code: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to verify account");
  }
  return res.json();
};

export const resendVerificationCode = async (email: string) => {
  const res = await fetch(`${API_BASE_URL}/auth/resend-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to resend verification code");
  }
  return res.json();
};

export const checkAuthStatus = async (): Promise<AuthStatus> => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      credentials: "include",
    });

    if (!res.ok) return { isAuthenticated: false };

    const data = await res.json();
    return {
      isAuthenticated: true,
      user: data.user,
    };
  } catch {
    return { isAuthenticated: false };
  }
};

