import express from "express";
import authRouter from "./auth-routes.js";
import categoryRouter from "./category-routes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/category", categoryRouter);

export default router;
