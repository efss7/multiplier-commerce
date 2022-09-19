import {InventoryBusiness} from "../src/business/InventoryBusiness";
import { InventoryDataMock } from "./mock/data/InventoryDataMock";

const InventoryBusinessMock = new InventoryBusiness(
    new InventoryDataMock()
)

const inputs: any = {
    idProduto: "id1",
    quantidade: 1,
    reserva: 1,
    status: "ativo"
}

describe("test InventoryBusiness class", () => {
    describe("test findOne", () => {
        test("test response", async () => {
            const result = await InventoryBusinessMock.findOne(inputs.idProduto);
            expect(result).toEqual([{ ...inputs, status: 1 }])
        })
    })
    describe("test update", () => {
        test("test missing idProduto", async () => {
            inputs.idProduto = "";
            try {
                await InventoryBusinessMock.update(inputs)
            } catch (error: any) {
                inputs.idProduto = "id1";
                expect(error.message).toEqual("Produto invalido");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        })
    })
    test("test missing idProduto", async () => {
        inputs.quantidade = undefined;
        try {
            await InventoryBusinessMock.update(inputs)
        } catch (error: any) {
            inputs.quantidade = 1;
            expect(error.message).toEqual("Quantidade não foi passado");
            expect(error.statusCode).toStrictEqual(422);
        } finally {
            expect.assertions(2);
        }
    })
    test("test missing reserva", async () => {
        inputs.reserva = undefined;
        try {
            await InventoryBusinessMock.update(inputs)
        } catch (error: any) {
            inputs.reserva = 1;
            expect(error.message).toEqual("Reserva não foi passada");
            expect(error.statusCode).toStrictEqual(422);
        } finally {
            expect.assertions(2);
        }
    })
    test("test missing status", async () => {
        inputs.status = "";
        try {
            await InventoryBusinessMock.update(inputs)
        } catch (error: any) {
            inputs.status = "ativo";
            expect(error.message).toEqual("Status inválido");
            expect(error.statusCode).toStrictEqual(422);
        } finally {
            expect.assertions(2);
        }
    })
})