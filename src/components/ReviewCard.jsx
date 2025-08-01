import { useState } from 'react';
import { format } from 'date-fns';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Format date
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return '';
    }
  };
  
  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          fill={i <= rating ? "currentColor" : "none"}
          className={i <= rating ? "text-yellow-500" : "text-gray-300"}
        />
      );
    }
    return stars;
  };
  
  // Get review comment excerpt for collapsed view
  const getExcerpt = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-gray-800">{review.name}</h4>
          <p className="text-gray-500 text-sm">
            {formatDate(review.createdAt)}
            {review.serviceType && ` · ${review.serviceType}`}
          </p>
        </div>
        <div className="flex gap-1">{renderStars(review.rating)}</div>
      </div>
      
      <h5 className="font-medium text-gray-700 mb-2">{review.title}</h5>
      
      <div className="mb-4">
        {expanded ? (
          <p className="text-gray-600">{review.comment}</p>
        ) : (
          <p className="text-gray-600">{getExcerpt(review.comment)}</p>
        )}
        
        {review.comment.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-green-600 mt-2 text-sm font-medium hover:text-green-700"
          >
            {expanded ? (
              <>
                <ChevronUp size={16} />
                Show less
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                Show more
              </>
            )}
          </button>
        )}
      </div>
      
      {/* Images gallery (if any) */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-3">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review image ${index + 1}`}
              className="w-16 h-16 object-cover rounded-md cursor-pointer"
              onClick={() => window.open(image, '_blank')}
            />
          ))}
        </div>
      )}
      
      {/* Verification badge */}
      {review.isVerified && (
        <div className="mt-3 flex items-center">
          <span className="inline-flex items-center bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Verified Purchase
          </span>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
