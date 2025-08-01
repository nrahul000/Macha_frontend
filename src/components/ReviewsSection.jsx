import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReviewCard from './ReviewCard';
import axios from 'axios';

const ReviewsSection = ({ serviceId = null }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        let url = `${API_BASE_URL}/reviews`;
        if (serviceId) {
          url = `${API_BASE_URL}/reviews/service/${serviceId}`;
        }
        
        const response = await axios.get(url);
        
        if (response.data.success) {
          setReviews(response.data.reviews || []);
          
          // Calculate average rating
          if (response.data.reviews.length > 0) {
            const sum = response.data.reviews.reduce((total, review) => total + review.rating, 0);
            setAverageRating(sum / response.data.reviews.length);
          }
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, [API_BASE_URL, serviceId]);
  
  // Display loading state
  if (loading) {
    return (
      <div className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
        <div className="flex justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="space-y-6 w-full">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-40 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Display error state
  if (error) {
    return (
      <div className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }
  
  // No reviews state
  if (reviews.length === 0) {
    return (
      <div className="py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
        <div className="text-center text-gray-600 p-8 bg-gray-50 rounded-lg">
          <p className="mb-4">There are no reviews yet.</p>
          <p>Be the first to share your experience!</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-2">Customer Reviews</h2>
      
      {/* Average rating */}
      <div className="flex justify-center items-center mb-8">
        <div className="flex items-center">
          <span className="text-4xl font-bold text-gray-800 mr-2">
            {averageRating.toFixed(1)}
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={star <= Math.round(averageRating) ? "currentColor" : "none"} 
                stroke="currentColor" 
                className={`w-5 h-5 ${
                  star <= Math.round(averageRating) ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            ))}
          </div>
          <span className="ml-2 text-gray-600">
            {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </span>
        </div>
      </div>
      
      {/* Reviews grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ReviewCard review={review} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
