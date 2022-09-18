import { CustomError } from "../business/errors/CustomError";
import { InventoryDB } from "../model/Inventory";
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
    create = async (inputsProducts: ProductsDB, inputsInventory:InventoryDB): Promise<void> => {
        try {
            await BaseDatabase.connection("Produtos")
                .insert(inputsProducts)
            await BaseDatabase.connection("Estoque")
                .insert(inputsInventory)
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
    delete = async (id: string, idProduto:string): Promise<void> => {
        try {
            await BaseDatabase.connection("Estoque")
            .where({idProduto:idProduto})
            .delete()
            await BaseDatabase.connection("Produtos")
                .where({ id })
                .delete()
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    };
    findByCategory = async (idCategoria: string) => {
        try {
            const result = await BaseDatabase.connection("Produtos")
                .select("*")
                .where({ idCategoria });
            return result;
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    };
}