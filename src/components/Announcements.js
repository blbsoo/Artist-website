import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';

const Announcements = ({ title }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcements');
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'MMMM d, yyyy');
    } catch (error) {
      console.error('Invalid date format:', dateString);
      return 'Invalid date';
    }
  };

  return (
    <section className="text-white p-6 mt-24">
      <div className="container mx-auto text-center max-w-full">
        <div className="flex items-center justify-center mb-6">
          <img src="/mic1.svg" alt="Mic Left" className="w-11 h-11 mr-4" /> {/* Adjust size as needed */}
          <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: 'MetalMania' }}>{title}</h2>
          <img src="/mic2.svg" alt="Mic Right" className="w-11 h-11 ml-4" /> {/* Adjust size as needed */}
        </div>
        <div className="bg-white text-black font-normal p-6 rounded-lg max-w-full overflow-hidden">
          {announcements.slice(0, showAll ? announcements.length : 1).map((announcement, index) => (
            <div key={index}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div className="flex-1 min-w-0">
                  <p className="text-lg md:text-xl text-red-500 mb-2 md:mb-0 md:mr-6" style={{ fontFamily: 'Roboto', textAlign: 'left', minWidth: '150px' }}>
                    {formatDate(announcement.posted_date)}
                  </p>
                  <p className="text-base md:text-xl" style={{ fontFamily: 'Roboto', textAlign: 'left', flex: 1 }}>{announcement.text}</p>
                </div>
           
              </div>
              {index < announcements.length - 1 && <hr className="border-black" />}
            </div>
          ))}
          <button
            className="mt-4 text-red-500 hover:text-red-600"
            onClick={toggleShowAll}
          >
            {showAll ? (
              <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
