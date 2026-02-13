import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Star, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getBookImage } from '../Images/img'; 
import { Link, useLocation } from 'react-router-dom';


export default function FlashSale() {
  const { addToCart } = useCart();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  
  const [startIndex, setStartIndex] = useState(0);
  const BookDetails = location.pathname.includes("/Single")
  

  const itemsPerPage = 2; 

  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://bookstore.eraasoft.pro/api/book');
        
        setBooks(response.data.data.books);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flash sale books:", error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

 
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const formatTime = (val) => val.toString().padStart(2, '0');

  
  const handleNext = () => {
    // نتأكد إننا مش هنعدي آخر الكتب
    if (startIndex + itemsPerPage < books.length) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
 
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  
  const visibleBooks = books.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <div className="py-20 text-center flex justify-center"><Loader className="animate-spin text-pink-600"/></div>;

  return (
    <section className="py-12 bg-[#Fdfdfd]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        
        <div className={`${ BookDetails? 'hidden' : ''} flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6`}>
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Flash Sale</h2>
            <p className="text-gray-500 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.
            </p>
          </div>

        
          <div className="flex items-center gap-4">
             <div className="w-20 h-20 rounded-full border-[3px] border-[#d63384] flex items-center justify-center bg-white shadow-sm">
                <span className="text-[#d63384] font-bold text-lg">
                  {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                </span>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
            
            
            <button 
                onClick={handlePrev}
                disabled={startIndex === 0} 
                className={`hidden md:flex w-10 h-10 rounded-full border items-center justify-center transition shadow-sm
                  ${startIndex === 0 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-[#d63384]'}`}
            >
                <ChevronLeft size={20} />
            </button>

            
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-500">
                {visibleBooks.map((book) => (
                    <div key={book.bookId} className="bg-[#1C1C2E] rounded-2xl p-6 flex flex-col sm:flex-row gap-6 relative overflow-hidden group">
                        
                        
                        <div className="w-full sm:w-36 h-48 shrink-0 rounded-lg overflow-hidden bg-gray-700 mx-auto sm:mx-0">
                            <img src={getBookImage(book)} alt={book.bookName} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                        </div>

                       
                        <div className="flex-1 flex flex-col justify-between text-white">
                            <div>
                                <h3 className="text-xl font-bold mb-1 line-clamp-1">{book.bookName}</h3>
                                <p className="text-gray-400 text-sm mb-2 line-clamp-1">Author: {book.author}</p>
                                
                               
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className={i < (book.rate || 4) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"} />
                                    ))}
                                    <span className="text-xs text-gray-400 ml-2">({book.id * 12} Reviews)</span>
                                </div>

                                
                                <div className="flex items-center gap-3 mb-4">
                                    {book.discount > 0 && (
                                       <span className="text-gray-500 line-through text-sm">${book.price}</span>
                                    )}
                                    <span className="text-2xl font-bold text-white">${Number(book.final_price).toFixed(2)}</span>
                                </div>
                            </div>

                           
                            <div className="flex items-end justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-300">Available: {book.stock || 15}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                       
                                        <div 
                                            className="h-full bg-orange-400 rounded-full" 
                                            style={{ width: `${Math.random() * 40 + 40}%` }}
                                        ></div>
                                    </div>
                                </div>
                                  <Link to="/Cart">
                                <button 
                                    onClick={() => addToCart(book)}
                                    className="w-10 h-10 bg-[#d63384] hover:bg-pink-600 rounded-lg flex items-center justify-center text-white transition shadow-lg shadow-pink-900/20"
                                    >
                                    <ShoppingCart size={18} />
                                </button>
                                    </Link>
                            </div>
                        </div>

                     
                        <div className="absolute top-4 right-4 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded-full">
                           Flash Sale
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={handleNext}
                disabled={startIndex + itemsPerPage >= books.length} 
                className={`hidden md:flex w-10 h-10 rounded-full border items-center justify-center transition shadow-sm
                  ${startIndex + itemsPerPage >= books.length ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-[#d63384]'}`}
            >
                <ChevronRight size={20} />
            </button>
        </div>

    
        <div className="flex md:hidden justify-center gap-4 mt-6">
            <button onClick={handlePrev} disabled={startIndex === 0} className="w-10 h-10 rounded-full border flex items-center justify-center bg-white text-gray-600 disabled:opacity-50"><ChevronLeft/></button>
            <button onClick={handleNext} disabled={startIndex + itemsPerPage >= books.length} className="w-10 h-10 rounded-full border flex items-center justify-center bg-white text-gray-600 disabled:opacity-50"><ChevronRight/></button>
        </div>

      </div>
    </section>
  );
}