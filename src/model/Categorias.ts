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
    codigo: string,
    titulo: string,
    status: STATUS
}
export interface CategoryDB {
    id: string,
    codigo: string,
    titulo: string,
    status: STATUS
}