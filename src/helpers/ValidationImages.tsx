import { Product } from "../domain/entities/Product";

  // Función para verificar si la imagen existe
  export const checkImageExists = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;

      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  // Filtra los productos manteniendo solo aquellos que tienen una imagen válida
  export const filterProductsWithValidImages = async (products: Product[]): Promise<Product[]> => {
    const validProducts: Product[] = [];

    for (const product of products) {
      if (product.images.length > 0) {
        const isImageValid = await checkImageExists(product.images[0]);
        if (isImageValid) {
          validProducts.push(product);
        }
      }
    }

    return validProducts;
  };