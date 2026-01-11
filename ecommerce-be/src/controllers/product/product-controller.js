import { getService } from "../../services/product-service.js";
import { productListResponseDTO } from "./product-dto.js";

export const getController = async (req, res, next) => {
  const { keyword } = req.query;

  console.log(req.query);
  try {
    const products = await getService(keyword.trim());
    res.status(200).json({
      status: "success",
      data: productListResponseDTO(products || ""),
    });
  } catch (error) {
    next(error);
  }
};
