import { CustomError } from "../business/errors/CustomError";
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
}