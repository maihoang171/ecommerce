export const productResponseDTO = (product) => {
  return {
    id: product.id,
    name: product.name,
    imageUrl: product.imageUrl,
    price: product.price,
    discountPrice: product.discountPrice,
    description: product.description,
    stockQuantity: product.stockQuantity,
    categoryId: product.categoryId,
    specs: product.specs,
  };
};

export const productListResponseDTO = (productList) => {
  if (!Array.isArray(productList)) return [];
  return productList.map((p) => productResponseDTO(p));
};
