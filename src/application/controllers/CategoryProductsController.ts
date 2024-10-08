import { GetProductsByCategoryUseCase } from "../../domain/usecases/GetProductsByCategoryUseCase";
import { Product } from "../../domain/entities/Product";

export class CategoryProductsController {
  private getProductsByCategoryUseCase: GetProductsByCategoryUseCase;

  constructor(getProductsByCategoryUseCase: GetProductsByCategoryUseCase) {
    this.getProductsByCategoryUseCase = getProductsByCategoryUseCase;
  }

  async getProducts(categoryId: number): Promise<Product[]> {
    return await this.getProductsByCategoryUseCase.execute(categoryId);
  }
}
