import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faSpotify, faSoundcloud, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-white text-black p-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          <a href="https://music.apple.com/gb/artist/jameelawalker/1549265971" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faApple} size="2x" />
          </a>
          <a href="https://open.spotify.com/artist/4HvRYxIoGix4LVWJaxEVRZ?si=Z5FbACqORa-VXNuAX8bHPQ" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faSpotify} size="2x" />
          </a>
          <a href="https://www.youtube.com/channel/UC6aebJdKEH2wlDQ7EQ_n_2g" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
          <a href="https://music.amazon.com/artists/B08T6RGDM6/jameelawalker" target="_blank" rel="noopener noreferrer">
            <img src="/amazonm.svg" alt="Amazon Music" className="w-8 h-8" style={{ filter: 'brightness(0) invert(0)' }} />
          </a>
          <a href="https://play.anghami.com/artist/8571468" target="_blank" rel="noopener noreferrer">
            <img src="/anghamiIcon.svg" alt="Anghami" className="w-8 h-8" style={{ filter: 'brightness(0) invert(0)' }} />
          </a>
          <a href="https://soundcloud.com/jameelawalkerr" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faSoundcloud} size="2x" />
          </a>
        </div>
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} JAMEELA WALKER. All rights reserved.</p>
          <p>Developed by blbtech</p>
        </div>
        <div className="text-right flex gap-4">
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-red-500">Privacy Policy</a>
          <a href="mailto:contact@jameelawalker.com" className="text-red-500">Contact Me</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
