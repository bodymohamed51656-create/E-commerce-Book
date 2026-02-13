import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { getBookImage } from '../Images/img';
import { useWishlist } from '../context/WishlistContext';
import { 
  Search, Mic, ChevronDown, ChevronRight, 
  ShoppingCart, Heart, Star, SlidersHorizontal 
} from 'lucide-react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Shop() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

 
  const fetchBooks = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://bookstore.eraasoft.pro/api/book?page=${page}`);
      setBooks(response.data.data.books);
      setCategories(response.data.data.categories);
      setPagination(response.data.data.pagination_links.meta);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const renderStars = (rate) => {
    return [...Array(5)].map((_, i) => (
      <Star  key={i}  size={14}  className={i < (rate || 4) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}  />
    ));
  };

 

  return (
    <>
        
      <div className="min-h-screen bg-[#F9F9F9] font-sans">
          <Navbar />
        
      
        <div className=" max-w-[1600px] mx-auto px-4 md:px-8 py-8 pt-24 flex flex-col lg:flex-row gap-8">
          
         
          <aside className="w-full lg:w-64 shrink-0">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-800">Filter</h2>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4 cursor-pointer">
                <h3 className="font-semibold text-gray-700">Categories</h3>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <ul className="space-y-3">
                {categories.slice(0, 6).map((cat) => (
                  <li key={cat.id} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500" />
                      <span className="text-gray-600 group-hover:text-pink-600 transition text-sm">{cat.categoryName}</span>
                    </div>
                    <span className="text-xs text-gray-400">({Math.floor(Math.random() * 200) + 50})</span>
                  </li>
                ))}
              </ul>
              <button className="text-pink-600 text-sm font-semibold mt-3 hover:underline">Load More</button>
            </div>

            <div className="mb-6 border-t pt-4">
              <div className="flex justify-between items-center cursor-pointer">
                <h3 className="font-semibold text-gray-700">Publisher</h3>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            <div className="mb-6 border-t pt-4">
              <div className="flex justify-between items-center cursor-pointer">
                <h3 className="font-semibold text-gray-700">Year</h3>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </aside>

       
          <main className="flex-1">
            
       
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
              <div className="relative w-full md:w-[60%]">
                <div className="bg-gray-100 rounded-full flex items-center px-4 py-2 border border-transparent focus-within:border-gray-300 transition">
                  <span className="text-gray-400 text-sm mr-2">Search</span>
                  <input type="text" className="bg-transparent flex-1 outline-none text-gray-700" />
                  <div className="flex items-center gap-2 pl-2 border-l border-gray-300">
                    <Mic className="w-4 h-4 text-gray-500 cursor-pointer" />
                    <Search className="w-4 h-4 text-gray-500 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200 transition">
                <span className="text-gray-500 text-sm">Sort by</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            
            <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {["Business", "Self Help", "History", "Romance", "Fantasy", "Art", "Kids"].map((tag, i) => (
                <button 
                  key={i} 
                  className={`px-6 py-2 rounded-xl text-sm whitespace-nowrap border transition
                    ${i === 0 ? 'bg-[#d63384]/10 text-[#d63384] border-[#d63384]' : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'}`}
                >
                  {tag}
                </button>
              ))}
            </div>

          
            <div className="flex flex-col gap-6">
              {loading ? <div className="text-center py-20">Loading books...</div> : books.map((book) => (
                <Link to={`/Single/${book.bookId}`} key={book.bookId} className='block'>
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col md:flex-row gap-6 relative">
                    
                    <div className="absolute top-4 right-4 bg-gray-100 text-gray-400 text-[10px] px-2 py-1 rounded border border-gray-200">
                       25% Discount code: #123
                    </div>

                    <div className="w-full md:w-40 h-56 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                       <img 
                         src={getBookImage(book)} 
                         alt={book.bookName} 
                         className="w-full h-full object-cover"
                       />
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                       <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{book.bookName}</h3>
                       <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                         {book.description || "Lorem ipsum dolor sit amet..."}
                       </p>
                       
                       <div className="flex items-center gap-2 mb-4">
                          <div className="flex">{renderStars(book.rate)}</div>
                          <span className="text-gray-400 text-xs">(210 Review)</span>
                       </div>

                       <div className="flex gap-10 text-sm text-gray-500">
                          <div>
                            <span className="block text-xs text-gray-400 mb-1">Author</span>
                            <span className="font-medium text-gray-800">{book.author}</span>
                          </div>
                          <div>
                            <span className="block text-xs text-gray-400 mb-1">Year</span>
                            <span className="font-medium text-gray-800">{book.publicationYear}</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-row md:flex-col justify-end md:justify-center items-center gap-4 md:pl-6 md:border-l border-gray-100 min-w-[150px]">
                       <span className="text-2xl font-bold text-gray-800">
                         ${Number(book.final_price).toFixed(2)}
                       </span>
                       
                       <div className="flex gap-2 w-full">
                          <button onClick={(e) => {
                                 e.preventDefault();  addToCart(book); alert("Added to cart!");
                              }} className="flex-1 bg-[#d63384] hover:bg-pink-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition text-sm font-medium">
                             <ShoppingCart size={16} /> Add To Cart
                          </button>
                          <button onClick={(e) => {
           e.preventDefault(); 
           toggleWishlist(book);
        }}
        className={`p-2 border rounded-lg transition 
           ${isInWishlist(book.bookId) 
             ? 'bg-red-50 border-red-200 text-red-500' 
             : 'border-gray-300 text-gray-400 hover:text-red-500' 
           }`}>
                             <Heart size={18} className={isInWishlist(book.bookId) ? "fill-red-500" : ""} />
                          </button>
                       </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>

          
            <div className="flex justify-center items-center gap-2 mt-10">
               <button 
                  onClick={() => fetchBooks(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                  className="text-gray-400 hover:text-gray-800 disabled:opacity-30"
               >
                  Previous
               </button>
               
               {[1, 2, 3].map(num => (
                 <button 
                  key={num}
                   onClick={() => fetchBooks(num)}
                   className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition
                     ${pagination.current_page === num ? 'bg-[#d63384] text-white shadow-lg shadow-pink-200' : 'text-gray-500 hover:bg-gray-100'}`}
                 >
                   {num}
                 </button>
               ))}

               <button 
                  onClick={() => fetchBooks(pagination.current_page + 1)}
                  disabled={pagination.current_page === pagination.last_page}
                  className="text-gray-400 hover:text-gray-800 disabled:opacity-30 ml-2"
               >
                  Next &gt;
               </button>
            </div>

          </main>
        </div>
        
        <Footer />
      </div>
    </>
  );
}