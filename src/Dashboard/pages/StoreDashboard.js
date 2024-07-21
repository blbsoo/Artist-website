import React, { useState, useEffect } from 'react';

function StoreDashboard() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch('/api/store');
    const data = await response.json();
    setItems(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image file.');
      return;
    }

    // Restrict file size to 10MB
    if (image.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      let base64Image = reader.result.split(',')[1];

      const response = await fetch('/api/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, image: base64Image }),
      });

      if (response.ok) {
        alert('Store item added successfully!');
        setName('');
        setImage(null);
        fetchItems(); // Fetch updated items list
      } else {
        const errorData = await response.json();
        console.error('Error details:', errorData.details);
        alert('Failed to add store item.');
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      alert('Failed to read the file.');
    };
  };

  const handleDelete = async (id, imageKey) => {
    const response = await fetch('/api/store', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, imageKey }),
    });

    if (response.ok) {
      alert('Store item deleted successfully!');
      fetchItems(); // Fetch updated items list
    } else {
      const errorData = await response.json();
      console.error('Error details:', errorData.details);
      alert('Failed to delete store item.');
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl mb-4">Add New Store Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
        </div>
        <button type="submit" className="bg-red-500 p-2 rounded">Add Item</button>
      </form>
      <h2 className="text-2xl mt-8">Store Items History</h2>
      <div className="mt-4">
        {items.map((item) => (
          <div key={item.id} className="mb-4 p-4 bg-gray-800 rounded">
            <h3 className="text-xl">{item.name}</h3>
            <img src={item.image_url} alt={item.name} className="w-32 h-32 object-cover" />
            <p>Created at: {new Date(item.created_at).toLocaleString()}</p>
            <button onClick={() => handleDelete(item.id, item.image_url.split('/').pop())} className="bg-red-500 p-2 rounded mt-2">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoreDashboard;
