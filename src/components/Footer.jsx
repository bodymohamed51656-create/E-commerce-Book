import React from 'react';
import { BookOpen, Facebook, Instagram, Youtube, Twitter, Globe, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#3c316e] text-white pt-10 pb-6 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          
         
          <div className="flex flex-col md:flex-row items-center gap-8">
           
            <div className="flex items-center gap-2 text-lg font-bold">
              <BookOpen className="w-6 h-6" />
              <span>Bookshop</span>
            </div>

           
            <ul className="flex gap-6 text-sm font-medium text-gray-200">
              <li><Link to="/Home" className=" hover:text-pink-400 transition">Home</Link></li>
              <li><Link to="/Books" className="hover:text-pink-400 transition">Books</Link></li>
              <li><Link to="/About" className="hover:text-pink-400 transition">About us</Link></li>
            </ul>
          </div>

         
          <div className="flex gap-4">
            <a href="#" className="hover:text-pink-400 transition"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-pink-400 transition"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-pink-400 transition"><Youtube className="w-5 h-5" /></a>
            <a href="#" className="hover:text-pink-400 transition"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>

      
        <div className="border-t border-gray-500/40 my-6"></div>

       
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
         
          <p className="text-xs md:text-sm text-gray-300 font-light tracking-wide">
            &lt;Developed By&gt; EraaSoft &lt;All Copy Rights Reserved @2024
          </p>

          
          <div className="flex items-center gap-4">
             <Globe className="w-5 h-5 text-white" />
             <button className="flex items-center gap-2 border border-gray-400 rounded-full px-4 py-1 text-sm hover:bg-white/10 transition">
               English
               <ChevronRight className="w-4 h-4" />
             </button>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;