import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlistItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  
  const toggleWishlist = (book) => {
    setWishlistItems((prev) => {
      const isExist = prev.find((item) => item.bookId === book.bookId);
      if (isExist) {
       
        return prev.filter((item) => item.bookId !== book.bookId);
      }
     
      return [...prev, book];
    });
  };

 
  const removeFromWishlist = (bookId) => {
    setWishlistItems((prev) => prev.filter((item) => item.bookId !== bookId));
  };

 
  const isInWishlist = (bookId) => {
    return wishlistItems.some((item) => item.bookId === bookId);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);