import { useState, useEffect } from 'react';

const CombinedWatchNowDashboard = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/watch_now_videos');
      const data = await response.json();
      setVideos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setVideos([]); // Fallback to an empty array on error
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/watch_now_videos?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete video');
      setVideos(videos.filter(video => video.id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  const handleEdit = (video) => {
    setCurrentVideo(video);
    setTitle(video.title);
    setVideoUrl(`https://www.youtube.com/watch?v=${video.video_id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const video = { title, video_url: videoUrl };
    const method = currentVideo ? 'PUT' : 'POST';
    const endpoint = currentVideo ? `/api/watch_now_videos` : '/api/watch_now_videos';
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentVideo ? { ...video, id: currentVideo.id } : video),
    };

    try {
      const response = await fetch(endpoint, options);
      const result = await response.json();
      if (method === 'POST') {
        setVideos([...videos, result]);
      } else {
        setVideos(videos.map(video => (video.id === result.id ? result : video)));
      }
      setCurrentVideo(null);
      setTitle('');
      setVideoUrl('');
    } catch (error) {
      console.error('Error submitting video:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Watch Now Section</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-red-500 mb-2">Video Details</h2>
          <label className="block text-sm font-medium mb-1">Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border border-gray-300 rounded" style={{ color: 'black' }} />
          <label className="block text-sm font-medium mb-1">YouTube URL:</label>
          <input type="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required className="w-full p-2 border border-gray-300 rounded" style={{ color: 'black' }} />
        </div>
        <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Save</button>
      </form>
      <h2 className="text-2xl font-bold text-red-500 mb-4">History</h2>
      {videos.length === 0 ? (
        <p>No videos available.</p>
      ) : (
        <ul className="space-y-4">
          {videos.map((video) => (
            <li key={video.id} className="p-4 bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <span className="font-semibold" style={{ color: 'black' }}>{video.title}</span>
                <div className="space-x-2">
                  <button onClick={() => handleEdit(video)} className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600">Edit</button>
                  <button onClick={() => handleDelete(video.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CombinedWatchNowDashboard;
