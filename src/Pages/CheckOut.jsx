import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { getBookImage } from '../Images/img'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Phone, Mail, User, CreditCard, Banknote, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cartItems, subTotal, tax, grandTotal } = useCart();
  const navigate = useNavigate();

 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cod' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Order Placed Successfully!");
    navigate("/"); 
  };

 
  if (cartItems.length === 0) {
    return (
        <>
        <Navbar />
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#Fdfdfd] pt-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <Link to="/books" className="px-6 py-3 bg-[#d63384] text-white rounded-lg font-bold">Go back to Shop</Link>
        </div>
        <Footer />
        </>
    );
  }

  return (
    <div className="bg-[#Fdfdfd] min-h-screen font-sans">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 pt-32">
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            

            <div className="lg:col-span-7 space-y-8">
                
             
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Shipping Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                                <input type="text" name="name" required placeholder="John Smith" className="text-black w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                                <input type="email" name="email" required placeholder="john@example.com" className="text-black w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition" />
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-gray-600">Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                                <input type="text" name="address" required placeholder="123 Street Name, Area" className="text-black w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">City</label>
                            <input type="text" name="city" required placeholder="Cairo" className="text-black w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                                <input type="tel" name="phone" required placeholder="+20 1xxxxxxxxx" className="text-black w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition" />
                            </div>
                        </div>
                        
                        <div className="space-y-2 md:col-span-2">
                             <label className="text-sm font-semibold text-gray-600">Note (Optional)</label>
                             <textarea rows="3" className="w-full px-4 py-3 bg-gray-50 border text-black border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 transition"></textarea>
                        </div>
                    </div>
                </div>

               
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">Payment Method</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        
                        <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition ${formData.paymentMethod === 'cod' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-purple-300'}`}>
                            <input type="radio" name="paymentMethod" value="cod" className="hidden" onChange={handleChange} defaultChecked />
                            <Banknote size={24} />
                            <span className="text-sm font-bold">Cash on Delivery</span>
                        </label>

                        <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition ${formData.paymentMethod === 'pos' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-purple-300'}`}>
                            <input type="radio" name="paymentMethod" value="pos" className="hidden" onChange={handleChange} />
                            <CreditCard size={24} />
                            <span className="text-sm font-bold">POS on Delivery</span>
                        </label>

                        <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center gap-3 transition ${formData.paymentMethod === 'online' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-purple-300'}`}>
                            <input type="radio" name="paymentMethod" value="online" className="hidden border-black" onChange={handleChange} />
                            <CreditCard size={24} />
                            <span className="text-sm font-bold">Online Payment</span>
                        </label>

                    </div>
                </div>

            </div>

          
            <div className="lg:col-span-5">
                <div className="bg-gray-50/50 p-8 rounded-2xl border border-gray-100 sticky top-32">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                    
                 
                    <div className="flex flex-col gap-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {cartItems.map((item) => (
                            <div key={item.bookId} className="flex gap-4 items-center bg-white p-3 rounded-xl border border-gray-100">
                                <div className="w-16 h-20 shrink-0 bg-gray-100 rounded overflow-hidden">
                                    <img src={getBookImage(item)} alt={item.bookName} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{item.bookName}</h4>
                                    <p className="text-xs text-gray-500 mb-1">{item.author}</p>
                                    <p className="text-xs text-purple-600 font-bold">x{item.qty}</p>
                                </div>
                                <div className="font-bold text-gray-800 text-sm">
                                    ${(Number(item.final_price) * item.qty).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

              
                    <div className="flex gap-2 mb-6">
                        <input type="text" placeholder="Coupon Code" className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-purple-500 text-sm" />
                        <button type="button" className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-700">Apply</button>
                    </div>

         
                    <div className="space-y-3 text-sm text-gray-600 font-medium mb-6">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-bold text-gray-900">${subTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-green-600">Free Delivery</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span className="font-bold text-gray-900">${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
                            <span className="text-lg font-bold text-gray-800">Total</span>
                            <span className="text-2xl font-bold text-[#d63384]">${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-[#d63384] hover:bg-pink-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-pink-200 transition flex justify-center items-center gap-2">
                        Confirm order
                    </button>
                </div>
            </div>

        </form>
      </div>
      <Footer />
    </div>
  );
}