import { useState } from 'react';
import VideoModal from './VideoModal';

const WatchNow = ({ title, videos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const openModal = (video) => {
    setCurrentVideo(video);
    setIsOpen(true);
  };

  const closeModal = () => {
    setCurrentVideo(null);
    setIsOpen(false);
  };

  return (
    <section className="text-white p-6 mt-36 bg-black border-2 border-red-500 rounded-lg relative watch-now-container light-border" style={{ maxWidth: '1200px', margin: '0 auto', marginTop: '160px' }}>
      <div className="absolute inset-x-0 top-0 transform -translate-y-1/2 flex items-center justify-center">
        <h2
          className="text-4xl md:text-5xl font-light bg-black px-4 watch-now-title neon-glow"
          style={{ fontFamily: 'MetalMania, sans-serif' }}
        >
          {title}
        </h2>
      </div>
      <div className="text-center mt-8">
        <div className="relative">
          <div className={`flex ${videos.length > 3 ? 'overflow-x-auto' : 'justify-center'} gap-4 pb-4`}>
            {videos.map((video, index) => (
              <div key={index} className="flex-none w-60 bg-white p-2 rounded-lg">
                <img
                  src={`https://img.youtube.com/vi/${video.video_id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full rounded-lg cursor-pointer"
                  onClick={() => openModal(video)}
                />
                <h3 className="mt-2 text-xl text-black">{video.title}</h3>
              </div>
            ))}
          </div>
          {videos.length > 3 && (
            <>
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-10"
                onClick={() => {
                  document.querySelector('.overflow-x-auto').scrollLeft -= 300;
                }}
              >
                &#10094;
              </button>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full z-10"
                onClick={() => {
                  document.querySelector('.overflow-x-auto').scrollLeft += 300;
                }}
              >
                &#10095;
              </button>
            </>
          )}
        </div>
      </div>
      {isOpen && <VideoModal video={currentVideo} closeModal={closeModal} />}
    </section>
  );
};

export default WatchNow;
