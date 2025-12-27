// For Fronted
export interface NotificationFormState {
  title: string;
  category: string;
  department: string;
  total_vacancies: string;

  short_description: string;
  long_description: string;

  is_admit_card_published: boolean;
  is_result_published: boolean;
  is_answer_key_published: boolean;

  start_date: string;
  last_date_to_apply: string;
  exam_date: string;
  admit_card_available_date: string;
  result_date: string;
  important_date_details: string;

  general_fee: string;
  obc_fee: string;
  sc_fee: string;
  st_fee: string;
  ph_fee: string;
  other_fee_details: string;

  min_age: string;
  max_age: string;
  age_relaxation_details: string;

  qualification: string;
  specialization: string;
  min_percentage: string;
  additional_details: string;

  youtube_link: string;
  apply_online_url: string;
  notification_pdf_url: string;
  official_website_url: string;
  admit_card_url: string;
  answer_key_url: string;
  result_url: string;
  other_links: string;
}

// For Backend
export interface NotificationForm {
  // Basic details
  title: string;
  category: string;
  department: string;
  total_vacancies: number;

  short_description: string;
  long_description: string;

  is_admit_card_published: boolean;
  is_result_published: boolean;
  is_answer_key_published: boolean;

  // Important dates
  start_date: string;
  last_date_to_apply: string;
  exam_date?: string;
  admit_card_available_date?: string;
  result_date?: string;
  important_date_details?: string;

  // Fees
  general_fee: number;
  obc_fee: number;
  sc_fee: number;
  st_fee: number;
  ph_fee: number;
  other_fee_details: string;

  // Ages
  min_age: number;
  max_age: number;
  age_relaxation_details: string;

  // Educational Qualification
  qualification: string;
  specialization: string;
  min_percentage: number;
  additional_details?: string;

  // Links
  youtube_link: string;
  apply_online_url: string;
  notification_pdf_url: string;
  official_website_url: string;
  admit_card_url?: string;
  answer_key_url?: string;
  result_url?: string;
  other_links?: string;
}
