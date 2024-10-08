import { GetCategoriesUseCase } from "../../domain/usecases/GetCategoriesUseCase";
import { Category } from "../../domain/entities/Category";

export class CategoryController {
  private getCategoriesUseCase: GetCategoriesUseCase;

  constructor(getCategoriesUseCase: GetCategoriesUseCase) {
    this.getCategoriesUseCase = getCategoriesUseCase;
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.getCategoriesUseCase.execute();
  }
}
