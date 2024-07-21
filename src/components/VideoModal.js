const VideoModal = ({ video, closeModal }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full max-w-6xl bg-white rounded-lg p-8">
        <button
          className="absolute top-5 right-5 bg-black text-white hover:text-red-500 p-2 rounded-full z-50"
          onClick={closeModal}
          style={{ transform: 'translate(50%, -50%)' }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="relative pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${video.video_id}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={video.title}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
