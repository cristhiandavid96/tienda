import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonInfiniteScroll, IonToolbar, IonList, IonItem, IonLabel, IonThumbnail, IonImg } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Tab1.css';

interface Product {
  id: number;
  title: string;
  images: string[] | string; // Puede ser un array o string según la API
  category: any;
}
const Tab1: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [imageExistsMap, setImageExistsMap] = useState<{ [key: number]: boolean }>({});
  const history = useHistory();

  // Obtener productos de la API al cargar el componente
  useEffect(() => {
    axios.get('https://api.escuelajs.co/api/v1/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error al cargar los productos: ', error));
  }, []);

  // Navegar a la pantalla de detalles del producto al hacer clic en un item
  const showProductDetails = (category: any) => {
    history.push('/product-details', { category });
  };

  // Función para verificar si una imagen existe
  const checkImageExists = (url: string, productId: number) => {
    const img = new Image();
    img.onload = () => setImageExistsMap((prevState) => ({ ...prevState, [productId]: true }));
    img.onerror = () => setImageExistsMap((prevState) => ({ ...prevState, [productId]: false }));
    img.src = url;
  };
  // Ejecutar la verificación de las imágenes después de cargar los productos
  useEffect(() => {
    products.forEach((product) => {
      const imageUrl = Array.isArray(product.images) ? product.images[0] : product.images;
      checkImageExists(imageUrl, product.id);
    });
  }, [products]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Productos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {products.map((product) => {
            // Obtener la URL de la imagen según el tipo de `product.images`
            const imageUrl = Array.isArray(product.images) ? product.images[0] : product.images;

            return (
              imageExistsMap[product.id] &&
              (<IonItem key={product.id} button onClick={() => showProductDetails(product.category)}>
                <IonThumbnail slot="start">
                  <IonImg src={imageUrl} alt={product.title} />
                </IonThumbnail>
                <IonLabel>{product.title}</IonLabel>
              </IonItem>)
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
