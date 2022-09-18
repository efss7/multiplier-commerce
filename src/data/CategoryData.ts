import { CustomError } from "../business/errors/CustomError";
import { CategoryDB, UpdateCategoryDB } from "../model/Category";
import BaseDatabase from "./BaseDatabase";

export class CategoryData extends BaseDatabase {
    findAll = async (): Promise<CategoryDB[]> => {
        try {
            return BaseDatabase.connection('Categorias')
                .select('*')
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    }
    findOne = async (id: string) => {
        try {
            const result = await BaseDatabase.connection("Categorias")
                .select("*")
                .where({ id });
            return result;
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    };
    
    create = async (input: CategoryDB): Promise<void> => {
        try {
            await BaseDatabase.connection("Categorias")
                .insert(input)
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    };
    update = async (input: UpdateCategoryDB): Promise<void> => {
        try {
            await BaseDatabase.connection("Categorias")
                .update(input)
                .where({ id: input.id });
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    }
    delete = async (id: string): Promise<void> => {
        try {
            await BaseDatabase.connection("Categorias")
                .where({ id })
                .delete()
        } catch (error: any) {
            throw new CustomError(500, error.sqlMessage);
        }
    };
}