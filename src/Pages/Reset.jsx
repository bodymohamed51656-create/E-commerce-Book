import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ResetPassword() {
  return (
    <div className="bg-[#Fdfdfd] min-h-screen font-sans flex flex-col">
      <Navbar />

    
      
      <div className="relative h-[250px] w-full overflow-hidden">
        
         <div className="nav absolute inset-0 bg-black/50"></div>
         

         <div className="absolute inset-0 flex items-center justify-start px-8 md:px-20 pt-16">
            
         </div>
      </div>

      
      <div className="flex-1 flex justify-center items-start pt-16 pb-20 px-4">
        
        <div className="w-full max-w-md bg-transparent">
            
          
            <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Create new password</h2>
                <p className="text-xs text-gray-400">Your new password must be different from previous used</p>
            </div>

          
            <form className="space-y-5">
                
              
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                    <input 
                        type="password" 
                        placeholder="New password" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 text-sm transition placeholder-gray-300"
                    />
                </div>

                
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Confirm password</label>
                    <input 
                        type="password" 
                        placeholder="Confirm password" 
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 text-sm transition placeholder-gray-300"
                    />
                </div>

              
                <div className="flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        id="remember" 
                        className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="remember" className="text-xs text-gray-500 font-medium cursor-pointer">Remember me</label>
                </div>

                <button 
                    type="button"
                    className="w-full bg-[#d63384] hover:bg-pink-700 text-white py-3 rounded-lg font-bold text-sm shadow-md shadow-pink-200 transition mt-4"
                >
                    Reset password
                </button>

            </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}