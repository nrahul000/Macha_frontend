import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="bg-slate-50 dark:bg-[#0a1120] min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <Link to="/" className="flex items-center text-cyan-600 dark:text-cyan-400 mb-8 hover:underline">
          <ChevronLeft size={20} />
          <span>Back to Homepage</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8"
        >
          <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">Terms and Conditions</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose dark:prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to MACHA ("we," "our," or "us"). By using our website, mobile application, and services, you agree to be bound by these Terms and Conditions.
            </p>

            <h2>2. Services Offered</h2>
            <p>
              MACHA provides various delivery and service solutions in Choutuppal and surrounding areas. Our services include but are not limited to food delivery, grocery delivery, technician services, event management, and more.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              To access certain features of our services, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>

            <h2>4. Service Usage</h2>
            <p>
              Our services are provided for personal, non-commercial use only. Users must be at least 18 years old or have parental consent to use our services.
            </p>

            <h2>5. Ordering and Payment</h2>
            <p>
              When you place an order through our platform, you agree to provide accurate payment information. We accept various payment methods including cash on delivery, UPI payments, and bank transfers. Prices and delivery charges are subject to change without notice.
            </p>

            <h2>6. Cancellations and Refunds</h2>
            <p>
              Orders may be cancelled within a reasonable timeframe before delivery or service appointment. Refunds are processed according to our refund policy, which varies based on service type and cancellation reason.
            </p>

            <h2>7. Service Areas</h2>
            <p>
              We currently serve Choutuppal and select surrounding areas. Service availability and delivery times may vary based on location and operational hours.
            </p>

            <h2>8. Privacy Policy</h2>
            <p>
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              MACHA shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Continued use of our services after changes constitutes acceptance of the updated Terms.
            </p>

            <h2>11. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:<br />
              Email: info@macha.in<br />
              Phone: +91 8008330905
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsPage;
