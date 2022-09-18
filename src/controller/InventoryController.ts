import { Request, Response } from "express";
import inventoryBusiness, { InventoryBusiness } from "../business/InventoryBusiness";
export class InventoryController{
    constructor(
        private inventoryBusiness:InventoryBusiness
    ){}
    findOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const idProduto = req.params.idProduto;
            const result = await this.inventoryBusiness.findOne(idProduto);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    };
}
export default new InventoryController(inventoryBusiness)