import React from 'react';
import { useCart } from '../context/CartContext';
import { getBookImage } from '../Images/img';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Trash2, Minus, Plus, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
    const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, subTotal, tax, grandTotal } = useCart();


 

  return (
    <div className="bg-[#Fdfdfd] min-h-screen font-sans">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 pt-32">
        <div className="hidden md:grid grid-cols-12 gap-4 border-b border-gray-200 pb-4 mb-6 text-gray-500 font-semibold text-sm uppercase tracking-wider text-center">
            <div className="col-span-6 text-left pl-4">Item</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Total Price</div>
        </div>

       
        <div className="flex flex-col gap-8 mb-16">
            {cartItems.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-xl mb-4">Your cart is empty</p>
                    <Link to="/books" className="text-purple-600 font-bold hover:underline">Start Shopping</Link>
                </div>
            ) : (
                cartItems.map((item) => (
                    <div key={item.bookId} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-gray-100 pb-8 last:border-0">
                        
                       
                        <div className="col-span-6 flex gap-6 text-left">
                           
                            <div className="w-32 h-44 shrink-0 bg-gray-100 rounded-md overflow-hidden shadow-sm">
                                <img src={getBookImage(item)} alt={item.bookName} className="w-full h-full object-cover" />
                            </div>
                            
                            <div className="flex flex-col justify-center gap-1">
                                <h3 className="font-bold text-gray-800 text-lg">{item.bookName}</h3>
                                <p className="text-gray-500 text-sm">Author: <span className="font-medium text-gray-700">{item.author}</span></p>
                                <p className="text-gray-400 text-xs line-clamp-2 max-w-md my-2 italic">
                                    {item.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."}
                                </p>
                                
                               
                                <div className="flex items-center gap-1 text-green-600 bg-green-50 w-fit px-2 py-1 rounded text-xs font-medium">
                                    <Truck size={12} /> Free Shipping
                                </div>
                                <p className="text-gray-300 text-[10px] mt-2">ASIN: {item.asinCode || "N/A"}</p>
                            </div>
                        </div>

                        
                        <div className="col-span-2 flex justify-center">
                            <div className="flex items-center gap-3">
                                <button onClick={() => updateQuantity(item.bookId, 'dec')} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-purple-600 hover:text-purple-600 transition">
                                    <Minus size={14}/>
                                </button>
                                <span className="text-gray-800 font-bold w-4 text-center">{item.qty}</span>
                                <button onClick={() => updateQuantity(item.bookId, 'inc')} className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-purple-600 hover:text-purple-600 transition">
                                    <Plus size={14}/>
                                </button>
                            </div>
                        </div>

                     
                        <div className="col-span-2 text-center text-lg font-bold text-gray-800">
                            ${Number(item.final_price).toFixed(2)}
                        </div>

                   
                        <div className="col-span-2 flex items-center justify-center gap-6">
                            <span className="text-lg font-bold text-gray-800">
                                ${(Number(item.final_price) * item.qty).toFixed(2)}
                            </span>
                            <button onClick={() => removeFromCart(item.bookId)} className="text-gray-400 hover:text-red-500 transition">
                                <Trash2 size={18} />
                            </button>
                        </div>

                    </div>
                ))
            )}
        </div>

      
        {cartItems.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
                
                
                <div>
                   <h2 className="text-xl font-bold text-gray-800 mb-6">Payment Summary</h2>
                   <p className="text-gray-500 text-sm mb-4">Give code?</p>
                   <div className="flex gap-4 max-w-md">
                        <input type="text" className="flex-1 bg-gray-50 border text-black border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-purple-500" />
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-bold transition">Apply</button>
                   </div>
                </div>

             
                <div className="bg-gray-50/50 p-6 rounded-xl">
                    <div className="space-y-4 text-sm text-gray-600 font-medium">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span className="text-gray-900 font-bold">${subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span className="text-green-600">Free Delivery</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax:</span>
                            <span className="text-gray-900 font-bold">${tax.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-200">
                        <span className="text-lg font-bold text-gray-800">Total:</span>
                        <span className="text-2xl font-bold text-[#d63384]">${grandTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex flex-col gap-3 mt-8">
                        <button onClick={() => navigate("/Check")} className="w-full bg-[#d63384] hover:bg-pink-700 text-white py-4 rounded-lg font-bold uppercase tracking-wide shadow-lg shadow-pink-200 transition">
                            Check out
                        </button>
                        <button className="w-full bg-transparent border border-gray-300 text-gray-500 hover:text-gray-800 hover:border-gray-400 py-4 rounded-lg font-bold uppercase tracking-wide transition">
                            Keep Shopping
                        </button>
                    </div>
                </div>

            </div>
        )}

      </div>
      <Footer />
    </div>
  );
}