import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
}

const generateWebPUrl = (url: string, quality: number = 75): string => {
  // If it's already a WebP image, return as is
  if (url.endsWith('.webp')) return url;
  
  // For local images in public folder
  if (url.startsWith('/')) {
    return url.replace(/\.(jpg|jpeg|png)$/, '.webp');
  }
  
  // For external images (like Unsplash), try to get WebP if available
  if (url.includes('unsplash.com')) {
    return `${url}&fm=webp&q=${quality}`;
  }
  
  return url;
};

export const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ src, alt, className, priority = false, quality = 75, ...props }, ref) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    
    // Generate WebP version URL with quality parameter
    const webpSrc = generateWebPUrl(src, quality);

    return (
      <div className={cn("relative overflow-hidden", className)}>
        {isLoading && <Skeleton className="absolute inset-0" />}
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <source srcSet={src} type={`image/${src.split('.').pop()}`} />
          <img
            ref={ref}
            src={error ? '/placeholder.svg' : src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setError(true);
              setIsLoading(false);
            }}
            className={cn(
              "transition-opacity duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
            {...props}
          />
        </picture>
      </div>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";