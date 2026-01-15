import express from "express";
import { getAllController } from "../controllers/category/category-controller.js";

const categoryRouter = express.Router();

categoryRouter.get("", getAllController);
export default categoryRouter;
