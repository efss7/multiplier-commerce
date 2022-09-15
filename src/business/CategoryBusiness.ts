import { CategoryData } from "../data/CategoryData";
import { CategoryDB, CategoryDto, STATUS } from "../model/Categorias"
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
            if (result.length === 0) {
                throw new CustomError(422, "Categoria não encontrada")
            }
            return result
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
    create = async (inputs: CategoryDto) => {
        try {
            let { titulo, status } = inputs
            if (!titulo) {
                throw new CustomError(422, "Título não foi passado")
            }
            if (!status || !(status.toLocaleUpperCase() in STATUS)) {
                throw new CustomError(422, "Status Inválido")
            }

            let statusNumber
            if (status.toUpperCase() === "ATIVO") {
                statusNumber = STATUS.ATIVO
            } else {
                statusNumber = STATUS.INATIVO
            }

            const id = this.idGenerator.generateId()
            const codigo = Math.floor(Math.random() * 1000000000000000);


            const dicesOfCategory: CategoryDB = {
                id,
                codigo: codigo.toString(),
                status: statusNumber,
                titulo,
            }
            await this.categoryData.create(dicesOfCategory)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}


export default new CategoryBusiness(
    new CategoryData(),
    new IdGenerator()
);