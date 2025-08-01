import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Array of category objects with names, IDs, image URLs, and item counts
const categories = [
  { id: 1, name: 'Fruits & Vegetables', count: 125, image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=180&auto=format&fit=crop' },
  { id: 2, name: 'Dairy & Eggs', count: 88, image: 'https://images.unsplash.com/photo-1559598467-f8b76c8155d0?q=80&w=180&auto=format&fit=crop' },
  { id: 3, name: 'Bakery', count: 42, image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=180&auto=format&fit=crop' },
  { id: 4, name: 'Beverages', count: 93, image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?q=80&w=180&auto=format&fit=crop' },
  { id: 5, name: 'Snacks', count: 128, image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=180&auto=format&fit=crop' },
  { id: 6, name: 'Household', count: 74, image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?q=80&w=180&auto=format&fit=crop' },
  { id: 7, name: 'Personal Care', count: 56, image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=180&auto=format&fit=crop' },
  { id: 8, name: 'Meat & Seafood', count: 39, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=180&auto=format&fit=crop' },
];

const CategoryList = ({ title = "Shop By Category", viewAllLink = "/grocery/categories", limit = 8, horizontal = false }) => {
  // Get categories to display based on the limit
  const displayCategories = limit ? categories.slice(0, limit) : categories;
  
  return (
    <div className="w-full">
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          {viewAllLink && (
            <Link to={viewAllLink} className="text-green-600 text-sm font-medium flex items-center">
              View all <ChevronRight size={16} className="ml-1" />
            </Link>
          )}
        </div>
      )}

      {horizontal ? (
        <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-2">
          {displayCategories.map((category) => (
            <Link 
              key={category.id}
              to={`/grocery/categories/${category.id}`}
              className="flex-shrink-0 w-24 text-center"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-green-100 overflow-hidden mb-2">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xs font-medium line-clamp-2">{category.name}</h3>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {displayCategories.map((category) => (
            <Link 
              key={category.id}
              to={`/grocery/categories/${category.id}`}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="h-32 overflow-hidden relative">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-3">
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}} />
    </div>
  );
};

export default CategoryList;
