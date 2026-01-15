export const categoryResponseDTO = (category) => {
  return {
    id: category.id,
    name: category.name,
    imageUrl: category.imageUrl,
  };
};

export const categoryListResponseDTO = (categoryList) => {
  if (!Array.isArray(categoryList)) return [];
  return categoryList.map((c) => categoryResponseDTO(c));
};
