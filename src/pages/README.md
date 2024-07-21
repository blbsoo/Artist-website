import Header from '../components/Header';
import Footer from '../components/Footer';

const Shop = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header />
      <main className="flex-grow container mx-auto p-4 text-center">
        <h1 className="text-5xl" style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'light' }}>
          Shop
        </h1>
        {/* Add your shop content here */}
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
