import { CustomError } from "../business/errors/CustomError";
import { ProductsDB, UpdateProductsDB } from "../model/Products";
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
    create = async (input: ProductsDB): Promise<void> => {
        try {
            await BaseDatabase.connection("Produtos")
                .insert(input)
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    };
    update = async (input: UpdateProductsDB): Promise<void> => {
        try {
            await BaseDatabase.connection("Produtos")
                .update(input)
                .where({ id: input.id });
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    }
}