export enum STATUS {
    INATIVO = 0,
    ATIVO = 1
}

export class Category {
    constructor(
        private id: string,
        private codigo: string,
        private titulo: string,
        private status: STATUS
    ) { }
}

export interface CategoryDto {
    titulo: string,
    status: string
}
export interface CategoryDB {
    id: string,
    codigo: string,
    titulo: string,
    status: number
}