import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  webpSrc?: string;
  priority?: boolean;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ 
    className, 
    src, 
    webpSrc, 
    alt, 
    fallback = "/placeholder.svg", 
    loading = "lazy", 
    sizes = "100vw",
    priority = false,
    onLoad,
    onError,
    ...props 
  }, ref) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setIsLoading(false);
      onLoad?.(e);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      setError(true);
      setIsLoading(false);
      onError?.(e);
    };

    return (
      <div className={cn("relative overflow-hidden", className)}>
        {isLoading && <Skeleton className="absolute inset-0" />}
        <picture>
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          <img
            ref={ref}
            src={error ? fallback : src}
            alt={alt}
            loading={priority ? "eager" : loading}
            decoding={priority ? "sync" : "async"}
            fetchpriority={priority ? "high" : "auto"}
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
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

Image.displayName = "Image";