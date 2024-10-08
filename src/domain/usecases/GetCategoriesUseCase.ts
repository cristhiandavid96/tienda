import { Category } from "../entities/Category";

export interface CategoryRepository {
  getCategories(): Promise<Category[]>;
}

export class GetCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.getCategories();
  }
}
