
import { useEffect } from 'react';
import Link from 'next/link';

const MusicPromotion = ({ title, description, listenNowLink, imageUrl, buttonColor }) => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.promotion-header, .promotion-header-second');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {
          if (element.classList.contains('promotion-header')) {
            element.style.animation = 'slideDown 1s forwards, stayVisible 3s 1s forwards, slideUp 1s 4s forwards';
          } else {
            element.style.animation = 'slideUpFromLeft 1s forwards, stayVisible 3s 1s forwards, slideUp 1s 4s forwards';
          }
        } else {
          element.style.animation = '';
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="text-white p-6 mt-16 relative">
      <div className="container mx-auto flex flex-col md:flex-row items-center max-w-full">
        <div className="w-full md:w-1/2 relative mb-6 md:mb-0" style={{ maxWidth: '100%' }}>
          <img src={imageUrl} alt={title} className="w-full light-effect" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left md:pl-8" style={{ maxWidth: '100%' }}>
          <div className="promotion-header">
            <div className="font-dual">
              <span className="font-outline">NEW MUSIC OUT NOW</span>
              <span className="font-filled">NEW MUSIC OUT NOW</span>
            </div>
          </div>
          <div className="promotion-header-second">
            <div className="font-dual">
              <span className="font-outline-second">NEW MUSIC OUT NOW</span>
              <span className="font-filled-second">NEW MUSIC OUT NOW</span>
            </div>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-3.25xl lg:text-3.5xl font-bold mb-6 roboto-mono-font">{title}</h2>
          <div className="text-xl sm:text-3xl md:text-3.25xl lg:text-2xl font-normal mb-6 roboto-mono-font">
            {description}
          </div>
          {listenNowLink && (
            <Link href={listenNowLink} legacyBehavior>
              <a className="px-6 py-2 rounded-full roboto-mono-font mt-4" style={{ backgroundColor: buttonColor, color: 'white' }}>
                Stream / Download
              </a>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default MusicPromotion;
