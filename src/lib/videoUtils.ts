/**
 * Utility functions for video optimization
 */

/**
 * Preload a video file
 * @param videoSrc Video source URL
 * @param type Video MIME type (default: 'video/mp4')
 */
export const preloadVideo = (videoSrc: string, type: string = 'video/mp4'): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'video';
  link.href = videoSrc;
  link.type = type;
  document.head.appendChild(link);
};

/**
 * Check if the device is likely to be mobile
 * @returns Boolean indicating if the device is likely mobile
 */
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Check if the connection is slow
 * @returns Promise resolving to a boolean indicating if the connection is slow
 */
export const isSlowConnection = async (): Promise<boolean> => {
  if ('connection' in navigator && (navigator as any).connection) {
    const connection = (navigator as any).connection;
    
    // Check if the connection type is cellular or the effective type is slow
    if (
      connection.saveData ||
      connection.effectiveType === 'slow-2g' ||
      connection.effectiveType === '2g' ||
      connection.effectiveType === '3g'
    ) {
      return true;
    }
  }
  
  // Fallback: Check download speed by downloading a small file
  try {
    const startTime = Date.now();
    const response = await fetch('/placeholder.svg', { method: 'HEAD' });
    const endTime = Date.now();
    
    if (!response.ok) return true;
    
    const duration = endTime - startTime;
    return duration > 100; // If it takes more than 100ms, consider it slow
  } catch (error) {
    console.error('Error checking connection speed:', error);
    return true; // Assume slow connection on error
  }
};

/**
 * Get the appropriate video source based on device and connection
 * @param videoSrc Original video source
 * @param fallbackImageSrc Fallback image source
 * @returns Promise resolving to the appropriate media source
 */
export const getAppropriateMediaSource = async (
  videoSrc: string,
  fallbackImageSrc?: string
): Promise<{ type: 'video' | 'image'; src: string }> => {
  // For now, always use video to troubleshoot
  return { type: 'video', src: videoSrc };
  
  // Original implementation:
  /*
  // If no fallback image is provided, always use video
  if (!fallbackImageSrc) {
    return { type: 'video', src: videoSrc };
  }
  
  // Check if device is mobile or connection is slow
  const mobile = isMobileDevice();
  const slowConnection = await isSlowConnection();
  
  // Use image on mobile devices or slow connections
  if (mobile || slowConnection) {
    return { type: 'image', src: fallbackImageSrc };
  }
  
  // Otherwise use video
  return { type: 'video', src: videoSrc };
  */
};

/**
 * Check if the browser supports video autoplay
 * @returns Promise resolving to a boolean indicating if autoplay is supported
 */
export const supportsAutoplay = async (): Promise<boolean> => {
  try {
    // Create a very small test video
    const video = document.createElement('video');
    video.muted = true;
    video.setAttribute('playsinline', '');
    
    // Use a tiny video file or data URI
    video.src = 'data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAAAAG1wNDJtcDQxaXNvbWF2YzEAAAxZbW9vdgAAAGxtdmhkAAAAANLEP5XSxD+VAAB+AAAAKgABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACGHRyYWsAAABcdGtoZAAAAAHSxD+V0sQ/lQAAAAEAAAAAAAAAKgAAAAAAAAAAAAAAAAABAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAbAAAAEgAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAAqAAAAAAABAAAAAAGRbWRpYQAAACBtZGhkAAAAANLEP5XSxD+VAAB+AAAAKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAQAAAAAGwAAABIAAAAACgaWRlbwAAABBpc29tAAAAAAABAAAASAAAAAAAAAAAAAAAAAAAAAAAAbAAAAEgAAAAAAADUGFzYwAAAANQcmVmAAAAB21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAQNzdGJsAAAAZ3N0c2QAAAAAAAAAAQAAAFdtcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAArEQAAAAAADNlc2RzAAAAAAOAgIAiAAAABICAgBRAFQAYAAAB9AAAAfQABYCAgAISEAaAgIABAgAAABhzdHRzAAAAAAAAAAEAAAABAAAAEAAAABxzdHNjAAAAAAAAAAEAAAABAAAAEAAAABN0dHNvAAAAAAAAAAEAAAAUAAAAYHVkdGEAAABYbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAtaWxzdAAAACWpdG9vAAAAHWRhdGEAAAABAAAAAExhdmY1Ni40MC4xMDE=';
    
    // Try to play the video
    try {
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        console.log('Autoplay is supported');
        return true;
      }
      
      return false;
    } catch (error) {
      console.log('Autoplay is not supported:', error);
      return false;
    }
  } catch (error) {
    console.error('Error testing autoplay support:', error);
    return false;
  }
};

/**
 * Check if a video file exists and is accessible
 * @param videoSrc Video source URL
 * @returns Promise resolving to a boolean indicating if the video exists
 */
export const checkVideoExists = async (videoSrc: string): Promise<boolean> => {
  try {
    const response = await fetch(videoSrc, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Error checking if video exists:', error);
    return false;
  }
};

/**
 * Generate a poster image for a video
 * @param videoSrc Video source URL
 * @returns Promise resolving to a data URL of the poster image
 */
export const generateVideoPoster = async (videoSrc: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.src = videoSrc;
    video.muted = true;
    video.currentTime = 1; // Seek to 1 second
    
    video.onloadeddata = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      } catch (error) {
        reject(error);
      }
    };
    
    video.onerror = () => {
      reject(new Error('Failed to load video for poster generation'));
    };
  });
}; 