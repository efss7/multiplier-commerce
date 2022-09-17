import { CustomError } from "../business/errors/CustomError";
import { ProductsDB } from "../model/Products";
import BaseDatabase from "./BaseDatabase";

export class ProductsData extends BaseDatabase{
    findAll = async (): Promise<ProductsDB[]> => {
        try {
            return BaseDatabase.connection('Produtos')
                .select('*')
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    }
    findOne = async (id: string) => {
        try {
            const result = await BaseDatabase.connection("Produtos")
                .select("*")
                .where({ id });
            return result;
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    };
}