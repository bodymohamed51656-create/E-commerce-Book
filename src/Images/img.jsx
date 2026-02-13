
const localImages = {
  1: "/book1.png",     
  2: "/book2.jpg",      
  3: "/book3.jpg", 
  4: "/book4.jpg", 
  5: "/book5.jpg", 
  6: "/book6.jpg", 
  7: "/book7.png", 
  8: "/book8.png", 
  9: "/book2.jpg",      
};

export const getBookImage = (book) => {
 
  if (book.bookImage && book.bookImage.length > 0) {
    return book.bookImage[0].image;
  }
  

  if (localImages[book.bookId]) {
    return localImages[book.bookId];
  }
  
 
  return "https://via.placeholder.com/150?text=No+Image";
};