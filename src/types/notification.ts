import type { NOTIFICATION_CATEGORIES } from "../constant/SharedConstant";

export interface HomePageNotification {
  title: string;
  id: string;
}

// types/notification.ts
export interface BaseInterface {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface NotificationForm extends BaseInterface {
  title: string;
  category: string;
  department: string;
  total_vacancies: number;

  short_description: string;
  long_description: string;

  has_admit_card: boolean;
  has_result: boolean;
  has_answer_key: boolean;

  start_date: string;
  last_date_to_apply: string;
  exam_date?: string;
  admit_card_available_date?: string;
  result_date?: string;
  important_date_details?: string;

  general_fee: number;
  obc_fee: number;
  sc_fee: number;
  st_fee: number;
  ph_fee: number;
  other_fee_details: string;

  min_age: number;
  max_age: number;
  age_relaxation_details: string;

  qualification: string;
  specialization: string;
  min_percentage: number;
  additional_details?: string;

  youtube_link: string;
  apply_online_url: string;
  notification_pdf_url: string;
  official_website_url: string;
  admit_card_url?: string;
  answer_key_url?: string;
  result_url?: string;
  other_links?: string;
}

// for create – without id/created_at/updated_at
export type NotificationFormValues = Omit<
  NotificationForm,
  keyof BaseInterface
>;

export type NotificationCategory = typeof NOTIFICATION_CATEGORIES[number]["value"];

export const emptyNotificationForm: NotificationFormValues = {
  title: "",
  category: "",
  department: "",
  total_vacancies: 0,

  short_description: "",
  long_description: "",

  has_admit_card: false,
  has_result: false,
  has_answer_key: false,

  start_date: "",
  last_date_to_apply: "",
  exam_date: "",
  admit_card_available_date: "",
  result_date: "",
  important_date_details: "",

  general_fee: 0,
  obc_fee: 0,
  sc_fee: 0,
  st_fee: 0,
  ph_fee: 0,
  other_fee_details: "",

  min_age: 0,
  max_age: 0,
  age_relaxation_details: "",

  qualification: "",
  specialization: "",
  min_percentage: 0,
  additional_details: "",

  youtube_link: "",
  apply_online_url: "",
  notification_pdf_url: "",
  official_website_url: "",
  admit_card_url: "",
  answer_key_url: "",
  result_url: "",
  other_links: "",
};
