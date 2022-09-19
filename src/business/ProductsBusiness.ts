import { ProductsData } from "../data/ProductsData";
import { InventoryDB } from "../model/Inventory";
import { CreateProductsDto, ProductsDB, STATUS, UpdateProductsDB, UpdateProductsDto } from "../model/Products";
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
    create = async (inputsProducts: CreateProductsDto) => {
        try {
            let { idCategoria, nome, descricao, valor, status } = inputsProducts

            if (!idCategoria) {
                throw new CustomError(422, "Categoria inválida")
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
                throw new CustomError(422, "Status inválido")
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
            const idInventory = this.idGenerator.generateId()
            const quantidadeDefault = 0
            const reservaDefault = 0
            const dataInventory:InventoryDB={
                id:idInventory,
                idProduto:dataCategory.id,
                quantidade:quantidadeDefault,
                reserva:reservaDefault,
                status:statusNumber
            }
            await this.productsData.create(dataCategory, dataInventory)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
    update = async (inputs: UpdateProductsDto) => {
        try {
            if (!inputs.id) {
                throw new CustomError(422, "ID inválido")
            }
            if(!inputs.idCategoria){
                throw new CustomError(422,"Categoria invalida")
            }
            if (!inputs.nome) {
                throw new CustomError(422, "Nome não foi passado")
            }
            if (!inputs.descricao) {
                throw new CustomError(422, "Descrição não foi passada")
            }
            if(!inputs.valor){
                throw new CustomError(422, "Valor não foi passado")
            }
            if (!inputs.status || !(inputs.status.toLocaleUpperCase() in STATUS)) {
                throw new CustomError(422, "Status inválido")
            }
            let statusNumber
            if (inputs.status.toUpperCase() === "ATIVO") {
                statusNumber = STATUS.ATIVO
            } else {
                statusNumber = STATUS.INATIVO
            }
            const dataCategory: UpdateProductsDB = {
                id: inputs.id,
                idCategoria: inputs.idCategoria,
                nome: inputs.nome,
                descricao: inputs.descricao,
                valor: inputs.valor,
                status: statusNumber,
            }
            await this.productsData.update(dataCategory)
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
    delete = async (id: string, idProduto:string): Promise<void> => {
        try {
            if (!id) {
                throw new CustomError(422, "ID inválido");
            }
            await this.productsData.delete(id, idProduto);
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    };
    
}

export default new ProductsBusiness(
    new ProductsData(),
    new IdGenerator()
)