import { Request, Response } from "express";
import productsBusiness, { ProductsBusiness } from "../business/ProductsBusiness";
import { CreateProductsDto, UpdateProductsDto } from "../model/Products";

export class ProductsController{
    constructor(
        private productsBusiness:ProductsBusiness
    ){}
    findAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.productsBusiness.findAll()
            res.status(200).send(result)
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }
    findOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const result = await this.productsBusiness.findOne(id);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    };
    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const { idCategoria, nome, descricao, valor, status } = req.body
            const inputs: CreateProductsDto = { idCategoria, nome, descricao, valor, status }
            await this.productsBusiness.create(inputs)
            res.status(201).send("Produto cadastrado com sucesso")
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const { idCategoria, nome, descricao, valor, status } = req.body
            const inputs: UpdateProductsDto = {id, idCategoria, nome, descricao, valor, status}
            await this.productsBusiness.update(inputs)
            res.status(201).send("Categoria atualizada com sucesso")
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
    delete = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        const idProduto = id
        try {
            await this.productsBusiness.delete(id, idProduto)
            res.status(200).send("Produto excluído com sucesso");
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }
}
export default new ProductsController(productsBusiness);