import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-4xl text-center mb-8" style={{ fontFamily: 'MetalMania, sans-serif' }}>
        Privacy Policy
      </h1>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl text-red-500 mb-4">Information Collection and Use</h2>
        <p className="mb-8">
          We collect your email address when you subscribe to our newsletter. The email addresses collected will be used solely for the purpose of sending updates about new music releases, merchandise, and other announcements related to Jameela Walker.
        </p>
        <h2 className="text-3xl text-red-500 mb-4">Data Usage</h2>
        <p className="mb-8">
          We use your data to provide and improve the Service. By subscribing, you agree to the collection and use of information in accordance with this policy.
        </p>
        <h2 className="text-3xl text-red-500 mb-4">Disclosure of Data</h2>
        <p className="mb-8">
          We do not share your personal data with any third parties. Your email address is kept confidential and is used only for the purposes mentioned above.
        </p>
        <h2 className="text-3xl text-red-500 mb-4">Security of Data</h2>
        <p className="mb-8">
          The security of your data is important to us. We strive to use commercially acceptable means to protect your personal data, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.
        </p>
        <h2 className="text-3xl text-red-500 mb-4">Your Data Protection Rights</h2>
        <p className="mb-8">
          You have the right to access, update, or delete the information we have on you. If you wish to be removed from our mailing list, you can do so by clicking the unsubscribe link in any of our emails or by contacting us directly.
        </p>
        <h2 className="text-3xl text-red-500 mb-4">Changes to This Privacy Policy</h2>
        <p className="mb-8">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        <h2 className="text-3xl text-red-500 mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="mt-4">
          Email: contact@jameelawalker.com
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
