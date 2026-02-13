import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { getBookImage } from '../Images/img'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Trash2, ShoppingCart, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();


  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.bookId);
  };

  
  const moveAllToCart = () => {
    wishlistItems.forEach(item => addToCart(item));
    alert("All items moved to cart!");
  };

  return (
    <div className="bg-[#Fdfdfd] min-h-screen font-sans">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 pt-32">
        
      
        <div className="hidden md:grid grid-cols-12 gap-4 border-b border-gray-200 pb-4 mb-6 text-gray-500 font-semibold text-sm uppercase tracking-wider">
            <div className="col-span-8 text-left pl-4">Item</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Actions</div>
        </div>

        
        <div className="flex flex-col gap-6 mb-24">
            {wishlistItems.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-gray-100">
                    <p className="text-gray-500 text-xl mb-4">Your wishlist is empty</p>
                    <Link to="/books" className="text-purple-600 font-bold hover:underline">Browse Books</Link>
                </div>
            ) : (
                wishlistItems.map((item) => (
                    <div key={item.bookId} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        
                    
                        <div className="col-span-8 flex gap-6 text-left">
                            <div className="w-24 h-36 shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                <img src={getBookImage(item)} alt={item.bookName} className="w-full h-full object-cover" />
                            </div>
                            
                            <div className="flex flex-col justify-center gap-2">
                                <h3 className="font-bold text-gray-800 text-lg">{item.bookName}</h3>
                                <p className="text-gray-500 text-sm">Author: <span className="font-medium text-gray-700">{item.author}</span></p>
                                
                                <div className="flex items-center gap-1 text-gray-500 bg-gray-100 w-fit px-3 py-1 rounded-full text-xs font-medium border border-gray-200">
                                    <Truck size={12} /> Free Shipping
                                </div>
                                <p className="text-gray-300 text-[10px] mt-1">ASIN: {item.asinCode || "N/A"}</p>
                            </div>
                        </div>

                     
                        <div className="col-span-2 text-center text-xl font-bold text-gray-800">
                            ${Number(item.final_price).toFixed(2)}
                        </div>

                     
                        <div className="col-span-2 flex flex-col items-center gap-3">
                            <button 
                                onClick={() => handleMoveToCart(item)}
                                className="flex items-center gap-2 text-sm font-bold text-white bg-[#d63384] px-4 py-2 rounded-lg hover:bg-pink-700 transition w-full justify-center"
                            >
                                <ShoppingCart size={16} /> Add to Cart
                            </button>
                            <button 
                                onClick={() => removeFromWishlist(item.bookId)} 
                                className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-500 transition"
                            >
                                <Trash2 size={14} /> Remove
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
        
        {wishlistItems.length > 0 && (
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-40">
                <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    
                    <button 
                        onClick={moveAllToCart}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-bold text-sm transition"
                    >
                        Move all to cart
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="bg-[#d63384] text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-4">
                            <span>{wishlistItems.length} Items</span>
                            <span className="w-px h-4 bg-white/30"></span>
                            <span>${wishlistItems.reduce((acc, item) => acc + Number(item.final_price), 0).toFixed(2)}</span>
                        </div>
                        
                        <Link to="/Cart" className="flex items-center gap-2 text-gray-600 font-bold hover:text-[#d63384] transition">
                            Go to Cart <ArrowRight size={18} />
                        </Link>
                    </div>

                </div>
            </div>
        )}

      </div>
      <Footer />
    </div>
  );
}