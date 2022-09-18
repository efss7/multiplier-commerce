import { InventoryData } from "../data/InventoryData";
import { CustomError } from "./errors/CustomError";

export class InventoryBusiness{
    constructor(
        private inventoryData:InventoryData
    ){}
    findOne = async (idProduto: string) => {
        try {
            const result = await this.inventoryData.findOne(idProduto);
            if (result.length === 0) {
                throw new CustomError(422, "Estoque não encontrado")
            }
            return result
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
}
export default new InventoryBusiness(
    new InventoryData()
)