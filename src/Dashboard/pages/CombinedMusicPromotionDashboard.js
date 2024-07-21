import { useState, useEffect } from 'react';

const CombinedMusicPromotionDashboard = () => {
  const [promotions, setPromotions] = useState([]);
  const [currentPromotion, setCurrentPromotion] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [listenNowLink, setListenNowLink] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [buttonColor, setButtonColor] = useState('#FF0000'); // Default red button color

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await fetch('/api/music_promotions');
      const data = await response.json();
      setPromotions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching promotions:', error);
      setPromotions([]); // Fallback to an empty array on error
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/music_promotions?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete promotion');
      setPromotions(promotions.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting promotion:', error);
    }
  };

  const handleEdit = (promotion) => {
    setCurrentPromotion(promotion);
    setTitle(promotion.title);
    setDescription(promotion.description);
    setListenNowLink(promotion.listen_now_link);
    setImageUrl(promotion.image_url);
    setButtonColor(promotion.button_color);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promotion = { title, description, listen_now_link: listenNowLink, image_url: imageUrl, button_color: buttonColor };
    const method = currentPromotion ? 'PUT' : 'POST';
    const endpoint = currentPromotion ? `/api/music_promotions` : '/api/music_promotions';
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentPromotion ? { ...promotion, id: currentPromotion.id } : promotion),
    };

    try {
      const response = await fetch(endpoint, options);
      const result = await response.json();
      if (method === 'POST') {
        setPromotions([...promotions, result]);
      } else {
        setPromotions(promotions.map(p => (p.id === result.id ? result : p)));
      }
      setCurrentPromotion(null);
      setTitle('');
      setDescription('');
      setListenNowLink('');
      setImageUrl('');
      setButtonColor('#FF0000');
    } catch (error) {
      console.error('Error submitting promotion:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-red-500">New Music Section</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-red-500 mb-2">Promotion Details</h2>
          <label className="block text-sm font-medium mb-1">Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border border-gray-300 rounded" style={{ color: 'black' }} />
          <label className="block text-sm font-medium mb-1">Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded" style={{ color: 'black' }} />
          <label className="block text-sm font-medium mb-1">Listen Now Link:</label>
          <input type="url" value={listenNowLink} onChange={(e) => setListenNowLink(e.target.value)} required className="w-full p-2 border border-gray-300 rounded" style={{ color: 'black' }} />
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-red-500 mb-2">Media</h2>
          <label className="block text-sm font-medium mb-1">Image URL:</label>
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required className="w-full p-2 border border-gray-300 rounded" style={{ color: 'black' }} />
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-red-500 mb-2">Appearance</h2>
          <label className="block text-sm font-medium mb-1">Button Color:</label>
          <input type="color" value={buttonColor} onChange={(e) => setButtonColor(e.target.value)} required className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Save</button>
      </form>
      <h2 className="text-2xl font-bold text-red-500 mb-4">History</h2>
      {promotions.length === 0 ? (
        <p>No promotions available.</p>
      ) : (
        <ul className="space-y-4">
          {promotions.map((promotion) => (
            <li key={promotion.id} className="p-4 bg-white rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <span className="font-semibold" style={{ color: 'black' }}>{promotion.title}</span>
                <div className="space-x-2">
                  <button onClick={() => handleEdit(promotion)} className="px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600">Edit</button>
                  <button onClick={() => handleDelete(promotion.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CombinedMusicPromotionDashboard;
