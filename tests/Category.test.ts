import { CategoryBusiness } from "../src/business/CategoryBusiness";
import IdGenerator from "../src/services/IdGenerator";
import { CategoryDataMock } from "./mock/data/CategoryDataMock";
import { ProductsDataMock } from "./mock/data/ProductsDataMock";

const CategoryBusinessMock = new CategoryBusiness(
    new CategoryDataMock(),
    new IdGenerator(),
    new ProductsDataMock()
);

const inputs = {
    id: "id1",
    codigo: "codigo1",
    titulo: "titulo1",
    status: "ativo"
}


describe("test CategoryBusiness class", () => {
    describe("test findAll", () => {
        test("test response", async () => {
            const result = await CategoryBusinessMock.findAll();
            expect(result).toEqual([{...inputs, status: 1}])
        })
    })
    describe("test findOne", () => {
        test("test response", async () => {
            const result = await CategoryBusinessMock.findOne(inputs.id);
            expect(result).toEqual([{ ...inputs, status: 1 }])
        })
    })
    describe("test create", () => {
        test("test missing titulo", async () => {
            inputs.titulo = "";
            try {
                await CategoryBusinessMock.create(inputs)
            } catch (error: any) {
                inputs.titulo = "titulo1";
                expect(error.message).toEqual("Título não foi passado");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        })
        test("test missing codigo", async () => {
            inputs.status = "";
            try {
                await CategoryBusinessMock.create(inputs)
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
        test("test missing titulo", async () => {
            inputs.titulo = "";
            try {
                await CategoryBusinessMock.create(inputs)
            } catch (error: any) {
                inputs.titulo = "titulo1";
                expect(error.message).toEqual("Título não foi passado");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        })
        test("test missing status", async () => {
            inputs.status = "";
            try {
                await CategoryBusinessMock.create(inputs)
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
        test("test missing id", async () => {
            inputs.id = "";
            try {
                await CategoryBusinessMock.delete(inputs.id);
            } catch (error: any) {
                inputs.id = "user1";
                expect(error.message).toEqual("ID inválido");
                expect(error.statusCode).toStrictEqual(422);
            } finally {
                expect.assertions(2);
            }
        });
    });
})