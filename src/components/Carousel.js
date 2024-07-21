import React, { useState } from 'react';

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full flex flex-col items-center p-6 mt-16">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-lg">
        <div className="w-full h-80 bg-gray-700 mb-4 rounded-lg overflow-hidden">
          <img src={items[currentIndex].image} alt={items[currentIndex].name} className="object-cover w-full h-full" />
        </div>
        <h3 className="text-3xl mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>{items[currentIndex].name}</h3>
      </div>
      <button className="bg-red-500 text-white px-7 py-3 mt-4 rounded hover:bg-red-600 text-xl" style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'normal' }}>
        BUY
      </button>
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between px-4">
        <button onClick={prevItem} className="text-white text-3xl">&#8592;</button>
        <button onClick={nextItem} className="text-white text-3xl">&#8594;</button>
      </div>
    </div>
  );
};

export default Carousel;
