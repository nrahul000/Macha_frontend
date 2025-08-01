import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="bg-[#f8fbff] min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <Link to="/" className="flex items-center text-[#4dc8e7] mb-8 hover:underline">
          <ChevronLeft size={20} />
          <span>Back to Homepage</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-[#eaf0ff] p-8"
        >
          <h1 className="text-3xl font-bold mb-6 text-slate-800">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect personal information that you provide to us, including your name, contact information, delivery address, and payment details. We also collect information about your device and how you interact with our website and mobile app.
            </p>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use your information to:
            </p>
            <ul>
              <li>Process orders and deliveries</li>
              <li>Communicate with you about your orders and services</li>
              <li>Improve our services and user experience</li>
              <li>Send promotional offers and updates (with your consent)</li>
              <li>Ensure the security of our platform</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li>Delivery partners to fulfill your orders</li>
              <li>Payment processors to handle transactions</li>
              <li>Service providers who assist with our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>

            <h2>6. Cookies</h2>
            <p>
              We use cookies and similar technologies to enhance your browsing experience and collect information about how you use our platform. You can manage cookie preferences through your browser settings.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children.
            </p>

            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant changes by posting the updated policy on our website or through other communication channels.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:<br />
              Email: privacy@macha.in<br />
              Phone: +91 8008330905
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPage;
