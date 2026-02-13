import { BookOpen, CreditCard, Headset, Phone, RotateCcw, Truck, MapPin } from "lucide-react"; 
import React from "react";
import { MdEmail } from "react-icons/md";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom"; 
import Navbar from "../components/Navbar";

export default function About() {
  const navigate = useNavigate(); 

  return (
    <>
      <div className="nav min-h-screen font-sans  bg-gray-50">
        
        

       <Navbar/>
        

        
        <div className="relative min-h-[60vh] md:h-[600px] lg:h-[700px] w-full bg-cover bg-center flex justify-center items-center"> 
          <div className="absolute inset-0 "></div>

          <div className="relative z-10 w-full max-w-2xl px-4 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">About Bookshop</h1>
            <p className="text-sm md:text-lg leading-relaxed text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
              voluptatum modi, repellendus minima sit facilis reprehenderit
              dignissimos error iusto ipsa?
            </p>
          </div>
        </div>
      </div>

      
      <div className="bg-white text-black py-16 px-4">
        <h4 className="text-center text-3xl font-bold mb-10">Our mission</h4>
        
       
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 flex-wrap">
          
          <MissionCard title="Quality Selection" />
          <MissionCard title="Exceptional Service" />
          <MissionCard title="Set Up Stores" isSoon={true} />

        </div>
      </div>

     
      <div className="bg-purple-950 text-white py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          
         
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h3 className="font-bold text-3xl md:text-4xl mb-2">Have a Questions?</h3>
              <span className="text-2xl md:text-4xl font-bold text-pink-500">Get in Touch</span>
            </div>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
              nostrum, sunt minus vero architecto ullam eaque quaerat in.
              Cupiditate dolorum voluptatibus perspiciatis.
            </p>
            
            <form className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-pink-500 focus:outline-none transition"
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-pink-500 focus:outline-none transition"
                />
              </div>
              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full p-3 bg-transparent border border-gray-500 rounded-xl focus:border-pink-500 focus:outline-none transition resize-none"
              ></textarea>
              <button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-xl transition w-full sm:w-auto self-start px-8">
                Send Message
              </button>
            </form>
          </div>

          
          <div className="flex flex-col gap-6 justify-center lg:pl-10 lg:border-l border-purple-800">
            <ContactItem icon={<Phone className="text-pink-600 w-5 h-5"/>} text="01123456789" />
            <ContactItem icon={<MdEmail className="text-pink-600 w-5 h-5"/>} text="Example@gmail.com" />
            <ContactItem icon={<MapPin className="text-pink-600 w-5 h-5"/>} text="adipiscing elit. Mauris et ultricies est. Aliquam in justo varius" />
          </div>

        </div>
      </div>

      
      <section className="py-16 px-6 md:px-12 bg-white shadow-sm">
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

      <Footer />
    </>
  );
}


const MissionCard = ({ title, isSoon = false }) => (
  <div className="border border-gray-300 p-6 rounded-2xl w-full md:w-[350px] flex flex-col gap-3 hover:shadow-lg transition duration-300">
    <h3 className="font-bold text-xl">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde,
      adipisci temporibus dolor dolorem consequatur odit beatae quod.
    </p>
    <a href="#" className="text-pink-600 font-semibold text-sm hover:underline">
      {isSoon ? "soon" : "view more"}
    </a>
  </div>
);


const ContactItem = ({ icon, text }) => (
  <div className="flex items-center gap-4 bg-purple-900/50 p-4 rounded-xl border border-purple-800">
    <div className="bg-white p-2 rounded-full shadow-md">
      {icon}
    </div>
    <span className="font-medium text-gray-200">{text}</span>
  </div>
);


const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center gap-3 group cursor-default p-4">
    <div className="p-4 rounded-full bg-gray-50 group-hover:bg-pink-50 transition duration-300">
      {React.cloneElement(icon, {
        className: "w-8 h-8 text-gray-500 group-hover:text-[#d63384] transition",
      })}
    </div>
    <h4 className="font-semibold text-gray-800 text-lg">{title}</h4>
    <p className="text-sm text-gray-500 leading-relaxed max-w-[200px]">
      {desc}
    </p>
  </div>
);