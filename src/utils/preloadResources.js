/**
 * Utility to properly preload resources with the correct 'as' attribute
 */

export const preloadResources = () => {
  // Function to create link elements with proper attributes
  const createLink = (rel, href, as, type = null) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (as) link.setAttribute('as', as);
    if (type) link.type = type;
    return link;
  };

  // CSS files should be linked, not preloaded
  const cssFiles = ['/src/index.css'];
  cssFiles.forEach(file => {
    const link = createLink('stylesheet', file, 'style', 'text/css');
    document.head.appendChild(link);
  });

  // Images can be preloaded
  const imageFiles = ['/src/assets/macha-logo.jpg'];
  imageFiles.forEach(file => {
    const link = createLink('preload', file, 'image');
    document.head.appendChild(link);
  });
};
