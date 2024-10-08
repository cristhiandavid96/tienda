import { useEffect, useState } from 'react';
import { Product } from '../domain/entities/Product';

// Hook para gestionar la lista de productos deseados
export const useWishlist = () => {
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

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
};
