import React, { useState, useEffect, memo } from 'react';
import { cn } from '@/lib/utils';
import { getOptimizedImageUrl, generateSrcSet } from '@/lib/imageUtils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderColor?: string;
  sizes?: string;
  priority?: boolean;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
}

export const OptimizedImage = memo(({
  src,
  alt,
  width,
  height,
  className,
  placeholderColor = '#f3f4f6',
  sizes = '100vw',
  priority = false,
  format = 'webp',
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Handle image load error
  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setError(true);
    setIsLoaded(true);
  };

  // Preload image if priority is true
  useEffect(() => {
    if (priority && src) {
      const img = new Image();
      img.src = getOptimizedImageUrl(src, width, format);
    }
  }, [priority, src, width, format]);

  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      style={{ 
        backgroundColor: placeholderColor,
        paddingBottom: height && width ? `${(height / width) * 100}%` : undefined,
      }}
    >
      {!error && (
        <img
          src={getOptimizedImageUrl(src, width, format)}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          srcSet={generateSrcSet(src, undefined, format)}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
          )}
          {...props}
        />
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <span className="text-sm">Image not available</span>
        </div>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';