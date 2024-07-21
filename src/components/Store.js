import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

const Store = () => {
  const [items, setItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/store');
      const data = await response.json();
      console.log('Fetched items:', data); // Log the fetched data to check for duplicates
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching items:', error);
      setItems([]); // Set to an empty array in case of error
    }
  };

  const nextItem = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevItem = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Ensure items is an array before using slice
  const visibleItemsDesktop = Array.isArray(items)
    ? items
        .slice(startIndex, startIndex + 3)
        .concat(items.slice(0, Math.max(0, startIndex + 3 - items.length)))
    : [];

  return (
    <section className="text-white p-6 mt-44">
      <div className="container mx-auto relative neon-border p-6">
        <div className="absolute top-0 left-0 transform -translate-y-1/2 flex items-center">
          <div className="border-t-2 border-red-500 flex-grow ml-2"></div>
          <h2 className="text-4xl md:text-5xl font-normal bg-black px-4 store-title" style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'normal' }}>
            STORE
          </h2>
          <div className="border-t-2 border-red-500 flex-grow ml-2"></div>
        </div>

        <button
          className="shop-now-button neon-border-button roboto-mono-font hidden md:block absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
          onClick={toggleModal}
        >
          SHOP OFFICIAL STORE
        </button>

        <div className="relative mt-8">
          <div className="flex flex-col md:hidden items-center mb-4">
            <button className="shop-now-button neon-border-button roboto-mono-font" onClick={toggleModal}>
              SHOP OFFICIAL STORE
            </button>
          </div>

          <div className="flex flex-col md:hidden items-center">
            {Array.isArray(items) &&
              items.map((item, index) => (
                <div key={index} className="flex flex-col items-center mb-8" style={{ width: '100%' }}>
                  <div className="bg-gray-800 p-6 rounded-lg w-full h-full flex flex-col justify-between">
                    <div className="w-full h-80 bg-gray-700 mb-4 rounded-lg overflow-hidden">
                      <img src={item.image_url} alt={item.name} className="object-cover w-full h-full" />
                    </div>
                    <h3 className="text-3xl mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.name}</h3>
                    <button className="bg-red-500 text-white px-2 py-2 mt-4 rounded hover:bg-red-600 text-xl flex items-center justify-center" style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'normal' }}>
                      Loading... <FontAwesomeIcon icon={faLock} className="ml-2" />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="hidden md:flex md:justify-between items-center">
            <button
              onClick={prevItem}
              className="bg-red-500 text-black px-3 py-2 rounded-full hover:bg-red-600"
              style={{ zIndex: 10 }}
            >
              &#8592;
            </button>
            {visibleItemsDesktop.map((item, index) => (
              <div key={index} className="flex flex-col items-center mx-2" style={{ width: '300px', minHeight: '500px' }}>
                <div className="bg-gray-800 p-6 rounded-lg w-full h-full flex flex-col justify-between">
                  <div className="w-full h-80 bg-gray-700 mb-4 rounded-lg overflow-hidden">
                    <img src={item.image_url} alt={item.name} className="object-cover w-full h-full" />
                  </div>
                  <h3 className="text-3xl mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.name}</h3>
                  <button className="bg-red-500 text-white px-2 py-2 mt-4 rounded hover:bg-red-600 text-xl flex items-center justify-center" style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'normal' }}>
                    Loading... <FontAwesomeIcon icon={faLock} className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={nextItem}
              className="bg-red-500 text-black px-3 py-2 rounded-full hover:bg-red-600"
              style={{ zIndex: 10 }}
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h2 className="text-4xl text-red-500" style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'normal' }}>
          The shop is coming soon!!!
        </h2>
      </Modal>
    </section>
  );
};

export default Store;
