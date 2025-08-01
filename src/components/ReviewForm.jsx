import { useState } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ReviewForm = ({ serviceId = null, bookingId = null, serviceType = null, onSuccess = () => {} }) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!rating) {
      setError('Please select a rating');
      return;
    }
    
    if (!title.trim()) {
      setError('Please enter a review title');
      return;
    }
    
    if (!comment.trim()) {
      setError('Please enter your review');
      return;
    }
    
    if (!name.trim() || !email.trim()) {
      setError('Please provide your name and email');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Get auth token if available
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axios.post(
        `${API_BASE_URL}/reviews`,
        {
          name,
          email,
          rating,
          title,
          comment,
          serviceId,
          bookingId,
          serviceType,
          images
        },
        { headers }
      );
      
      if (response.data.success) {
        setSuccess(true);
        setRating(0);
        setTitle('');
        setComment('');
        onSuccess(response.data.review);
      } else {
        throw new Error(response.data.message || 'Failed to submit review');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setError(err.response?.data?.message || err.message || 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Check file size and type
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      return isValidType && isValidSize;
    });
    
    if (validFiles.length !== files.length) {
      setError('Some images were not added. Please ensure they are JPG, PNG, or WebP format and under 5MB.');
    }
    
    // Convert to base64 for preview and upload
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };
  
  // If review was successfully submitted
  if (success) {
    return (
      <div className="bg-green-50 p-6 rounded-lg text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold text-green-800 mb-2">Thank You For Your Review!</h3>
        <p className="text-green-700 mb-4">Your review has been submitted successfully.</p>
        <button 
          onClick={() => setSuccess(false)} 
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Write Another Review
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <h3 className="text-xl font-bold mb-4">Write a Review</h3>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Rating stars */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Your Rating *</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
                className={`cursor-pointer ${
                  (hoverRating || rating) >= star ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Name input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        
        {/* Email input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        
        {/* Review title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Review Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        
        {/* Review comment */}
        <div className="mb-4">
          <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">Your Review *</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you like or dislike? How was the service quality?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px]"
            required
          ></textarea>
        </div>
        
        {/* Image upload */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Add Photos (Optional)</label>
          <input
            type="file"
            accept="image/jpeg, image/png, image/webp"
            multiple
            onChange={handleImageUpload}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          <p className="text-sm text-gray-500 mt-1">Maximum 5 images (JPG, PNG, WebP, max 5MB each)</p>
          
          {/* Image previews */}
          {images.length > 0 && (
            <div className="mt-3 flex gap-2 flex-wrap">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={image} 
                    alt={`Upload preview ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-md" 
                  />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
