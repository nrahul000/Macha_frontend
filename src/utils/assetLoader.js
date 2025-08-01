/**
 * Utility to properly preload assets with the correct 'as' attribute
 */

export const preloadAssets = () => {
  // Function to create preload link with correct 'as' attribute
  const preload = (href, as) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  };

  // Preload CSS files
  const cssFiles = ['/src/index.css'];
  cssFiles.forEach(file => preload(file, 'style'));

  // Preload images
  const imageFiles = ['/src/assets/macha-logo.jpg'];
  imageFiles.forEach(file => preload(file, 'image'));
};
