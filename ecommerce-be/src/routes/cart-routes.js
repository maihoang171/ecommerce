import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  addItemToCartController,
  getCartController,
  clearCartController,
  deleteItemByIdController,
} from "../controllers/cart/cart-controller.js";

const cartRouter = express.Router();

cartRouter.post("", authMiddleware, addItemToCartController);
cartRouter.get("", authMiddleware, getCartController);
cartRouter.delete("/items/:id", authMiddleware, deleteItemByIdController);
cartRouter.delete("", authMiddleware, clearCartController);
export default cartRouter;
