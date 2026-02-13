
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book,amount=1) => {
    setCartItems((prev) => {
      const isExist = prev.find((item) => item.bookId === book.bookId);
      if (isExist) return prev.map((item) => item.bookId === book.bookId ? { ...item, qty: item.qty + amount } : item);
      return [...prev, { ...book, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCartItems(prev => prev.filter(item => item.bookId !== id));

  const updateQuantity = (id, type) => {
    setCartItems(prev => prev.map(item => {
      if (item.bookId === id) {
        const newQty = type === 'inc' ? item.qty + 1 : item.qty - 1;
        return { ...item, qty: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  
  const subTotal = cartItems.reduce((acc, item) => acc + (Number(item.final_price) * item.qty), 0);
  
 
  const tax = 4.00; 
  
 
  const grandTotal = subTotal + tax;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, subTotal, tax, grandTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);