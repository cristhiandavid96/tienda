import { Product } from "../entities/Product";

// Definimos una interfaz para el repositorio
export interface ProductRepository {
  getProductsByCategory(categoryId: number): Promise<Product[]>;
}

// Caso de uso para obtener productos por categoría
export class GetProductsByCategoryUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(categoryId: number): Promise<Product[]> {
    return this.productRepository.getProductsByCategory(categoryId);
  }
}
