export enum STATUS {
    INATIVO = 0,
    ATIVO = 1
}

export class Inventory {
    constructor(
        private id: string,
        private idProduto: string,
        private quantidade: number,
        private reserva: number,
        private status: STATUS
    ) { }
}

export interface UpdateInventoryDto {
    idProduto: string,
    quantidade: number,
    reserva: number,
    status: string
}
export interface InventoryDB {
    id: string,
    idProduto: string,
    quantidade: number,
    reserva: number,
    status: number
}
export interface UpdateInventoryDB {
    idProduto: string,
    quantidade: number,
    reserva: number,
    status: number
}

