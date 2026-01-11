import express from "express";
import authRouter from "./auth-routes.js";
import categoryRouter from "./category-routes.js";
import productRouter from "./product-routes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
export default router;
