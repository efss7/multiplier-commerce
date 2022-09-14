import { Router } from "express";
import categoryController from '../../controller/CategoryController'

export const categoryRouter = Router();

categoryRouter.get("", categoryController.findAll);
