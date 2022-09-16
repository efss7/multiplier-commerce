import { CategoryData } from "../data/CategoryData";
import { CategoryDB, CreateCategoryDto, STATUS, UpdateCategoryDB, UpdateCategoryDto } from "../model/Categorias"
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
    create = async (inputs: CreateCategoryDto) => {
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


            const dataCategory: CategoryDB = {
                id,
                codigo: codigo.toString(),
                status: statusNumber,
                titulo,
            }
            await this.categoryData.create(dataCategory)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
    update = async (inputs: UpdateCategoryDto) => {
        try {
            if (!inputs.id) {
                throw new CustomError(422, "ID inválido")
            }
            if (!inputs.titulo) {
                throw new CustomError(422, "Título não foi passado")
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
            const dataCategory: UpdateCategoryDB={
                id:inputs.id,
                titulo:inputs.titulo,
                status: statusNumber,
            }
            await this.categoryData.update(dataCategory)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
}


export default new CategoryBusiness(
    new CategoryData(),
    new IdGenerator()
);