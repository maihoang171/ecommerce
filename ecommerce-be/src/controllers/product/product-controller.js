import { getService } from "../../services/product-service.js";

export const getController = async (req, res, next) => {
  const { isSale, keyword } = req.query;

  try {
    const products = await getService({
      isSale: isSale === "true",
      keyword: keyword?.trim()
    });

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
