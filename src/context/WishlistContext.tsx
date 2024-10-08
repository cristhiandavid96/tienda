import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../domain/entities/Product';

// Definición del tipo de contexto
interface WishlistContextProps {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

// Crear el contexto
const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

// Hook para utilizar el contexto de la lista de deseados
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

  // Cargar la lista de deseados desde `localStorage` al iniciar
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Guardar la lista de deseados en `localStorage` cuando cambie
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Agregar un producto a la lista de deseados
  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => [...prevWishlist, product]);
  };

  // Eliminar un producto de la lista de deseados
  const removeFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((product) => product.id !== productId)
    );
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
