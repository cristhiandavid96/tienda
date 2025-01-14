import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import CategoryProducts from './presentation/pages/CategoryProductsPage';
import Categories from './presentation/pages/CategoriesPage';
import WishlistPage from './presentation/pages/WishlistPage';
import { WishlistProvider } from './context/WishlistContext';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <WishlistProvider>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/categories" >
              <Categories />
            </Route>
            <Route exact path="/category-products/:categoryId" >
              <CategoryProducts />
            </Route>
            <Route exact path="/">
              <Redirect to="/categories" />
            </Route>
            <Route path="/wishlist" exact>
              <WishlistPage />
            </Route>
          </IonRouterOutlet>
        </IonTabs>
      </IonReactRouter>
    </WishlistProvider>

  </IonApp>
);

export default App;
