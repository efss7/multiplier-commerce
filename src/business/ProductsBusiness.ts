import { CategoryData } from "../data/CategoryData";
import { ProductsData } from "../data/ProductsData";
import { CreateProductsDto, ProductsDB, STATUS } from "../model/Products";
import IdGenerator from "../services/IdGenerator";
import { CustomError } from "./errors/CustomError";

export class ProductsBusiness{
    constructor(
        private productsData: ProductsData,
        private idGenerator: IdGenerator
    ){}
    findAll = async (): Promise<ProductsDB[] | undefined> => {
        try {
            return this.productsData.findAll();
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    };
    findOne = async (id: string) => {
        try {
            const result = await this.productsData.findOne(id);
            if (result.length === 0) {
                throw new CustomError(422, "Produto não encontrado")
            }
            return result
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
    create = async (inputs: CreateProductsDto) => {
        try {
            let { idCategoria, nome, descricao, valor, status } = inputs

            if (!idCategoria) {
                throw new CustomError(422, "Categoria Inválida")
            }
            if(!nome){
                throw new CustomError(422, "Nome não foi passado")
            }
            if(!descricao){
                throw new CustomError(422, "Descrição não foi passada")
            }
            if(!valor){
                throw new CustomError(422, "Valor não passado")
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
            const dataCategory: ProductsDB = {
                id,
                idCategoria,
                codigo: codigo.toString(),
                nome,
                descricao,
                valor,
                status: statusNumber,
            }
            await this.productsData.create(dataCategory)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
    
}

export default new ProductsBusiness(
    new ProductsData(),
    new IdGenerator()
)