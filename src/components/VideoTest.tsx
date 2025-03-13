import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const VideoTest = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Not started');
  const [videoExists, setVideoExists] = useState<boolean | null>(null);

  // Check if the video file exists
  useEffect(() => {
    const checkVideoExists = async () => {
      try {
        const response = await fetch('/boat.mp4', { method: 'HEAD' });
        setVideoExists(response.ok);
        if (!response.ok) {
          setError(`Video file not found: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        setVideoExists(false);
        setError(`Error checking video: ${err instanceof Error ? err.message : String(err)}`);
      }
    };

    checkVideoExists();
  }, []);

  const handlePlay = async () => {
    if (!videoRef.current) return;
    
    try {
      setStatus('Attempting to play...');
      await videoRef.current.play();
      setStatus('Playing');
      setError(null);
    } catch (err) {
      setStatus('Failed to play');
      setError(`Error playing video: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Video Test</h2>
      
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p><strong>Video File Status:</strong> {videoExists === null ? 'Checking...' : videoExists ? 'Exists' : 'Not Found'}</p>
        <p><strong>Playback Status:</strong> {status}</p>
        {error && (
          <div className="mt-2 p-3 bg-red-100 text-red-800 rounded">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}
      </div>
      
      <div className="relative aspect-video bg-black mb-4 overflow-hidden rounded">
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/boat.mp4"
          muted
          playsInline
          loop
          onError={(e) => setError(`Video error: ${e.currentTarget.error?.message || 'Unknown error'}`)}
          onLoadedData={() => setStatus('Loaded')}
        />
      </div>
      
      <div className="flex gap-4">
        <Button onClick={handlePlay}>
          Play Video
        </Button>
        <Button 
          variant="outline"
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.pause();
              setStatus('Paused');
            }
          }}
        >
          Pause
        </Button>
        <Button 
          variant="secondary"
          onClick={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              setStatus('Reset');
            }
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default VideoTest; 