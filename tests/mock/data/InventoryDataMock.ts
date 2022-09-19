import { UpdateInventoryDB } from "../../../src/model/Inventory";

export const InventoryMock = {
    idProduto: "id1",
    quantidade: 1,
    reserva: 1,
    status:1
}

export class InventoryDataMock{
    findOne = async (idProduto: string) => [InventoryMock];
    update = async (input: UpdateInventoryDB): Promise<void> => {}
}