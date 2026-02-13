import React from "react";
import { Search, Mic, BookOpen, Truck, CreditCard, RotateCcw, Headset } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import OurBooks from "../components/OurBooks";
import Navbar from "../components/Navbar";
import FlashSale from "../components/FlashSale";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
     <Navbar/>
    <div className=" min-h-screen font-sans bg-gray-50 flex flex-col">
      
     

   

      
      <div className="nav relative min-h-[60vh] md:h-screen w-full  flex justify-center items-center bg-[url('YOUR_HERO_IMAGE_PATH_HERE')]"> 
        
        <div className="absolute inset-0 "></div>

        <div className="relative z-10 w-full max-w-xl px-4 mt-16 md:mt-0">
          <div className="bg-white rounded-full flex items-center p-1.5 shadow-2xl transform transition-all hover:scale-[1.02]">
            <input
              type="text"
              placeholder="Search by Title, Author, ISBN..."
              className="flex-1 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-gray-700 outline-none rounded-l-full placeholder-gray-400"
            />

            <div className="px-2 md:px-3 cursor-pointer border-r border-gray-200">
              <Mic className="w-5 h-5 text-gray-400 hover:text-purple-600 transition" />
            </div>

            <button className="bg-[#d63384] hover:bg-pink-700 text-white p-2 md:p-3 rounded-full transition shadow-md ml-2">
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>

      
      <section className="py-12 px-6 md:px-12 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <FeatureItem
            icon={<Truck className="w-8 h-8 text-gray-500" />}
            title="Reliable Shipping"
            desc="Lorem ipsum dolor sit amet consectetur."
          />
          <FeatureItem
            icon={<CreditCard className="w-8 h-8 text-gray-500" />}
            title="Secure Payment"
            desc="Lorem ipsum dolor sit amet consectetur."
          />
          <FeatureItem
            icon={<RotateCcw className="w-8 h-8 text-gray-500" />}
            title="Easy Returns"
            desc="Lorem ipsum dolor sit amet consectetur."
          />
          <FeatureItem
            icon={<Headset className="w-8 h-8 text-gray-500" />}
            title="24/7 Customer Support"
            desc="Lorem ipsum dolor sit amet consectetur."
          />
        </div>
      </section>

     
      <div className="bg-purple-950 text-white text-center flex flex-col gap-8 justify-center items-center py-16 px-4">
        <div>
          <h1 className="font-bold text-3xl md:text-4xl mb-4">Best Seller</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base px-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
            ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.
          </p>
        </div>

       
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 w-full max-w-[1400px]">
         
          {["/book1.png", "/book2.jpg", "/book3.jpg", "/book4.jpg", "/book5.jpg", "/book6.jpg", "/book7.png", "/book8.png"].map((src, index) => (
             <div key={index} className="group overflow-hidden rounded-2xl">
                <img 
                  src={src} 
                  alt={`Book ${index + 1}`} 
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition duration-300 rounded-2xl shadow-lg" 
                />
             </div>
          ))}
        </div>

        <button onClick={()=> navigate("/Books")} className="bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full w-[180px] py-3 mt-4 transition shadow-lg hover:shadow-pink-500/30">
          Shop now
        </button>
      </div>

     
      <div className="bg-gray-50">
        <OurBooks />
      </div>

      <FlashSale/>

      <Footer />
    </div>
            </>
  );
};


const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center gap-3 group cursor-default p-2">
    <div className="p-4 rounded-full bg-gray-100 group-hover:bg-pink-50 transition duration-300">
      {React.cloneElement(icon, {
        className:
          "w-8 h-8 text-gray-500 group-hover:text-[#d63384] transition",
      })}
    </div>
    <h4 className="font-semibold text-gray-800 text-lg">{title}</h4>
    <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
      {desc}
    </p>
  </div>
);

export default Home;