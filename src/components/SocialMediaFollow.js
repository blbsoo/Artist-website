import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faSpotify, faSoundcloud, faYoutube, faInstagram, faTiktok, faFacebook, faPinterest, faSnapchat, faTwitter } from '@fortawesome/free-brands-svg-icons';

const SocialMediaFollow = () => {

  const neonLineStyle = {
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, rgba(0, 255, 242, 1) 0%, rgba(0, 255, 242, 0) 100%)',
    boxShadow: '0 0 20px rgba(0, 255, 242, 0.8)',
    marginBottom: '20px',
    position: 'absolute',
    top: '-90px'
  };

  return (
    <section className="text-white p-4 mt-36 relative">
      <style>
        {`
          @media (max-width: 768px) {
            .container {
              flex-direction: column;
            }
            .icon {
              margin-bottom: 10px; // space between icons vertically on small screens
            }
            .linea-image {
              top: 10%; // Higher position on smaller screens
              left: 50%; // Center the image horizontally
              transform: translate(-50%, -50%); // Adjust translation for center alignment
              width: 150px; // Larger image width on small screens
              height: 150px; // Maintain aspect ratio by setting height as well
            }

            .face-image {
              position: static; // Reset position for mobile
              margin-top: 20px; // Space after the icons
              width: 100px; // Smaller face image for mobile
            }
            .text-4xl {
              font-size: 2rem; // Smaller text for mobile
            }
          }
        `}
      </style>
      <div style={{ width: '100%', position: 'relative' }}>
        <div style={neonLineStyle}></div>
      </div>
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-light" style={{ fontFamily: 'MetalMania' }}>Follow me on</h2>
        <div className="absolute z-10 linea-image" style={{ top: '30%', left: 'calc(50% + 3cm)', transform: 'translateY(-50%)' }}>
          <img src="/linea.svg" alt="Linea" className="w-25 h-25" />
        </div>
        
        <div className="flex justify-center gap-6 mt-20">
          <a href="https://music.apple.com/gb/artist/jameelawalker/1549265971" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon icon={faApple} size="3x" />
          </a>
          <a href="https://open.spotify.com/artist/4HvRYxIoGix4LVWJaxEVRZ?si=Z5FbACqORa-VXNuAX8bHPQ" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon icon={faSpotify} size="3x" />
          </a>
          <a href="https://soundcloud.com/jameelawalkerr" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon icon={faSoundcloud} size="3x" />
          </a>
        </div>

        <div className="flex justify-center gap-6 mt-4">
          <a href="https://www.youtube.com/channel/UC6aebJdKEH2wlDQ7EQ_n_2g" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon icon={faYoutube} size="3x" />
          </a>
          <a href="https://music.amazon.com/artists/B08T6RGDM6/jameelawalker" target="_blank" rel="noopener noreferrer" className="icon">
            <img src="/amazonm.svg" alt="Amazon Music" className="w-12 h-12 filter-white" />
          </a>
          <a href="https://play.anghami.com/artist/8571468" target="_blank" rel="noopener noreferrer" className="icon">
            <img src="/anghamiIcon.svg" alt="Anghami" className="w-12 h-12" />
          </a>
        </div>

        <div className="flex justify-center gap-6 mt-4">
          <a href="https://www.instagram.com/jameelawalkerr/" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </a>
          <a href="https://www.tiktok.com/@jameelawalkerr" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon icon={faTiktok} size="3x" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon icon={faTwitter} size="3x" />
          </a>
        </div>

        <div className="flex justify-center gap-6 mt-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon icon={faFacebook} size="3x" />
          </a>
          <a href="https://www.pinterest.co.uk/stayinsane/" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon icon={faPinterest} size="3x" />
          </a>
          <a href="https://www.snapchat.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FontAwesomeIcon icon={faSnapchat} size="3x" />
          </a>
        </div>
      </div>
      <img src="/sface.png" alt="Face" className="relative inset-x-0 mx-auto bottom-30 transform translate-y-1/2 w-24 md:w-32" />

    </section>
  );

};

export default SocialMediaFollow;
