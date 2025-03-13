import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { checkVideoExists } from '@/lib/videoUtils';

interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImageSrc?: string;
  className?: string;
  offset?: number;
  showMuteControl?: boolean;
  initialMuted?: boolean;
  priority?: boolean;
  children?: React.ReactNode;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  fallbackImageSrc,
  className,
  offset = 0,
  // showMuteControl = true,
  initialMuted = true,
  priority = false,
  children,
}) => {
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [videoError, setVideoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if the video file exists
  useEffect(() => {
    const verifyVideo = async () => {
      try {
        const exists = await checkVideoExists(videoSrc);
        if (!exists) {
          console.error(`Video file not found: ${videoSrc}`);
          setVideoError(true);
        }
      } catch (error) {
        console.error('Error checking video:', error);
      }
    };

    verifyVideo();
  }, [videoSrc]);

  // Attempt to play the video when it's loaded
  useEffect(() => {
    if (!videoRef.current || videoError) return;

    const playVideo = async () => {
      try {
        console.log('Attempting to play video...');
        const playPromise = videoRef.current?.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Video playback started successfully');
              setIsPlaying(true);
            })
            .catch(error => {
              console.error('Error playing video:', error);
              // If autoplay is prevented, we'll need user interaction
              setShowPlayButton(true);
            });
        }
      } catch (error) {
        console.error('Error playing video:', error);
        setShowPlayButton(true);
      }
    };
    
    if (isLoaded) {
      playVideo();
    }
  }, [isLoaded, videoError]);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const handlePlayVideo = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
        setShowPlayButton(false);
      } catch (error) {
        console.error('Error playing video on user interaction:', error);
      }
    }
  };

  // Handle video load error
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error(`Failed to load video: ${videoSrc}`, e);
    setVideoError(true);
  };

  // Handle video loaded
  const handleVideoLoaded = () => {
    console.log('Video loaded successfully');
    setIsLoaded(true);
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {!videoError ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onError={handleVideoError}
            onLoadedData={handleVideoLoaded}
            poster={fallbackImageSrc}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${offset}px) scale(1.1)`,
            }}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Play button for browsers that block autoplay */}
          {showPlayButton && (
            <button
              onClick={handlePlayVideo}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 z-20"
              aria-label="Play video"
            >
              <div className="bg-primary/80 p-4 rounded-full hover:bg-primary transition-colors">
                <Play className="h-8 w-8 text-white" />
              </div>
            </button>
          )}
          
          {isLoaded && isPlaying && (
            <button 
              onClick={toggleMute}
              className="absolute bottom-6 right-6 z-30 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
          )}
        </>
      ) : fallbackImageSrc ? (
        <img
          src={fallbackImageSrc}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${offset}px) scale(1.1)`,
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <span className="text-gray-400">Video not available</span>
        </div>
      )}
      
      {/* Content Overlay */}
      {children && (
        <div className="absolute inset-0 z-20">
          {children}
        </div>
      )}
    </div>
  );
};

export default VideoBackground; 