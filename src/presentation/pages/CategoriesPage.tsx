import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonThumbnail, IonImg, IonButton, IonIcon } from '@ionic/react';
import { GetCategoriesUseCase } from '../../domain/usecases/GetCategoriesUseCase';
import { CategoryRepositoryImpl } from '../../data/repositories/CategoryRepositoryImpl';
import { Category } from '../../domain/entities/Category';
import { useHistory } from 'react-router-dom';
import { heart } from 'ionicons/icons';
import  './button.css';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const history = useHistory();

  useEffect(() => {
    // Crear el caso de uso e invocarlo
    const categoryRepository = new CategoryRepositoryImpl();
    const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
    getCategoriesUseCase.execute().then(setCategories).catch(console.error);
  }, []);

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
      <div className='custom-button'>
        <IonButton slot='end'  onClick={() => history.push('/wishlist')} >
          Ver Deseados
          <IonIcon slot="end" icon={heart} />
        </IonButton>
      </div>
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

export default CategoriesPage;
