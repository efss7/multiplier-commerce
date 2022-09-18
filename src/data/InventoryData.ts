import { CustomError } from "../business/errors/CustomError";
import { InventoryDB, UpdateInventoryDB } from "../model/Inventory";
import BaseDatabase from "./BaseDatabase";

export class InventoryData extends BaseDatabase{
    findOne = async (idProduto: string) => {
        try {
            const result = await BaseDatabase.connection("Estoque")
                .select("*")
                .where({ idProduto });
            return result;
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);

        }
    };
    update = async (input: UpdateInventoryDB): Promise<void> => {
        try {
            await BaseDatabase.connection("Estoque")
                .update(input)
                .where({ idProduto: input.idProduto });
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    }
}