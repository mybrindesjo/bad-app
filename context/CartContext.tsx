import React, { createContext, useContext, useState } from 'react';

export type CartItem = {
  name: string;
  price: number;
  image: string;
};

type CartContextType = {
  items: CartItem[];
  addItems: (newItems: CartItem[]) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItems = (newItems: CartItem[]) => {
    setItems([...items, ...newItems]);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addItems, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
