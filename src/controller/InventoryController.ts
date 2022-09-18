import { Request, Response } from "express";
import inventoryBusiness, { InventoryBusiness } from "../business/InventoryBusiness";
import { UpdateInventoryDto } from "../model/Inventory";
export class InventoryController {
    constructor(
        private inventoryBusiness: InventoryBusiness
    ) { }
    findOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const idProduto = req.params.idProduto;
            const result = await this.inventoryBusiness.findOne(idProduto);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    };
    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const idProduto = req.params.idProduto;
            const { quantidade, reserva, status } = req.body
            const inputs: UpdateInventoryDto = { idProduto, quantidade, reserva, status }
            await this.inventoryBusiness.update(inputs)
            res.status(201).send("Estoque atualizado com sucesso")
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
    delete = async (req: Request, res: Response): Promise<void> => {
        res.status(501).send("Not Implemented.")  
    }
}
export default new InventoryController(inventoryBusiness)