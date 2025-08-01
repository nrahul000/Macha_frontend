import { useEffect, useState, useRef } from 'react';

const ImageOptimizer = ({ src, alt, className, width, height, sizes = "100vw", priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    // Skip observer if image is priority
    if (priority) {
      setIsInView(true);
      return;
    }
    
    // Create IntersectionObserver for lazy loading
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsInView(true);
        observerRef.current.disconnect();
      }
    }, {
      rootMargin: '200px', // Start loading images when they're 200px from viewport
      threshold: 0.01
    });

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  // Generate srcset for responsive images
  const generateSrcSet = () => {
    if (!src) return '';
    
    const widths = [320, 480, 640, 768, 1024, 1280];
    return widths.map(w => {
      const imgSrc = src.includes('unsplash.com') 
        ? `${src.split('?')[0]}?w=${w}&auto=format&q=${w < 640 ? 70 : 75}` 
        : src; // Only modify Unsplash URLs
      return `${imgSrc} ${w}w`;
    }).join(', ');
  };

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width || '100%',
        height: height || '100%',
        backgroundColor: '#eaeaea', // Placeholder color
        aspectRatio: height ? undefined : '16/9' // Maintain aspect ratio if no height is defined
      }}
      aria-busy={!isLoaded}
    >
      {isInView && (
        <img 
          src={src} 
          alt={alt} 
          srcSet={generateSrcSet()}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchpriority={priority ? "high" : "auto"}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {(!isLoaded && isInView) && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-slate-200 dark:bg-slate-700">
          <span className="sr-only">Loading image - {alt}</span>
          <div className="w-8 h-8 border-2 border-slate-300 dark:border-slate-500 border-t-slate-400 dark:border-t-slate-300 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ImageOptimizer;
