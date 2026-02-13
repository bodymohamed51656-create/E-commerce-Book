import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getBookImage } from '../Images/img';
import { useWishlist } from '../context/WishlistContext';
import axios from 'axios';
import { 
  Star, Heart, ShoppingCart, Share2, Facebook, Twitter, Instagram, 
  Minus, Plus, CheckCircle, Truck 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FlashSale from '../components/FlashSale';

export default function SingleBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const {addToCart} = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('product'); 
  const [selectedImage, setSelectedImage] = useState('');
  const mainImage = book ? getBookImage(book) : '';
  // جلب بيانات الكتاب
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://bookstore.eraasoft.pro/api/book/show/${id}`);
      
        const responseData = response.data.data; 
        const bookData = responseData.book || responseData; 

        if (bookData) {
           setBook(bookData);
           if (bookData.bookImage && bookData.bookImage.length > 0) {
             setSelectedImage(bookData.bookImage[0].image);
           }
        } 
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);


  function handleQuantity(type) {
     if (type === 'inc' && quantity < (book.stock || 10)) setQuantity(q => q + 1);
     if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
  }

  const renderStars = (rate) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < (rate || 4) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
      />
    ));
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center text-pink-600 font-bold text-xl">Loading details...</div>;
  if (!book) return <div className="min-h-screen flex justify-center items-center text-gray-500">Book not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      
      <Navbar />


      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 pt-28">
        
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          
         
          <div className="flex flex-col gap-4">

            <div className="w-full h-[400px] md:h-[500px] bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex justify-center items-center">
              <img 
                src={selectedImage || mainImage} 
                alt={book.bookName} 
                className="max-h-full max-w-full object-contain hover:scale-105 transition duration-500"
              />
            </div>
          
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {book.bookImage?.map((img, index) => (
                <div 
                  key={index} 
                  onClick={() => setSelectedImage(img.image)}
                  className={`w-20 h-24 bg-gray-100 shrink-0 rounded-lg cursor-pointer overflow-hidden border-2 transition
                    ${selectedImage === img.image ? 'border-pink-500' : 'border-transparent hover:border-gray-300'}`}
                >
                  <img src={img.image} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.bookName}</h1>
              <div className="flex gap-3 text-gray-400">
                <Facebook className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
                <Twitter className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
                <Instagram className="w-5 h-5 hover:text-pink-600 cursor-pointer" />
              </div>
            </div>

            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              {book.description}
            </p>

            <div className="flex gap-8 text-sm text-gray-600 mb-6">
              <div><span className="text-gray-400">Author:</span> <span className="font-semibold text-gray-800">{book.author}</span></div>
              <div><span className="text-gray-400">Year:</span> <span className="font-semibold text-gray-800">{book.publicationYear}</span></div>
              <div><span className="text-gray-400">Language:</span> <span className="font-semibold text-gray-800">{book.lang}</span></div>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-1">
                {renderStars(book.rate)}
                <span className="text-sm text-gray-500 ml-2">({book.countReview || 0} Reviews)</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                <CheckCircle size={16} /> In Stock
              </div>
              <div className="flex items-center gap-2 text-purple-600 text-sm font-medium">
                <Truck size={16} /> Free Shipping
              </div>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-4xl font-bold text-pink-600">${Number(book.final_price).toFixed(2)}</span>
              {book.discount > 0 && (
                <span className="text-xl text-gray-400 line-through mb-1">${Number(book.price).toFixed(2)}</span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-full w-fit">
                <button onClick={() => handleQuantity('dec')} className="p-3 text-pink-600 transition"><Minus size={18}/></button>
                <span className="w-8 text-center font-bold text-gray-700">{quantity}</span>
                <button onClick={() => handleQuantity('inc')} className="p-3 text-pink-600 transition"><Plus size={18}/></button>
              </div>

              <button onClick={() => {
          addToCart(book, quantity); 
          alert(`Added ${quantity} items to cart!`);
       }} className="flex-1 bg-[#d63384] hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full flex justify-center items-center gap-2 transition shadow-lg shadow-pink-200">
                <ShoppingCart size={20} /> Add To Cart
              </button>

              <button onClick={(e) => {
           e.preventDefault(); 
           toggleWishlist(book);
        }}
        className={`p-2 border rounded-lg transition 
           ${isInWishlist(book.bookId) 
             ? 'bg-red-50 border-red-200 text-red-500' 
             : 'border-gray-300 text-gray-400 hover:text-red-500'
           }`}>
                <Heart size={20} className={isInWishlist(book.bookId) ? "fill-red-500" : ""} />
              </button>
            </div>
          </div>
        </div>

       
        <div className="mt-12">
          <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
            {['Product Details', 'Customer Reviews', 'Recommended For You'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                className={`pb-4 text-lg font-medium transition relative whitespace-nowrap
                  ${activeTab === tab.toLowerCase().split(' ')[0] 
                    ? 'text-gray-800 border-b-2 border-pink-600' 
                    : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            {activeTab === 'product' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                <DetailRow label="Book Title" value={book.bookName} />
                <DetailRow label="Author" value={book.author} />
                <DetailRow label="ASIN Code" value={book.asinCode || "N/A"} />
                <DetailRow label="Language" value={book.lang} />
                <DetailRow label="Publication Year" value={book.publicationYear} />
                <DetailRow label="Number Of Pages" value={book.numberOfPages} />
                <DetailRow label="Category" value={book.category_name || book.category} />
                <DetailRow label="Format" value={book.bookFormat || "Hardcover"} />
              </div>
            )}
            
            {activeTab === 'customer' && (
              <div className="text-gray-500 text-center py-10">No reviews yet. Be the first to review!</div>
            )}

            {activeTab === 'recommended' && (
               <div className="text-gray-500 text-center py-10">
                <FlashSale/>
               </div>
            )}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

const DetailRow = ({ label, value }) => (
  <div className="flex items-start border-b border-gray-100 pb-2">
    <span className="font-semibold text-gray-700 w-36 shrink-0">{label}:</span>
    <span className="text-gray-500 wrap-break-word flex-1">{value}</span>
  </div>
);