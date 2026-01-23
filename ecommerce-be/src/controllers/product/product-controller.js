import { getService } from "../../services/product-service.js";

export const getController = async (req, res, next) => {
  const { isSale, keyword, categoryId } = req.query;
  console.log(categoryId)
  try {
    const parsedCategoryId = categoryId ? Number(categoryId) : undefined;
    const products = await getService({
      isSale: isSale === "true",
      keyword: keyword?.trim(),
      categoryId: isNaN(parsedCategoryId) ? undefined : parsedCategoryId,
    });

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
