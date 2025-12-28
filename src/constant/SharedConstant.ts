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