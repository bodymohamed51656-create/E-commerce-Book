import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ArrowRight, CheckCircle, Circle } from 'lucide-react';

export default function OrderHistory() {
  return (
    <div className="bg-[#Fdfdfd] min-h-screen font-sans">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 pt-32">
        
       
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">History all</h1>
            
            
            <div className="flex gap-4 overflow-x-auto pb-2">
                <button className="px-6 py-2 rounded-lg bg-[#d63384] text-white text-sm font-bold shadow-md shadow-pink-200">
                    All
                </button>
                <button className="px-6 py-2 rounded-lg bg-white border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition">
                    In Progress
                </button>
                <button className="px-6 py-2 rounded-lg bg-white border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition">
                    Completed
                </button>
                <button className="px-6 py-2 rounded-lg bg-white border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition">
                    Canceled
                </button>
            </div>
        </div>

        
        <div className="flex flex-col gap-6 mb-20">
            
          
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
                
          
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div className="space-y-1">
                        <p className="text-gray-400 text-xs uppercase tracking-wider">Order No.</p>
                        <p className="font-bold text-gray-800">#123456</p>
                    </div>
                    <div className="space-y-1 text-right md:text-left">
                         <p className="text-gray-400 text-xs uppercase tracking-wider">Status</p>
                         <p className="font-bold text-[#d63384]">In progress</p>
                    </div>
                    <div className="space-y-1 text-right">
                         <p className="text-gray-400 text-xs uppercase tracking-wider">Date</p>
                         <p className="font-bold text-gray-800">Jul, 31 2024</p>
                    </div>
                    <div className="space-y-1 text-right">
                         <p className="text-gray-400 text-xs uppercase tracking-wider">Address</p>
                         <p className="font-bold text-gray-800">Maadi, Cairo, Egypt.</p>
                    </div>
                </div>

                
                <div className="relative flex justify-between items-center max-w-3xl mx-auto my-8">
                 
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
                    
                  
                    <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-[#d63384] -translate-y-1/2 z-0"></div>

                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#d63384] text-white flex items-center justify-center shadow-lg shadow-pink-200">
                            <CheckCircle size={16} />
                        </div>
                        <span className="text-xs font-bold text-[#d63384]">Order placed</span>
                    </div>

   
                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#d63384] text-white flex items-center justify-center shadow-lg shadow-pink-200">
                            <CheckCircle size={16} />
                        </div>
                         <span className="text-xs font-bold text-gray-400">Shipping</span>
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center border-2 border-white">
                            <Circle size={16} />
                        </div>
                         <span className="text-xs font-bold text-gray-400">Completed</span>
                    </div>
                </div>
            </div>

         
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                        <div className="space-y-1">
                            <p className="text-gray-400 text-xs uppercase tracking-wider">Order No.</p>
                            <p className="font-bold text-gray-800">#123456</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-400 text-xs uppercase tracking-wider">Status</p>
                            <p className="font-bold text-green-600">Completed</p>
                        </div>
                         <div className="space-y-1">
                            <p className="text-gray-400 text-xs uppercase tracking-wider">Date</p>
                            <p className="font-bold text-gray-800">Jul, 31 2024</p>
                        </div>
                         <div className="space-y-1">
                            <p className="text-gray-400 text-xs uppercase tracking-wider">Address</p>
                            <p className="font-bold text-gray-800">Maadi, Cairo, Egypt.</p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-50">
                    <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#d63384] transition group">
                        View order detail <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </button>
                </div>
            </div>

             <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
                        <div className="space-y-1">
                            <p className="text-gray-400 text-xs uppercase tracking-wider">Order No.</p>
                            <p className="font-bold text-gray-800">#123456</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-gray-400 text-xs uppercase tracking-wider">Status</p>
                            <p className="font-bold text-red-500">Canceled</p>
                        </div>
                         <div className="space-y-1">
                            <p className="text-gray-400 text-xs uppercase tracking-wider">Date</p>
                            <p className="font-bold text-gray-800">Jul, 31 2024</p>
                        </div>
                         <div className="space-y-1">
                            <p className="text-gray-400 text-xs uppercase tracking-wider">Address</p>
                            <p className="font-bold text-gray-800">Maadi, Cairo, Egypt.</p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-50">
                    <button className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#d63384] transition group">
                        View order detail <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                    </button>
                </div>
            </div>

        </div>

      </div>
      <Footer />
    </div>
  );
}