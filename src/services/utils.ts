export const formatCategoryTitle = (category: string): string => {
  return category
    ?.replace(/-/g, " ")
    ?.replace(/\b\w/g, (l) => l.toUpperCase()) || "";
};

export const getId = (id: string): string => {
  return id.split('#')[1];
}

export function makeSlug(title: string, id: string): string {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special characters
    .replace(/\s+/g, "-")         // replace spaces with hyphen
    .replace(/-+/g, "-");         // remove multiple hyphens

  return `${baseSlug}/${id.split('#')[1]}`;
}
