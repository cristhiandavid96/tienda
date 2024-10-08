import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonImg,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { Product } from '../../domain/entities/Product';
import { CategoryProductsController } from '../../application/controllers/CategoryProductsController';
import { ProductRepositoryImpl } from '../../data/repositories/ProductRepositoryImpl';
import { GetProductsByCategoryUseCase } from '../../domain/usecases/GetProductsByCategoryUseCase';

interface RouteParams {
  categoryId: string;
}

const CategoryProductsPage: React.FC = () => {
  const { categoryId } = useParams<RouteParams>();
  const [products, setProducts] = useState<Product[]>([]);
  const categoryIdNumber = parseInt(categoryId, 10);

  useEffect(() => {
    const productRepository = new ProductRepositoryImpl();
    const getProductsByCategoryUseCase = new GetProductsByCategoryUseCase(productRepository);
    const categoryProductsController = new CategoryProductsController(getProductsByCategoryUseCase);

    categoryProductsController
      .getProducts(categoryIdNumber)
      .then(async (fetchedProducts) => {
        // Filtrar productos con imágenes válidas
        const validProducts = await filterProductsWithValidImages(fetchedProducts);
        setProducts(validProducts);
      })
      .catch(console.error);
  }, [categoryIdNumber]);

  // Función para verificar si la imagen existe
  const checkImageExists = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;

      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  // Filtra los productos manteniendo solo aquellos que tienen una imagen válida
  const filterProductsWithValidImages = async (products: Product[]): Promise<Product[]> => {
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/categories" />
          </IonButtons>
          <IonTitle>Productos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {products.map((product) => (
            <IonItem key={product.id}>
              <IonThumbnail slot="start">
                <IonImg src={product.images[0]} />
              </IonThumbnail>
              <IonLabel>
                <h2>{product.title}</h2>
                <p>Precio: ${product.price}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CategoryProductsPage;
