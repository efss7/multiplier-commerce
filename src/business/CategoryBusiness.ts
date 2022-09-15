import { CategoryData } from "../data/CategoryData";
import { CategoryDB } from "../model/Categorias"
import IdGenerator from "../services/IdGenerator"
import { CustomError } from "./errors/CustomError";

export class CategoryBusiness {
    constructor(
        private categoryData: CategoryData,
        private idGenerator: IdGenerator
    ) { }
    findAll = async (): Promise<CategoryDB[] | undefined> => {
        try {
            return this.categoryData.findAll();
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    };
    findOne = async (id: string) => {
        try {
            const result = await this.categoryData.findOne(id);
            if(result.length===0){
                throw new CustomError(422, "Categoria não encontrada")
            }
            return result
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
}


export default new CategoryBusiness(
    new CategoryData(),
    new IdGenerator()
);