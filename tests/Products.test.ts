import {ProductsBusiness} from "../src/business/ProductsBusiness";
import IdGenerator from "../src/services/IdGenerator";
import { ProductsDataMock } from "./mock/data/ProductsDataMock";

const ProductsBusinessMock = new ProductsBusiness(
    new ProductsDataMock(),
    new IdGenerator()
)

const inputs = {
    id: "id1",
    idCategoria: "categoria1",
    codigo:"codigo1",
    nome:"nome1",
    descricao:"descricao1",
    valor: 1,
    status: "ativo"
}

describe("test ProductsBusiness class", () => {
    describe("test findAll", () => {
        test("test response", async () => {
            const result = await ProductsBusinessMock.findAll();
            expect(result).toEqual([{ ...inputs, status: 1 }])
        })
    })
    describe("test findOne", () => {
        test("test response", async () => {
            const result = await ProductsBusinessMock.findOne(inputs.id);
            expect(result).toEqual([{ ...inputs, status: 1 }])
        })
    })
    describe("test create", () => {
        test("test missing idCategoria", async () => {
            inputs.idCategoria = "";
            try {
                await ProductsBusinessMock.create(inputs)
            } catch (error: any) {
                inputs.idCategoria = "categoria1";
                expect(error.message).toEqual("Categoria inválida");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        })
        test("test missing nome", async () => {
            inputs.nome = "";
            try {
                await ProductsBusinessMock.create(inputs)
            } catch (error: any) {
                inputs.nome = "nome1";
                expect(error.message).toEqual("Nome não foi passado");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        })
        test("test missing descricao", async () => {
            inputs.descricao = "";
            try {
                await ProductsBusinessMock.create(inputs)
            } catch (error: any) {
                inputs.descricao = "descricao1";
                expect(error.message).toEqual("Descrição não foi passada");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        })
        test("test missing valor", async () => {
            inputs.valor = 0;
            try {
                await ProductsBusinessMock.create(inputs)
            } catch (error: any) {
                inputs.valor = 1;
                expect(error.message).toEqual("Valor não passado");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        })
        test("test missing status", async () => {
            inputs.status = "";
            try {
                await ProductsBusinessMock.create(inputs)
            } catch (error: any) {
                inputs.status = "ativo";
                expect(error.message).toEqual("Status inválido");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        })
    })
    describe("test update", () => {
        test("test missing id", async () => {
            inputs.id = "";
            try {
                await ProductsBusinessMock.update(inputs)
            } catch (error: any) {
                inputs.id = "id1";
                expect(error.message).toEqual("ID inválido");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        })
        test("test missing idCategoria", async () => {
            inputs.idCategoria = "";
            try {
                await ProductsBusinessMock.update(inputs)
            } catch (error: any) {
                inputs.idCategoria = "categoria1";
                expect(error.message).toEqual("Categoria invalida");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        })
        test("test missing nome", async () => {
            inputs.nome = "";
            try {
                await ProductsBusinessMock.update(inputs)
            } catch (error: any) {
                inputs.nome = "nome1";
                expect(error.message).toEqual("Nome não foi passado");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        })
        test("test missing descricao", async () => {
            inputs.descricao = "";
            try {
                await ProductsBusinessMock.update(inputs)
            } catch (error: any) {
                inputs.descricao = "descricao1";
                expect(error.message).toEqual("Descrição não foi passada");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        })
        test("test missing valor", async () => {
            inputs.valor = 0;
            try {
                await ProductsBusinessMock.update(inputs)
            } catch (error: any) {
                inputs.valor = 1;
                expect(error.message).toEqual("Valor não foi passado");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        })
        test("test missing status", async () => {
            inputs.status = "";
            try {
                await ProductsBusinessMock.update(inputs)
            } catch (error: any) {
                inputs.status = "ativo";
                expect(error.message).toEqual("Status inválido");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        })
    })
    describe("test delete", () => {
        test("test missing id and idCategoria", async () => {
            inputs.id = "";
            inputs.idCategoria="";
            try {
                await ProductsBusinessMock.delete(inputs.id, inputs.idCategoria);
            } catch (error: any) {
                inputs.id = "user1";
                inputs.idCategoria="categoria1"
                expect(error.message).toEqual("ID inválido");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        });
    });
})