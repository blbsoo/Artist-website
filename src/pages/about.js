import Header from '../components/Header';
import SocialMediaFollow from '../components/SocialMediaFollow';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-grow container mx-auto p-4 relative flex flex-col items-center justify-center">
        <h2 className="text-4xl futuristic-font light-effect1 mt-12 mb-8">
          ABOUT ME
        </h2>
        <div className="rectangle">
          <div className="content p-4">
            <img src="/jw3.JPG" alt="Jameelawalker 1" className="top-left-photo" />
            <p>
              Jameelawalker is a Bristol-born and London-raised talent, carving a niche in the music scene with her poignant blend of emo rap, soft spoken lyricisms, and dark inspired hip-hop tracks. Her artistry began at the age of 17, where she discovered artists such as 93FEETOFSMOKE, Velvetears and Shinigami who inspired her to start producing and carving out her own distinctive sound, transforming her bedroom into a creative haven.
              “At the time I only had access to the free trial of FL studio which didn't allow you to save your projects, so I was making and finishing about 3 beats a day. Sometimes the electricity would trip and I would lose a song I spent about 3 hours on, it was a pain but I'd just keep on going.”
            </p>
            <img src="/jw2.JPG" alt="Jameelawalker 2" className="float-right higher-photo" />
            <p>
              Drawing inspiration from the raw emotional energy of artists such as XXXTENTACION, the aggressive dynamism of Scarlxrd, and the gritty intensity of Zillakami, Jameelawalker's sound is an ever-evolving tapestry that defies the confines of genre. Her music is a dichotomy of soundscapes—dark yet chill, intense yet soothing—an auditory journey that speaks to anyone who wants to listen.
            </p>
            <p>
              As an artist, Jameelawalker encapsulates the spirit of experimentation. Through the works of her last single “Sick Of Your Shit” and “Off Guard” to her more recent mellowed out works of “past few days”.
              <img src="/jw1.JPG" alt="Jameelawalker 3" className="float-left mr-4 mb-4" />
              Her tracks are a testament to her versatility, she invites listeners into her world, showcasing a style that is ever evolving and unapologetically hers.
            </p>
          </div>
        </div>
      </main>
      <SocialMediaFollow />
      <Footer />
    </div>
  );
};

export default About;


