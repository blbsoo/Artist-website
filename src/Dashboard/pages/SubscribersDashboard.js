import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const SubscribersDashboard = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/subscribers');
      const data = await response.json();
      setSubscribers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      setSubscribers([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/subscribers?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete subscriber');
      setSubscribers(subscribers.filter(subscriber => subscriber.id !== id));
    } catch (error) {
      console.error('Error deleting subscriber:', error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch('/api/export-subscribers');
      if (!response.ok) throw new Error('Failed to export subscribers');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'subscribers.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error exporting subscribers:', error);
    }
  };

  const isNewSubscriber = (date) => {
    return dayjs().diff(dayjs(date), 'day') <= 7;
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Subscribers</h1>
      <button
        onClick={handleExport}
        className="mb-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Export Subscribers
      </button>
      {subscribers.length === 0 ? (
        <p>No subscribers available.</p>
      ) : (
        <ul className="space-y-4">
          {subscribers.map((subscriber) => (
            <li
              key={subscriber.id}
              className={`p-4 rounded-lg shadow-md ${
                isNewSubscriber(subscriber.created_at) ? 'bg-green-100' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-white">
                  {subscriber.email} ({subscriber.country})
                </span>
                <button
                  onClick={() => handleDelete(subscriber.id)}
                  className="px-4 py-2 bg-red-500 text-red rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubscribersDashboard;
