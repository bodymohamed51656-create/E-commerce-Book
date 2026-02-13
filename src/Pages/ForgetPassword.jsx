import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); 
  const [error, setError] = useState('');    
  const [loading, setLoading] = useState(false); 
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
    
      const response = await axios.post('https://bookstore.eraasoft.pro/api/forget-password', {
        email: email
      });

   
      if (response.status === 200) {
        setMessage('OTP sent successfully! Please check your email.');
   
      }

    } catch (err) {
   
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Something went wrong, please try again.');
      } else {
        setError('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Navbar />

      <div className="grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          
          <div className="text-center">
            <h2 className="mt-2 text-3xl font-extrabold text-pink-600">
              Forgot Password?
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email to receive a reset code.
            </p>
          </div>

          {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm text-center">{error}</div>}
          {message && <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm text-center">{message}</div>}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="flex flex-col gap-2">
                <label htmlFor="email-address" className="text-sm font-medium text-gray-700 text-left">
                  Email Address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm transition duration-300"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white transition duration-300 shadow-md hover:shadow-lg
                  ${loading ? 'bg-pink-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'}`}
              >
                {loading ? 'Sending...' : 'Send Reset Code'}
              </button>
            </div>

            <div className="text-center">
              <a href="/login" className="font-medium text-sm text-gray-500 hover:text-pink-500 transition">
                Back to Login
              </a>
            </div>
          </form>

        </div>
      </div>

      <Footer />
    </div>
  );
}