import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Hide button for users who prefer reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
    }
  }, []);

  return (
    <button
      className={`fixed right-6 bottom-6 z-40 bg-green-600 hover:bg-black text-white rounded-full shadow-lg p-3 transition-colors duration-300 border-2 border-black focus:outline-none focus:ring-2 focus:ring-green-600 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Back to top"
      style={{ right: '1.5rem', bottom: '2rem' }}
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default BackToTop;