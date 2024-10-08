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
} from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  image: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const history = useHistory();

  useEffect(() => {
    // Llamar a la API para obtener las categorías
    axios
      .get('https://api.escuelajs.co/api/v1/categories')
      .then((response) => {
        // Filtrar las categorías que no contengan "books" o "test" en su nombre
        const filteredCategories = response.data.filter((category: Category) =>
          !/books|test/i.test(category.name)
        );
        setCategories(filteredCategories);
      })
      .catch((error) => console.error('Error al cargar las categorías: ', error));
  }, []);

  // Función para navegar a la pantalla de productos por categoría
  const showCategoryProducts = (categoryId: number) => {
    history.push(`/category-products/${categoryId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Categorías</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {categories.map((category) => (
            <IonItem key={category.id} button onClick={() => showCategoryProducts(category.id)}>
              <IonThumbnail slot="start">
                <IonImg src={category.image} />
              </IonThumbnail>
              <IonLabel>{category.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Categories;
