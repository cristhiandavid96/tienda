import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../domain/entities/Product';

// Definición del contexto
interface WishlistContextProps {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

// Crear el contexto
const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

// Hook para utilizar el contexto
export const useWishlistContext = (): WishlistContextProps => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlistContext must be used within a WishlistProvider');
  }
  return context;
};

// Proveedor del contexto
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Cargar la lista de deseados desde `localStorage` al montar el componente
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      try {
        const parsedWishlist: Product[] = JSON.parse(storedWishlist);
        setWishlist(parsedWishlist);
        console.log("Wishlist cargada desde localStorage:", parsedWishlist);
      } catch (error) {
        console.error("Error al parsear wishlist desde localStorage:", error);
      }
    }
  }, []);

  // Guardar la lista de deseados en `localStorage` cuando cambie
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Agregar un producto a la lista de deseados
  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const newWishlist = [...prevWishlist, { ...product, dateAdded: new Date().toISOString() }];
      console.log("Producto agregado a la lista de deseados:", newWishlist);
      return newWishlist;
    });
  };

  // Eliminar un producto de la lista de deseados
  const removeFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter((product) => product.id !== productId);
      console.log("Producto eliminado de la lista de deseados:", updatedWishlist);
      return updatedWishlist;
    });
  };

  // Verificar si un producto está en la lista de deseados
  const isInWishlist = (productId: number) => {
    return wishlist.some((product) => product.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
