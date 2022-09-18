import { InventoryData } from "../data/InventoryData";
import { STATUS, UpdateInventoryDB, UpdateInventoryDto } from "../model/Inventory";
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
    update = async (inputs: UpdateInventoryDto) => {
        try {
            if (!inputs.idProduto) {
                throw new CustomError(422, "Produto invalido")
            }
            if (!inputs.quantidade) {
                throw new CustomError(422, "Quantidade não foi passado")
            }
            if (!inputs.reserva) {
                throw new CustomError(422, "Reserva não foi passada")
            }
            if (!inputs.status || !(inputs.status.toLocaleUpperCase() in STATUS)) {
                throw new CustomError(422, "Status Inválido")
            }
            let statusNumber
            if (inputs.status.toUpperCase() === "ATIVO") {
                statusNumber = STATUS.ATIVO
            } else {
                statusNumber = STATUS.INATIVO
            }
            const dataInventory: UpdateInventoryDB = {
                idProduto: inputs.idProduto,
                quantidade: inputs.quantidade,
                reserva: inputs.reserva,
                status: statusNumber,
            }
            await this.inventoryData.update(dataInventory)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

}
export default new InventoryBusiness(
    new InventoryData()
)