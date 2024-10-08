import axios from 'axios';
import { Category } from '../../domain/entities/Category';

export class CategoryApi {
  private readonly baseUrl = 'https://api.escuelajs.co/api/v1';

  async fetchCategories(): Promise<Category[]> {
    const response = await axios.get(`${this.baseUrl}/categories`);
    return response.data;
  }
}
