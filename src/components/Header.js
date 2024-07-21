import Link from 'next/link';
import { useState } from 'react';
import Modal from './Modal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className="bg-black text-white p-3 relative">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" legacyBehavior>
          <a className="text-4xl" style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'normal' }}>
            JAMEELA WALKER
          </a>
        </Link>
        <nav className="hidden md:flex">
          <ul className="flex space-x-14">
            <li>
              <Link href="/about" legacyBehavior>
                <a className="text-2xl hover:text-red-500" style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'normal' }}>
                  About
                </a>
              </Link>
            </li>
            <li>
              <button onClick={toggleModal} className="text-2xl hover:text-red-500" style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'normal' }}>
                Shop
              </button>
            </li>
            <li>
              <Link href="#subscription-section" legacyBehavior>
                <a className="text-2xl hover:text-red-500" style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'normal' }}>
                  Sign Up
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <button className="md:hidden absolute right-3 top-16 text-white hover:text-red-500" onClick={toggleMenu} style={{ fontSize: '24px' }}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <div className={`fixed inset-0 bg-black bg-opacity-75 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <button className="absolute top-4 right-4 text-white hover:text-red-500" onClick={toggleMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <nav className="flex flex-col items-center justify-center h-full">
          <ul className="flex flex-col space-y-4">
            <li>
              <Link href="/about" legacyBehavior>
                <a className="text-2xl hover:text-red-500" onClick={toggleMenu} style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'normal' }}>
                  About
                </a>
              </Link>
            </li>
            <li>
              <button onClick={toggleModal} className="text-2xl hover:text-red-500" onClick={toggleMenu} style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'normal' }}>
                Shop
              </button>
            </li>
            <li>
              <Link href="#subscription-section" legacyBehavior>
                <a className="text-2xl hover:text-red-500" onClick={toggleMenu} style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'normal' }}>
                  Sign Up
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h2 className="text-4xl text-red-500" style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'normal' }}>
          The shop is coming soon!!!
        </h2>
        <p className="text-2xl mt-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Be the first to know when we launch.
        </p>
        <Link href="#subscription-section" legacyBehavior>
          <a onClick={toggleModal} className="text-2xl text-red-500 mt-4 inline-block" style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'normal' }}>
            Subscribe Now
          </a>
        </Link>
      </Modal>
    </header>
  );
};

export default Header;
