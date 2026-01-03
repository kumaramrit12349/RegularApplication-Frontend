import { API_BASE_URL } from "../constant/SharedConstant";

export interface FeedbackPayload {
  name: string;
  email: string;
  message: string;
}

export interface FeedbackResponse {
  success: boolean;
  message?: string;
}

export const submitFeedback = async (
  payload: FeedbackPayload
): Promise<FeedbackResponse> => {
  try {
    const res = await fetch(`${API_BASE_URL}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // safe even if not logged in
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Failed to submit feedback",
      };
    }

    return await res.json();
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
};
