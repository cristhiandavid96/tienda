import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonText,
  IonImg,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { arrowBackOutline } from 'ionicons/icons'; // Icono de regreso
import './ProductDetails.css'; // Archivo CSS para los estilos personalizados

const ProductDetails: React.FC = () => {
  const location = useLocation<{ category: { name: string; image: string } }>();
  const history = useHistory();
  const category = location.state?.category;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* Botón de regreso */}
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Categoria del Producto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div>
        <IonTitle size="small" className="product-title">Categoria</IonTitle>
        </div>
        <div className="product-details-container">
          {category?.image && (
            <IonImg
              src={category.image}
              alt={category.name}
              className="product-image" // Clase personalizada para dar estilo a la imagen
            />
          )}
          <IonText className="product-title">
            <h2>{category?.name}</h2>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductDetails;
