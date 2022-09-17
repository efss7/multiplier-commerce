import { CategoryData } from "../data/CategoryData";
import { ProductsData } from "../data/ProductsData";
import { ProductsDB } from "../model/Products";
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
}

export default new ProductsBusiness(
    new ProductsData(),
    new IdGenerator()
)