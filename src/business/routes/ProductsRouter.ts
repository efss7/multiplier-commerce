import { Router } from "express";
import inventoryController from "../../controller/InventoryController";
import productsController from "../../controller/ProductsController";

export const productsRouter = Router();

productsRouter.get("", productsController.findAll)
productsRouter.get("/:id", productsController.findOne)
productsRouter.post("", productsController.create)
productsRouter.patch("/:id", productsController.update)
productsRouter.delete("/:id", productsController.delete)

productsRouter.get("/:idProduto/estoque", inventoryController.findOne)