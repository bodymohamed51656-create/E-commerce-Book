import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginAlert() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center animate-in fade-in zoom-in duration-300">
        
        <h2 className="text-xl font-bold text-gray-800 mb-8">
           Your should log in first!
        </h2>

        <div className="space-y-4">
           <button 
             onClick={() => navigate('/Login')}
             className="w-full py-3 bg-[#d63384] hover:bg-pink-700 text-white rounded-lg font-bold transition shadow-md shadow-pink-200"
           >
             Log in
           </button>
           <button 
             onClick={() => navigate('/Signup')}
             className="w-full py-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-bold transition"
           >
             Create account
           </button>
        </div>

      </div>
    </div>
  );
}