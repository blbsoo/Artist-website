import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4 sm:p-8">
      <div className="bg-white text-black p-8 rounded-lg w-full max-w-md mx-auto">
        <div className="text-right">
          <button onClick={onClose} className="text-black hover:text-red-500 text-xl">&times;</button>
        </div>
        <div className="text-center mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
