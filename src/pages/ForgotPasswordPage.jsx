import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Here you would add your API call to request password reset
      // For demo purposes, we'll simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-12">
      <Helmet>
        <title>Forgot Password | MACHA Services</title>
      </Helmet>

      <div className="w-full max-w-md">
        <Link to="/login" className="flex items-center gap-2 text-green-700 mb-6 group">
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span>Back to login</span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-xl rounded-2xl overflow-hidden border border-green-100"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-green-600 to-black text-white">
            <h1 className="text-2xl font-bold">Reset Your Password</h1>
            <p className="text-green-100 mt-1">
              We'll send you a link to reset your password
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}
            
            {success ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Check size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Check your email</h3>
                <p className="text-gray-600 mb-6">
                  We've sent a password reset link to <strong>{email}</strong>. 
                  Please check your inbox and follow the instructions.
                </p>
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-green-600 hover:text-green-800"
                >
                  Return to login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-600 focus:border-green-600 py-2.5 transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-green-600 to-black text-white rounded-lg font-medium hover:from-green-700 hover:to-black transition-all shadow-md disabled:opacity-70 flex items-center justify-center"
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : 'Reset Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
