import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonThumbnail, IonImg, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import { useWishlistContext } from '../../context/WishlistContext';

const WishlistPage: React.FC = () => {
  const { wishlist,removeFromWishlist } = useWishlistContext();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/categories" />
          </IonButtons>
          <IonTitle>Lista de Deseados</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {wishlist.map((product) => (
            <IonItem key={product.id}>
              <IonThumbnail slot="start">
                <IonImg src={product.images[0].replace('["', '').replace('"]', '')} />
              </IonThumbnail>
              <IonLabel>
                <h2>{product.title}</h2>
                <p>Precio: ${product.price}</p>
              </IonLabel>
              {/* Botón para eliminar de la lista de deseados */}
              <IonButton
                fill="clear"
                color="danger"
                slot="end"
                onClick={() => removeFromWishlist(product.id)}
              >
                Quitar
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default WishlistPage;
