import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa'; 


export default function RecommendedBooks() {
    const BOOKS = ["/book1.png","/book2.jpg"] 
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      
      const response = await axios.get('https://bookstore.eraasoft.pro/api/home');
      
      
      if (response.data.data && response.data.data.recommended) {
        setBooks(response.data.data.recommended); 
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recommended books:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const renderStars = (rating) => {
   
    const safeRating = rating || 0;
    return [...Array(5)].map((_, index) => (
      <FaStar 
        key={index} 
        className={index < safeRating ? "text-yellow-400" : "text-gray-300"} 
      />
    ));
  };

 

  return (
    <section className="bg-gray-50 py-12 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-8 border-l-4 border-purple-600 pl-3">
          Recommended For You
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {books.map((book,index) => (
            <div 
              key={book.bookId} 
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start" >
             
              <div className="w-32 h-48  overflow-hidden rounded-md border border-gray-100 bg-gray-200">
                <img  src={BOOKS[index%2]} alt={book.bookName} className="w-full h-full object-cover"/>
              </div>

              
              <div className="flex-1 flex flex-col justify-between h-48">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1 line-clamp-2">
                    {book.bookName} 
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    Author: <span className="text-gray-700 font-medium">{book.author}</span>
                  </p>
                  
                  
                  <div className="flex items-center gap-1 text-sm mb-3">
                    {renderStars(book.rate)} 
                    <span className="text-gray-400 text-xs ml-2">({book.countReview} Reviews)</span>
                  </div>
                  
                  
                  <div className="flex items-center gap-2">
                     <span className="text-xl font-bold text-purple-700">
                        ${Number(book.final_price).toFixed(2)}
                     </span>
                    
                     {book.discount > 0 && (
                        <span className="text-gray-400 line-through text-sm">
                            ${Number(book.price).toFixed(2)}
                        </span>
                     )}
                  </div>
                </div>

                
                <div className="flex gap-3 mt-3">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition">
                    <FaShoppingCart /> Add To Cart
                  </button>
                  
                  <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-gray-400 hover:text-red-500 hover:border-red-500 transition">
                    <FaHeart />
                  </button>
                </div>
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}