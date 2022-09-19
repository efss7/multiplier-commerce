import { InventoryDB } from "../../../src/model/Inventory";
import { ProductsDB, UpdateProductsDB } from "../../../src/model/Products";

export const ProductsMock = {
    id: "id1",
    idCategoria: "id1",
    codigo: "codigo1",
    nome: "nome1",
    descricao: "descricao1",
    valor: 1,
    status: 1
}

export class ProductsDataMock {
    findAll = async (): Promise<ProductsDB[]> => [ProductsMock]
    findOne = async (id: string) => [ProductsMock]
    create = async (inputsProducts: ProductsDB, inputsInventory: InventoryDB): Promise<void> => { };
    update = async (input: UpdateProductsDB): Promise<void> => { }
    delete = async (id: string, idProduto: string): Promise<void> => { };
    findByCategory = async (idCategoria: string) => [ProductsMock]
}