import { useState, useEffect } from 'react';

const CombinedAnnouncementsDashboard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [text, setText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('/api/announcements');
      const data = await response.json();
      setAnnouncements(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setAnnouncements([]);
    }
  };

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    return data.fileUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    let videoUrl = '';
    let audioUrl = '';

    if (imageFile) {
      imageUrl = await handleFileUpload(imageFile);
    }
    if (videoFile) {
      videoUrl = await handleFileUpload(videoFile);
    }
    if (audioFile) {
      audioUrl = await handleFileUpload(audioFile);
    }

    const announcement = { text, image_url: imageUrl, video_url: videoUrl, audio_url: audioUrl };

    const method = currentAnnouncement ? 'PUT' : 'POST';
    const endpoint = currentAnnouncement ? `/api/announcements` : '/api/announcements';
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentAnnouncement ? { ...announcement, id: currentAnnouncement.id } : announcement),
    };

    try {
      const response = await fetch(endpoint, options);
      const result = await response.json();
      if (method === 'POST') {
        setAnnouncements([...announcements, result]);
      } else {
        setAnnouncements(announcements.map(ann => (ann.id === result.id ? result : ann)));
      }
      setCurrentAnnouncement(null);
      setText('');
      setImageFile(null);
      setVideoFile(null);
      setAudioFile(null);
    } catch (error) {
      console.error('Error submitting announcement:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/announcements?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete announcement');
      setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Announcements Management</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-red-500 mb-2">Announcement Details</h2>
          <label className="block text-sm font-medium mb-1">Text:</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full p-2 border border-gray-300 rounded" style={{ color: 'black' }} />
          <label className="block text-sm font-medium mb-1">Image:</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full p-2 border border-gray-300 rounded" style={{ color: 'black' }} />
          <label className="block text-sm font-medium mb-1">Video:</label>
          <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} className="w-full p-2 border border-gray-300 rounded" style={{ color: 'black' }} />
          <label className="block text-sm font-medium mb-1">Audio:</label>
          <input type="file" accept="audio/*" onChange={(e) => setAudioFile(e.target.files[0])} className="w-full p-2 border border-gray-300 rounded" style={{ color: 'black' }} />
        </div>
        <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Save</button>
      </form>
      <h2 className="text-2xl font-bold text-red-500 mb-4">Current Announcements</h2>
      {announcements.length === 0 ? (
        <p>No announcements available.</p>
      ) : (
        <ul className="space-y-4">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="p-4 bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <span className="font-semibold" style={{ color: 'black' }}>{announcement.text}</span>
                <div className="space-x-2">
                  <button onClick={() => setCurrentAnnouncement(announcement)} className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600">Edit</button>
                  <button onClick={() => handleDelete(announcement.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CombinedAnnouncementsDashboard;
