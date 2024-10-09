import { Product } from "../../domain/entities/Product";
import { ProductRepository } from "../../domain/usecases/GetProductsByCategoryUseCase";
import axios from "axios";

export class ProductRepositoryImpl implements ProductRepository {
  private readonly baseUrl = 'https://api.escuelajs.co/api/v1/products';

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      const response = await axios.get<Product[]>(`${this.baseUrl}`);
      // Filtrar por `product.category.id` en lugar de `product.categoryId`    
      return response.data.filter((product) => product.category?.id === categoryId);
    } catch (error) {
      console.error('Error fetching products by category', error);
      return [];
    }
  }
}
