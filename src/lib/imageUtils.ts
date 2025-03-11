/**
 * Utility functions for image optimization
 */

/**
 * Get the appropriate image size based on the viewport width
 * @param viewportWidth The current viewport width
 * @returns The appropriate image width
 */
export const getResponsiveImageSize = (viewportWidth: number): number => {
  if (viewportWidth < 640) return 640;
  if (viewportWidth < 768) return 750;
  if (viewportWidth < 1024) return 1080;
  if (viewportWidth < 1280) return 1280;
  return 1920;
};

/**
 * Generate a responsive image URL with width and format parameters
 * @param src Original image source
 * @param width Desired image width
 * @param format Image format (webp, jpeg, etc.)
 * @returns Optimized image URL
 */
export const getOptimizedImageUrl = (
  src: string,
  width?: number,
  format: 'webp' | 'jpeg' | 'png' | 'avif' = 'webp'
): string => {
  // If it's an external URL or already processed, return as is
  if (src.startsWith('http') || src.includes('?')) {
    return src;
  }

  // For local images, add width and format parameters
  // This assumes you have a server-side image processing setup
  const widthParam = width ? `?width=${width}` : '';
  const formatParam = widthParam ? `&format=${format}` : `?format=${format}`;
  
  return `${src}${widthParam}${formatParam}`;
};

/**
 * Generate a srcSet string for responsive images
 * @param src Original image source
 * @param widths Array of widths to include in the srcSet
 * @param format Image format
 * @returns srcSet string
 */
export const generateSrcSet = (
  src: string,
  widths: number[] = [640, 750, 828, 1080, 1280, 1920],
  format: 'webp' | 'jpeg' | 'png' | 'avif' = 'webp'
): string => {
  if (src.startsWith('http')) return '';
  
  return widths
    .map(w => `${getOptimizedImageUrl(src, w, format)} ${w}w`)
    .join(', ');
};

/**
 * Preload critical images
 * @param imagePaths Array of image paths to preload
 */
export const preloadCriticalImages = (imagePaths: string[]): void => {
  imagePaths.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Calculate aspect ratio padding for an image
 * @param width Image width
 * @param height Image height
 * @returns CSS padding-bottom value as a percentage string
 */
export const calculateAspectRatioPadding = (width: number, height: number): string => {
  return `${(height / width) * 100}%`;
};

/**
 * Check if an image is in the viewport
 * @param element The image element
 * @param threshold Threshold value (0-1)
 * @returns Boolean indicating if the image is in the viewport
 */
export const isInViewport = (element: HTMLElement, threshold = 0.1): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * (1 + threshold) &&
    rect.bottom >= 0 - (window.innerHeight || document.documentElement.clientHeight) * threshold
  );
}; 