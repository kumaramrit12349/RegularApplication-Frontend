export const formatCategoryTitle = (category: string): string => {
  return category
    ?.replace(/-/g, " ")
    ?.replace(/\b\w/g, (l) => l.toUpperCase()) || "";
};

export const getId = (id: string): string => {
  return id.split('#')[1];
}