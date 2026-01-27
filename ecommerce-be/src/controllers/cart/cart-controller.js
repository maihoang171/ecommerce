import {
  addItemToCartService,
  clearCartService,
  deleteItemService,
  getCartService,
} from "../../services/cart-service.js";
export const addItemToCartController = async (req, res, next) => {
  try {
    const { productId, quantityToAdd } = req.body;
    const userId = req.user.id;
    const result = await addItemToCartService(
      userId,
      Number(productId),
      quantityToAdd,
    );

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getCartController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await getCartService(userId);

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteItemByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const result = await deleteItemService(userId, Number(id));

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const clearCartController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await clearCartService(userId);

    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
