import React, { useState } from 'react';
import { BookOpen, Heart, ShoppingCart, LogOut, User, Timer, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const { wishlistItems } = useWishlist();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isBookPage = location.pathname.includes("/Books") || location.pathname.includes("/single") || location.pathname.includes("/login") || location.pathname.includes("/Signup") || location.pathname.includes("/Cart") || location.pathname.includes("/Wish") || location.pathname.includes("/profile") || location.pathname.includes("/order") || location.pathname.includes("/Check");
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="font-sans bg-gray-50 relative">
      <nav className={`${isBookPage ? 'nav shadow-md' : ''} absolute top-0 w-full z-50 flex justify-between bg-black/50 items-center px-6 md:px-12 py-4 text-white backdrop-blur-[2px]`}>
        
        <div className="flex items-center gap-4">
         
          <button 
            className="md:hidden p-1 hover:bg-white/10 rounded transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

         
          <Link to="/" className="flex items-center gap-2 text-xl font-bold cursor-pointer">
            <BookOpen className="w-6 h-6" />
            <span>Bookshop</span>
          </Link>
        </div>

        <ul className="hidden md:flex gap-8 text-sm font-medium">
          <li><Link to="/Home" className="hover:text-pink-400 transition font-semibold text-white">Home</Link></li>
          <li><Link to="/Books" className="hover:text-pink-400 transition font-semibold text-white">Books</Link></li>
          <li><Link to="/About" className="hover:text-pink-400 transition font-semibold text-white">About us</Link></li>
        </ul>

      
        <div className="flex items-center gap-4">
          {user ? (
            <>
          
              <div className="flex items-center gap-3 mr-2">
                <button onClick={() => navigate("/Wish")} className="relative p-2 hover:bg-white/10 rounded-full transition">
                  <Heart className="w-5 h-5 text-white" />
                  {wishlistItems.length > 0 && <span className="absolute top-0 right-0 bg-pink-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlistItems.length}</span>}
                </button>
                <button onClick={() => navigate("/Cart")} className="relative p-2 hover:bg-white/10 rounded-full transition">
                  <ShoppingCart className="w-5 h-5 text-white" />
                  {cartCount > 0 && <span className="absolute top-0 right-0 bg-pink-600 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
                </button>
              </div>

    
              <div 
                className="relative group"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div className="flex items-center gap-3 cursor-pointer py-2">
                  <img src={user.avatar || "https://i.pravatar.cc/150?img=12"} alt="User" className="w-9 h-9 rounded-full border-2 border-pink-500 object-cover" />
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-bold leading-none text-white">{user.name}</p>
                    <p className="text-[11px] text-gray-300">{user.email}</p>
                  </div>
                </div>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-0 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden text-gray-800 transition-all duration-200 z-50">
                    <div className="p-4 border-b border-gray-100 lg:hidden bg-gray-50">
                       <p className="font-bold text-sm truncate text-gray-900">{user.name}</p>
                       <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 hover:text-pink-600 transition text-sm font-medium"><User size={18} /> Profile</Link>
                    <button onClick={() => { navigate("/order"); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-pink-50 hover:text-pink-600 transition text-sm text-left font-medium"><Timer size={18}/> Order History</button>
                    <button onClick={() => { logout(); navigate("/Login"); }} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition text-sm text-left font-medium"><LogOut size={18} /> Logout</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => navigate("/Login")} className="bg-[#d63384] hover:bg-pink-700 text-white px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition whitespace-nowrap">Log in</button>
              <button onClick={() => navigate("/Signup")} className="bg-white hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition whitespace-nowrap hidden sm:block">Sign Up</button>
            </div>
          )}
        </div>
      </nav>

  
      {isMobileMenuOpen && (
        <>
          
            <div 
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
            ></div>

            
            <div className="fixed top-0 left-0 h-full w-[70%] max-w-[300px] bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out">
                
                
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-2 text-[#d63384] font-bold text-lg">
                        <BookOpen className="w-6 h-6" />
                        <span>Bookshop</span>
                    </div>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-red-500 transition">
                        <X size={24} />
                    </button>
                </div>

              
                <div className="py-2">
                    <Link 
                        to="/Home" 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="flex items-center gap-4 px-6 py-4 text-gray-700 font-semibold hover:bg-pink-50 hover:text-pink-600 border-l-4 border-transparent hover:border-pink-600 transition"
                    >
                        Home
                    </Link>
                    <Link 
                        to="/Books" 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="flex items-center gap-4 px-6 py-4 text-gray-700 font-semibold hover:bg-pink-50 hover:text-pink-600 border-l-4 border-transparent hover:border-pink-600 transition"
                    >
                        Books
                    </Link>
                    <Link 
                        to="/About" 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="flex items-center gap-4 px-6 py-4 text-gray-700 font-semibold hover:bg-pink-50 hover:text-pink-600 border-l-4 border-transparent hover:border-pink-600 transition"
                    >
                        About us
                    </Link>
                </div>

                
                {user && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="px-6 mb-4">
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">My Account</p>
                        </div>
                        <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition font-medium">
                            <User size={18} /> Profile
                        </Link>
                        <Link to="/order" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition font-medium">
                            <Timer size={18} /> Order History
                        </Link>
                         <button 
                            onClick={() => { logout(); setIsMobileMenuOpen(false); navigate("/Login"); }} 
                            className="w-full flex items-center gap-3 px-6 py-3 text-red-500 hover:bg-red-50 transition font-medium text-left"
                        >
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                )}
                
                
                {!user && (
                    <div className="p-6 mt-4 border-t border-gray-100">
                        <button onClick={() => { navigate("/Login"); setIsMobileMenuOpen(false); }} className="w-full bg-[#d63384] text-white py-3 rounded-lg font-bold shadow-md hover:bg-pink-700 transition mb-3">
                            Log In
                        </button>
                        <button onClick={() => { navigate("/Signup"); setIsMobileMenuOpen(false); }} className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-50 transition">
                            Create Account
                        </button>
                    </div>
                )}

            </div>
        </>
      )}

    </div>
  );

}
