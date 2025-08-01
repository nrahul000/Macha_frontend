import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

// Toast position options
const positions = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
};

const Toast = ({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose,
  position = 'top-right',
  autoClose = true 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Icon mapping based on toast type
  const icons = {
    success: <CheckCircle size={18} className="text-green-500 dark:text-green-400" />,
    error: <AlertCircle size={18} className="text-red-500 dark:text-red-400" />,
    info: <Info size={18} className="text-blue-500 dark:text-blue-400" />
  };

  // Auto close the toast after duration
  useEffect(() => {
    if (!autoClose) return;
    
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose && onClose();
      }, 300); // Wait for animation to finish
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose, autoClose]);

  // Handle close click
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose && onClose();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: position.includes('top') ? -20 : 20, x: position.includes('center') ? '-50%' : 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: position.includes('top') ? -20 : 20 }}
          transition={{ duration: 0.3 }}
          className={`toast toast-${type} ${positions[position]}`}
          role="alert"
        >
          {icons[type]}
          <span className="flex-1">{message}</span>
          <button 
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
