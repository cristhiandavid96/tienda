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
  IonButton,
  IonIcon,
} from '@ionic/react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { arrowBackOutline } from 'ionicons/icons';

interface Product {
  id: number;
  title: string;
  images: string[];
}

interface RouteParams {
  categoryId: string;
}

const CategoryProducts: React.FC = () => {
  const { categoryId } = useParams<RouteParams>();
  const [products, setProducts] = useState<Product[]>([]);
  const history = useHistory();

  useEffect(() => {
    // Llamar a la API para obtener los productos de la categoría seleccionada
    axios
      .get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error al cargar los productos: ', error));
  }, [categoryId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* Botón de regresar */}
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
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
              <IonLabel>{product.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CategoryProducts;
