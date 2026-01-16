import express from "express";
import { getController } from "../controllers/product/product-controller.js";

const productRouter = express.Router();

productRouter.get("", getController);
export default productRouter;
