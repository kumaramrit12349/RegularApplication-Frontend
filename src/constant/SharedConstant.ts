export const WEBSITE_NAME = "Apply India";


export const NOTIFICATION_CATEGORIES = [
  { value: "all", label: "Home" },
  { value: "job", label: "Job" }, // is_admit_card, is_syllabus, is_answer_key, is_result
  { value: "entrance-exam", label: "Entrance Exam" }, // is_admit_card, is_syllabus, is_answer_key, is_result
  { value: "admission", label: "Admission" }, 
  { value: "scholarship", label: "Scholarship" }, 
  { value: "sarkari-yojana", label: "Sarkari Yojana" }, 
  { value: "documents", label: "Documents" }, 
] as const;

// *********** Url structure for categories *************
// /jobs/ssc-gd-constable
// /jobs/bihar-police-si

// /entrance-exam/jee-main
// /entrance-exam/bihar-bed-cet

// /admission/bihar-iti
// /admission/patna-university-ug

// /scholarship/bihar-post-matric
// /scholarship/nsp

// /sarkari-yojana/pm-kisan
// /sarkari-yojana/ayushman-bharat

// /documents/aadhaar
// /documents/caste-certificate

export const NOTIFICATION_COLUMNS = {
  ID: "id", // not required in ui
  TITLE: "title",
  CATEGORY: "category",
  DEPARTMENT: "department",
  TOTAL_VACANCIES: "total_vacancies",

  SHORT_DESCRIPTION: "short_description",
  LONG_DESCRIPTION: "long_description",

  HAS_SYLLABUS: "has_syllabus",
  HAS_ADMIT_CARD: "has_admit_card",
  HAS_RESULT: "has_result",
  HAS_ANSWER_KEY: "has_answer_key",

  START_DATE: "start_date",
  LAST_DATE_TO_APPLY: "last_date_to_apply",
  EXAM_DATE: "exam_date",
  ADMIT_CARD_AVAILABLE_DATE: "admit_card_available_date",
  RESULT_DATE: "result_date",
  IMPORTANT_DATE_DETAILS: "important_date_details",

  GENERAL_FEE: "general_fee",
  OBC_FEE: "obc_fee",
  SC_FEE: "sc_fee",
  ST_FEE: "st_fee",
  PH_FEE: "ph_fee",
  OTHER_FEE_DETAILS: "other_fee_details",

  MIN_AGE: "min_age",
  MAX_AGE: "max_age",
  AGE_RELAXATION_DETAILS: "age_relaxation_details",

  QUALIFICATION: "qualification", // Comma seperated
  SPECIALIZATION: "specialization", // Comman seperated
  MIN_PERCENTAGE: "min_percentage",
  ADDITIONAL_DETAILS: "additional_details",

  YOUTUBE_LINK: "youtube_link",
  APPLY_ONLINE_URL: "apply_online_url",
  NOTIFICATION_PDF_URL: "notification_pdf_url",
  OFFICIAL_WEBSITE_URL: "official_website_url",
  ADMIT_CARD_URL: "admit_card_url",
  ANSWER_KEY_URL: "answer_key_url",
  RESULT_URL: "result_url",
  OTHER_LINKS: "other_links",

  SLUG: "slug", // not required for ui

  APPROVED_BY: "approved_by",
  APPROVED_AT: "approved_at",
  IS_ARCHIVED: "is_archived",
  CREATED_AT: "created_at",
  UPDATED_AT: "updated_at",
} as const;
