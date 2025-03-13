import React from 'react';
import VideoTest from '@/components/VideoTest';

const VideoTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Video Playback Test</h1>
        <VideoTest />
      </div>
    </div>
  );
};

export default VideoTestPage; 