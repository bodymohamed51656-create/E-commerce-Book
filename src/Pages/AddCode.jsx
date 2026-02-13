import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer"; 
import { useNavigate } from "react-router-dom";

export default function AddCode() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); 
  const navigate = useNavigate()
  const inputRefs = useRef([]);
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < otp.length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, otp.length).split("");
    
    if (pastedData.every((char) => !isNaN(char))) {
      const newOtp = [...otp];
      pastedData.forEach((char, index) => {
        if (index < otp.length) newOtp[index] = char;
      });
      setOtp(newOtp);
      const focusIndex = Math.min(pastedData.length, otp.length - 1);
      if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    alert(`Verification Code Entered: ${code}`);
    // هنا كود الـ API
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Navbar />

      <div className="grow flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
          
          <h2 className="text-2xl font-bold text-pink-600 mb-2">
            Reset your password!
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Enter the {otp.length} digits code that you received on your email
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center gap-2 mb-8">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={index === 0 ? handlePaste : null}
               
                  className="w-12 h-12 md:w-14 md:h-14 border-2 border-gray-300 rounded-xl text-center text-xl font-bold text-gray-700 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none transition-all shadow-sm"
                />
              ))}
            </div>

            <button
            onClick={()=> navigate("/Reset")}
              type="submit"
              className="w-full bg-[#d63384] hover:bg-pink-700 text-white font-bold py-3 rounded-xl transition duration-300 shadow-md hover:shadow-lg mb-6"
            >
              Reset password
            </button>

            <div className="text-sm text-gray-500">
              Didn't receive a code?{" "}
              <button type="button" className="text-pink-600 font-bold hover:underline">
                Send again
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}