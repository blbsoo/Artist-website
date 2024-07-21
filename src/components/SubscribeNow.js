import { useState } from 'react';
import { getNames } from 'country-list';

const SubscribeNow = () => {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCountryChange = (e) => setCountry(e.target.value);

  const countries = getNames();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('/api/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, country }),
      });

      if (response.ok) {
        setMessage('Successfully subscribed!');
        setEmail('');
        setCountry('');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Error: Unable to subscribe.');
    }
  };

  const sharedStyle = {
    height: '40px',
    borderRadius: '10px',
    borderBottom: '2px solid red',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0.5rem 0',
    position: 'relative',
    marginBottom: '2rem',
    marginTop: '2.5rem'
  };

  const labelStyle = {
    position: 'absolute',
    top: '-1.5rem',
    left: '0',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 'bold',
    color: 'red',
    fontSize: '0.76rem'
  };

  const selectStyle = {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    width: '100%',
    appearance: 'none',
    position: 'relative',
    fontSize: '0.9rem'
  };

  const arrowStyle = {
    content: '""',
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    borderTop: '5px solid red',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent'
  };

  const neonLineStyle = {
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, rgba(0, 255, 242, 1) 0%, rgba(0, 255, 242, 0) 100%)',
    boxShadow: '0 0 20px rgba(0, 255, 242, 0.8)',
    marginBottom: '20px',
    position: 'relative',
    top: '-90px' // Adjust the top property as needed
  };

  return (
    <div id="subscription-section" className="relative mt-36">
      <div style={{ width: '100%', position: 'relative' }}>
        <div style={neonLineStyle}></div>
      </div>
      <section className="neon-border-orange p-4 rounded-lg" style={{ maxWidth: '400px', margin: '0 auto', position: 'relative', top: '-20px' }}>
        <div className="flex flex-col justify-center items-center text-center" style={{ padding: '20px' }}>
          <h2 className="text-3xl font-normal mb-4" style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'light' }}>SIGN UP TO RECEIVE UPDATES</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <div className="flex flex-col gap-3 mb-3 w-full">
              <div className="p-2 w-full" style={sharedStyle}>
                <label style={labelStyle}>EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '100%' }}
                  required
                />
              </div>
              <div className="p-2 w-full" style={{ ...sharedStyle, paddingRight: '30px' }}>
                <label style={labelStyle}>CHOOSE COUNTRY</label>
                <select
                  value={country}
                  onChange={handleCountryChange}
                  style={selectStyle}
                  required
                >
                  <option value="" style={{ fontSize: '0.8rem' }}>Select...</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                  ))}
                </select>
                <div style={arrowStyle}></div>
              </div>
            </div>
            <p className="text-sm mb-6 px-4" style={{ fontFamily: 'Arial, sans-serif' }}>
              By providing this information, you are opting to receive emails from Jameela Walker with news, special offers, promotions and messages tailored to your interests, and you agree to the Jameela Walker privacy policy and terms of use.
            </p>
            <button
              type="submit"
              className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 text-lg"
              style={{ fontFamily: 'MetalMania, sans-serif', fontWeight: 'light' }}
            >
              Sign Up
            </button>
            {message && <p className="mt-4 text-red-500">{message}</p>}
          </form>
        </div>
      </section>
    </div>
  );
};

export default SubscribeNow;


