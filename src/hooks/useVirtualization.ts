import { useState, useEffect, useCallback, useMemo } from 'react';

interface UseVirtualizationProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight?: number;
  overscan?: number;
  onItemsRendered?: (startIndex: number, endIndex: number) => void;
}

interface UseVirtualizationResult<T> {
  virtualItems: Array<{ index: number; item: T; offsetTop: number; height: number }>;
  totalHeight: number;
  startIndex: number;
  endIndex: number;
  containerProps: {
    style: {
      height: string;
      position: 'relative';
      width: '100%';
      overflow: 'auto';
    };
    onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  };
}

/**
 * Custom hook for virtualized rendering of large lists
 * @param props Configuration options
 * @returns Virtualization helpers
 */
export function useVirtualization<T>({
  items,
  itemHeight,
  containerHeight = 400,
  overscan = 3,
  onItemsRendered,
}: UseVirtualizationProps<T>): UseVirtualizationResult<T> {
  const [scrollTop, setScrollTop] = useState(0);
  
  // Calculate the range of visible items
  const { startIndex, endIndex, virtualItems, totalHeight } = useMemo(() => {
    const totalHeight = items.length * itemHeight;
    
    // Calculate visible range
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const visibleCount = Math.ceil(containerHeight / itemHeight) + 2 * overscan;
    const endIndex = Math.min(items.length - 1, startIndex + visibleCount);
    
    // Generate virtual items
    const virtualItems = [];
    for (let i = startIndex; i <= endIndex; i++) {
      virtualItems.push({
        index: i,
        item: items[i],
        offsetTop: i * itemHeight,
        height: itemHeight,
      });
    }
    
    return { startIndex, endIndex, virtualItems, totalHeight };
  }, [items, itemHeight, scrollTop, containerHeight, overscan]);
  
  // Handle scroll events
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);
  
  // Call onItemsRendered callback when visible range changes
  useEffect(() => {
    if (onItemsRendered) {
      onItemsRendered(startIndex, endIndex);
    }
  }, [startIndex, endIndex, onItemsRendered]);
  
  // Container props
  const containerProps = useMemo(() => ({
    style: {
      height: `${containerHeight}px`,
      position: 'relative' as const,
      width: '100%',
      overflow: 'auto' as const,
    },
    onScroll: handleScroll,
  }), [containerHeight, handleScroll]);
  
  return {
    virtualItems,
    totalHeight,
    startIndex,
    endIndex,
    containerProps,
  };
}

export default useVirtualization; 