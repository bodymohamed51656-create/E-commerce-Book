import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Camera } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth(); 


  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '', 
    lastName: user?.name?.split(' ')[1] || '',  
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="bg-[#Fdfdfd] min-h-screen font-sans">
      <Navbar />
      <div className="relative h-[300px] w-full overflow-hidden">
      
        
         <div className="absolute inset-0 nav from-black/60 to-transparent"></div>
      </div>

      <div className="max-w-[1000px] mx-auto py-5 px-4 pb-20 relative">
        

        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="relative">
                <img 
                    src={user?.avatar || "https://i.pravatar.cc/150?img=12"} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                />
              
                <button className="absolute bottom-1 right-1 bg-[#d63384] text-white p-2 rounded-full hover:bg-pink-700 transition shadow-md border-2 border-white">
                    <Camera size={16} />
                </button>
            </div>
            
            <h2 className="mt-4 text-2xl font-bold text-gray-800">{user?.name || "User Name"}</h2>
            <p className="text-gray-500 text-sm">{user?.email || "user@example.com"}</p>
        </div>

        <div className="mt-40 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
            
            <h3 className="text-lg font-bold text-gray-700 mb-8 border-b border-gray-100 pb-4">General Information</h3>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
           
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">First Name</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 font-medium transition"
                    />
                </div>

             
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Last Name</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 font-medium transition"
                    />
                </div>

             
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        readOnly 
                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                    />
                </div>

               
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Phone Number</label>
                    <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange}
                        placeholder="+20 1xxxxxxxxx"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 font-medium transition"
                    />
                </div>

               
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Address</label>
                    <input 
                        type="text" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange}
                        placeholder="Cairo, Egypt"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 text-gray-700 font-medium transition"
                    />
                </div>

            
                <div className="md:col-span-2 flex justify-end mt-4">
                    <button 
                        type="submit" 
                        className="bg-[#d63384] hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-bold shadow-md shadow-pink-200 transition"
                    >
                        Update Information
                    </button>
                </div>

            </form>
        </div>

      </div>
      <Footer />
    </div>
  );
}