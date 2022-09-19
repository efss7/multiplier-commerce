import { CategoryDB, UpdateCategoryDB } from "../../../src/model/Category";

export const CategoryMock={
    id:"id1",
    codigo:"codigo1",
    titulo: "titulo1",
    status: 1
}

export class CategoryDataMock{
    findAll = async (): Promise<CategoryDB[]> => [CategoryMock]
    findOne = async (id: string) => [CategoryMock];
    create = async (input: CategoryDB): Promise<void> => {};
    update = async (input: UpdateCategoryDB): Promise<void> => {}
    delete = async (id: string): Promise<void> => {};
}