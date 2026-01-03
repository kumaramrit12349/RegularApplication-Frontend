import type { INotification } from "../interface/NotificationInterface";

export const formatCategoryTitle = (category: string): string => {
  return (
    category?.replace(/-/g, " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || ""
  );
};

export const getId = (id: string): string => {
  return id.split("#")[1];
};

export function makeSlug(title: string, sk: string): string {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-") // replace spaces with hyphen
    .replace(/-+/g, "-"); // remove multiple hyphens

  console.log("${baseSlug}/${sk}", `${baseSlug}/${sk}`);
  return `${baseSlug}/${sk}`;
}

export const emptyNotificationForm: INotification = {
  title: "",
  category: "",
  department: "",
  total_vacancies: 0,

  has_admit_card: false,
  has_result: false,
  has_answer_key: false,
  has_syllabus: false,

  start_date: "",
  last_date_to_apply: "",
  exam_date: "",
  admit_card_date: "",
  result_date: "",

  details: {
    short_description: "",
    long_description: "",
    important_date_details: "",
  },

  fee: {
    general_fee: 0,
    obc_fee: 0,
    sc_fee: 0,
    st_fee: 0,
    ph_fee: 0,
    other_fee_details: "",
  },

  eligibility: {
    min_age: 0,
    max_age: 0,
    qualification: "",
    specialization: "",
    min_percentage: 0,
    age_relaxation_details: "",
  },

  links: {
    youtube_link: "",
    apply_online_url: "",
    notification_pdf_url: "",
    official_website_url: "",
    admit_card_url: "",
    answer_key_url: "",
    result_url: "",
    other_links: "",
  },
};
