export enum STATUS {
    INATIVO = 0,
    ATIVO = 1
}

export class Products {
    constructor(
        private id: string,
        private idCategoria: string,
        private codigo: string,
        private nome: string,
        private descricao: string,
        private valor: number,
        private status: STATUS
    ) { }
}

export interface CreateProductsDto {
    idCategoria: string,
    nome: string,
    descricao: string,
    valor: number,
    status: string
}
export interface UpdateProductsDto {
    id: string,
    idCategoria: string,
    nome: string,
    descricao: string,
    valor: number,
    status: string
}
export interface ProductsDB {
    id: string,
    idCategoria: string,
    codigo: string,
    nome: string,
    descricao: string,
    valor: number,
    status: number
}
export interface UpdateProductsDB {
    id:string,
    idCategoria: string,
    nome: string,
    descricao: string,
    valor: number,
    status: number
}