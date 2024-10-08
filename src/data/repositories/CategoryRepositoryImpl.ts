import { Category } from '../../domain/entities/Category';
import { CategoryRepository } from '../../domain/usecases/GetCategoriesUseCase';
import { CategoryApi } from '../api/CategoryApi';

export class CategoryRepositoryImpl implements CategoryRepository {
  private categoryApi = new CategoryApi();

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryApi.fetchCategories();
    return categories.filter((category) => !/books|test/i.test(category.name)); // Filtrar categorías
  }
}
