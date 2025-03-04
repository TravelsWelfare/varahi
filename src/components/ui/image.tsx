import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  webpSrc?: string;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, webpSrc, alt, fallback = "/placeholder.svg", loading = "lazy", sizes = "100vw", ...props }, ref) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
      <div className={cn("relative overflow-hidden", className)}>
        {isLoading && <Skeleton className="absolute inset-0" />}
        <picture>
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          <img
            ref={ref}
            src={error ? fallback : src}
            alt={alt}
            loading={loading}
            decoding="async"
            fetchPriority={loading === "eager" ? "high" : "auto"}
            sizes={sizes}
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