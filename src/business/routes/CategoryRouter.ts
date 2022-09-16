import { Router } from "express";
import categoryController from '../../controller/CategoryController'

export const categoryRouter = Router();

categoryRouter.get("", categoryController.findAll);
categoryRouter.get("/:id", categoryController.findOne);
categoryRouter.post("", categoryController.create)
categoryRouter.patch("/:id", categoryController.update)
categoryRouter.delete("/:id", categoryController.delete)
