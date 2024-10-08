export interface Product {
    id: number;
    title: string;
    images: string[];
    price: number;
    category: {
      id: number;
      name: string;
      image: string;
    };
    isWished?: boolean;
  }
  