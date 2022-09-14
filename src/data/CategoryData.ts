import { CustomError } from "../business/errors/CustomError";
import { CategoryDB } from "../model/Categorias";
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
}