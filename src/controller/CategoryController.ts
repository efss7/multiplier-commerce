import { Request, Response } from "express";
import categoryBusiness, { CategoryBusiness } from "../business/CategoryBusiness";
import { CategoryDto } from "../model/Categorias";

export class CategoryController {
    constructor(
        private categoryBusiness: CategoryBusiness
    ) { }
    findAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.categoryBusiness.findAll()
            res.status(200).send(result)
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }
    findOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id;
            const result = await this.categoryBusiness.findOne(id);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    };
    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const { titulo, status } = req.body
            const inputs: CategoryDto = { titulo, status }
            await this.categoryBusiness.create(inputs)
            res.status(201).send("Categoria cadastrada com sucesso")
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message })
        }
    }
    

}

export default new CategoryController(categoryBusiness);