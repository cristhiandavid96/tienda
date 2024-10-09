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
  IonButton,
  IonIcon,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { heart, heartOutline } from 'ionicons/icons';
import { Product } from '../../domain/entities/Product';
import { CategoryProductsController } from '../../application/controllers/CategoryProductsController';
import { ProductRepositoryImpl } from '../../data/repositories/ProductRepositoryImpl';
import { GetProductsByCategoryUseCase } from '../../domain/usecases/GetProductsByCategoryUseCase';
import { useWishlistContext } from '../../context/WishlistContext'; // Usar el nuevo contexto
import { filterProductsWithValidImages } from '../../helpers/ValidationImages';
import { useHistory } from 'react-router-dom';
import  './button.css';

interface RouteParams {
  categoryId: string;
}

const CategoryProductsPage: React.FC = () => {
  const { categoryId } = useParams<RouteParams>();
  const [products, setProducts] = useState<Product[]>([]);
  const categoryIdNumber = parseInt(categoryId, 10);
  const history = useHistory();

  // Usar el contexto de wishlist en lugar de un hook local
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlistContext();

  useEffect(() => {
    const productRepository = new ProductRepositoryImpl();
    const getProductsByCategoryUseCase = new GetProductsByCategoryUseCase(productRepository);
    const categoryProductsController = new CategoryProductsController(getProductsByCategoryUseCase);

    categoryProductsController
      .getProducts(categoryIdNumber)
      .then(async (fetchedProducts) => {
        // Actualizar la propiedad `isWished` de cada producto con la información del contexto       

        const productsWithWishlist = fetchedProducts.map((product) => ({
          ...product,
          isWished: isInWishlist(product.id),
        }));
        setProducts(productsWithWishlist);
      })
      .catch(console.error);
  }, [categoryIdNumber, isInWishlist]);

  const handleWishlistToggle = (product: Product) => {
    if (product.isWished) {
      removeFromWishlist(product.id);
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, isWished: false } : p
        )
      );
    } else {
      addToWishlist(product);
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, isWished: true } : p
        )
      );
    }
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
      <div className='custom-button'>
        <IonButton slot='end'  onClick={() => history.push('/wishlist')} >
          Ver Deseados
          <IonIcon slot="end" icon={heart} />
        </IonButton>
      </div>
      <IonContent className="ion-padding">
        <IonList>
          {products.map((product) => (
            <IonItem key={product.id}>
              <IonThumbnail slot="start">
                <IonImg src={product.images[0].replace('["', '').replace('"]', '')} />
              </IonThumbnail>
              <IonLabel>
                <h2>{product.title}</h2>
                <p>Precio: ${product.price}</p>
              </IonLabel>
              {/* Botón para agregar/eliminar de la lista de deseados */}
              <IonButton
                fill="clear"
                color="danger"
                slot="end"
                onClick={() => handleWishlistToggle(product)}
              >
                <IonIcon icon={product.isWished ? heart : heartOutline} />
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CategoryProductsPage;
