import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MusicPromotion from '../components/MusicPromotion';
import WatchNow from '../components/WatchNow';
import Announcements from '../components/Announcements';
import SubscribeNow from '../components/SubscribeNow';
import Store from '../components/Store';
import SocialMediaFollow from '../components/SocialMediaFollow';

export default function Home() {
  const [newMusicData, setNewMusicData] = useState(null);
  const [watchNowVideos, setWatchNowVideos] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const musicResponse = await fetch('/api/music_promotions');
        const musicData = await musicResponse.json();
        setNewMusicData(Array.isArray(musicData) && musicData.length > 0 ? musicData[0] : null);

        const watchNowResponse = await fetch('/api/watch_now_videos');
        const watchNowData = await watchNowResponse.json();
        setWatchNowVideos(Array.isArray(watchNowData) ? watchNowData : []);

        const announcementsResponse = await fetch('/api/announcements');
        const announcementsData = await announcementsResponse.json();
        setAnnouncements(Array.isArray(announcementsData) ? announcementsData : []);

        const storeResponse = await fetch('/api/store');
        const storeData = await storeResponse.json();
        console.log('Store items:', storeData); // Log store items
        setStoreItems(Array.isArray(storeData) ? storeData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const hasNewMusic = newMusicData !== null;
  const hasWatchNow = watchNowVideos.length > 0;
  const hasAnnouncements = announcements.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        {hasNewMusic && newMusicData.listen_now_link && (
          <MusicPromotion
            title={newMusicData.title}
            description={newMusicData.description}
            listenNowLink={newMusicData.listen_now_link}
            imageUrl={newMusicData.image_url}
            buttonColor={newMusicData.button_color}
          />
        )}
        {hasWatchNow && (
          <WatchNow
            title="Watch Now"
            videos={watchNowVideos}
          />
        )}
        <Store items={storeItems} />
        {hasAnnouncements && (
          <Announcements
            title="Announcements"
            announcements={announcements}
          />
        )}
        <SubscribeNow />
        <SocialMediaFollow />
      </main>
      <Footer />
    </div>
  );
}
