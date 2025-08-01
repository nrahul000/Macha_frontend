import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Info, Loader, User, ArrowRight, Calendar, Package, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import chatService from '../services/chatService';
import websocketService from '../services/websocketService';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatStatus, setChatStatus] = useState('offline'); // 'online', 'offline', 'away'
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [quickQuestions, setQuickQuestions] = useState([
    "What services do you provide?",
    "How can I track my order?",
    "What are your service hours?",
    "Do you serve in my area?"
  ]);
  const messagesEndRef = useRef(null);
  const chatPollInterval = useRef(null);
  const typingTimeoutRef = useRef(null);
  // Add backendAvailable state variable
  const [backendAvailable, setBackendAvailable] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const wsUnsubscribeFunctions = useRef([]);
  const { currentUser } = useAuth();
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Check if backend is available on component mount
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        await axios.get(`${API_BASE_URL}/health`, { timeout: 3000 });
        setBackendAvailable(true);
      } catch (err) {
        console.warn("Backend chat server unreachable:", err);
        setBackendAvailable(false);
      }
    };
    
    checkBackendStatus();
  }, [API_BASE_URL]);

  // Setup WebSocket connection when chat opens or when backendAvailable changes
  useEffect(() => {
    if (isOpen && backendAvailable && currentUser) {
      // Connect to websocket
      websocketService.connect();
      
      // Setup event listeners
      const connectionListener = (data) => {
        setWsConnected(data.status === 'connected');
      };
      
      const chatMessageListener = (data) => {
        if (data.message && !data.message.isUser) {
          // Show typing indicator briefly
          setIsTyping(true);
          
          // Then after a short delay, add the message and hide the indicator
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, data.message]);
            
            // If chat is closed but we get new messages, increment unread count
            if (!isOpen) {
              setUnreadCount(prev => prev + 1);
            }
          }, 500);
        } else if (data.message) {
          setMessages(prev => [...prev, data.message]);
        }
      };
      
      const statusListener = (data) => {
        if (data.status) {
          setChatStatus(data.status);
        }
      };
      
      // Register listeners
      const unsubFns = [
        websocketService.on('connection', connectionListener),
        websocketService.on('chatMessage', chatMessageListener),
        websocketService.on('statusUpdate', statusListener)
      ];
      
      // Store unsubscribe functions
      wsUnsubscribeFunctions.current = unsubFns;
      
      // Join the chat room
      if (currentUser) {
        websocketService.joinRoom('chat');
      }
      
      // Request initial status
      websocketService.requestStatusUpdate();
      
      return () => {
        // Unsubscribe all listeners
        wsUnsubscribeFunctions.current.forEach(fn => fn());
        wsUnsubscribeFunctions.current = [];
        
        // Leave chat room when component unmounts
        if (currentUser) {
          websocketService.leaveRoom('chat');
        }
      };
    }
  }, [isOpen, backendAvailable, currentUser]);

  // Disconnect from WebSocket when component unmounts
  useEffect(() => {
    return () => {
      // Unsubscribe all listeners
      wsUnsubscribeFunctions.current.forEach(fn => fn());
      wsUnsubscribeFunctions.current = [];
      
      // Only disconnect if chat is closed
      if (!isOpen) {
        websocketService.disconnect();
      }
    };
  }, [isOpen]);

  // Check chat status when component mounts
  useEffect(() => {
    checkChatStatus();
    
    // Check status every minute
    chatPollInterval.current = setInterval(checkChatStatus, 60000);
    
    return () => {
      if (chatPollInterval.current) {
        clearInterval(chatPollInterval.current);
      }
    };
  }, []);

  // Check online status of chat support
  const checkChatStatus = async () => {
    try {
      // Use the chat service instead of direct axios call
      const statusData = await chatService.getChatStatus();
      setChatStatus(statusData.status || 'offline');
    } catch (err) {
      console.warn('Could not check chat status:', err);
      setChatStatus('offline');
    }
  };

  // Fetch chat history when chat opens
  useEffect(() => {
    if (isOpen) {
      fetchChatHistory();
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Listen for new messages via polling
  useEffect(() => {
    // If chat is closed, don't poll for messages
    if (!isOpen) return;
    
    let pollInterval;
    
    // No need to poll if we're offline - we'll simulate responses instead
    if (chatStatus === 'offline') return;
    
    // Setup polling for new messages
    const pollForMessages = () => {
      pollInterval = setInterval(async () => {
        try {
          // Only get messages newer than our latest message
          if (messages.length === 0) {
            // Don't poll if no messages yet - wait for initial fetch
            return;
          }
          
          const latestMessage = messages[messages.length - 1];
          if (!latestMessage || !latestMessage.timestamp) return;
          
          const latestTimestamp = latestMessage.timestamp;
          
          // Use the chat service instead of direct axios call
          const newMessages = await chatService.getNewMessages(latestTimestamp);
          
          if (newMessages && newMessages.length > 0) {
            setMessages(prev => [...prev, ...newMessages]);
            
            // If chat is closed but we get new messages, increment unread count
            if (!isOpen) {
              setUnreadCount(prev => prev + newMessages.length);
            }
            
            // Show typing indicator briefly after receiving a message from support
            if (newMessages.some(msg => !msg.isUser)) {
              setIsTyping(false);
            }
          }
        } catch (err) {
          // Avoid logging this repeatedly to keep console clean
          if (err.response && err.response.status !== 404) {
            console.warn('Error polling for messages:', err);
          }
        }
      }, 10000); // Poll every 10 seconds instead of 5 for less console spam
    };
    
    // Start polling after a delay
    const delayedPolling = setTimeout(() => {
      pollForMessages();
    }, 2000);
    
    return () => {
      clearTimeout(delayedPolling);
      if (pollInterval) {
        clearInterval(pollInterval);
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [isOpen, messages, chatStatus]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Fetch chat history
  const fetchChatHistory = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Use the chat service instead of direct axios call
      const chatMessages = await chatService.getChatHistory(50).catch(err => {
        console.log("Chat history not available, using default welcome message");
        return []; // Return empty array if fetch fails
      });
      
      if (chatMessages && chatMessages.length > 0) {
        setMessages(chatMessages);
      } else {
        // If no messages, show welcome message
        const welcomeMessage = {
          _id: 'welcome-msg',
          message: `Hello ${currentUser ? currentUser.name : 'there'}! Welcome to MACHA Support. How can we help you today?`,
          isUser: false,
          timestamp: new Date().toISOString()
        };
        setMessages([welcomeMessage]);
      }
    } catch (err) {
      console.error('Error fetching chat history:', err);
      setError('Failed to load chat history. Please try again later.');
      
      // Show welcome message even if there's an error
      const welcomeMessage = {
        _id: 'welcome-msg',
        message: `Hello ${currentUser ? currentUser.name : 'there'}! Welcome to MACHA Support. How can we help you today?`,
        isUser: false,
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Modified sendMessage function to handle backend data fetching and response generation
  const sendMessage = async (e) => {
    e && e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const messageData = {
      message: newMessage.trim(),
      isUser: true,
      timestamp: new Date().toISOString()
    };
    
    // Add to UI immediately for responsiveness
    setMessages(prev => [...prev, messageData]);
    setNewMessage('');
    
    try {
      // Try sending via WebSocket if available
      let messageSent = false;
      
      if (backendAvailable && wsConnected) {
        messageSent = websocketService.sendChatMessage(messageData);
      }
      
      // If WebSocket failed or not available, use fallback simulation
      if (!messageSent) {
        // Show typing indicator for a more natural conversation flow
        setTimeout(() => setIsTyping(true), 500);
        
        // Generate response using simulation
        setTimeout(() => {
          setIsTyping(false);
          
          // Add debug logging in development mode
          if (process.env.NODE_ENV === 'development') {
            console.log("Processing user message:", messageData.message);
          }
          
          // Use local simulation to generate response
          const simulated = getSimulatedResponse(messageData.message);
          
          if (process.env.NODE_ENV === 'development') {
            console.log("Generated response:", simulated);
          }
          
          // Add the response to the messages
          const simulatedResponse = {
            _id: `sim-${Date.now()}`,
            message: simulated.text,
            isUser: false,
            timestamp: new Date().toISOString(),
            action: simulated.action
          };
          
          setMessages(prev => [...prev, simulatedResponse]);
        }, 1500 + Math.random() * 1000); // Slightly shorter delay for better UX
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message. Please try again.');
    }
  };
  
  // Send a quick question
  const sendQuickQuestion = (question) => {
    setNewMessage(question);
    setTimeout(() => {
      const fakeEvent = { preventDefault: () => {} };
      sendMessage(fakeEvent);
    }, 100);
  };
  
  // Format timestamp to readable time
  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  };
  
  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Chat Button with Notification Badge */}
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open live chat"
        >
          {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
        </motion.button>
        
        {!isOpen && unreadCount > 0 && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-semibold"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </div>

      {/* Chat Window - Fix AnimatePresence mode warning */}
      <AnimatePresence mode="popLayout">
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 left-0 w-80 sm:w-[400px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200"
            style={{ height: '550px', maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Chat Header - reduced padding */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold flex items-center gap-1.5 text-sm">
                  <MessageCircle size={18} />
                  MACHA Support
                </h3>
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-1.5 ${
                    chatStatus === 'online' ? 'bg-green-300' :
                    chatStatus === 'away' ? 'bg-yellow-300' :
                    'bg-red-300'
                  }`}></span>
                  <span className="text-xs text-green-100">
                    {wsConnected ? 
                      (chatStatus === 'online' ? 'Online' : 
                      chatStatus === 'away' ? 'Away' : 
                      'Offline') : 
                      'Connecting...'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-green-100 mt-0.5">
                {chatStatus === 'online' 
                  ? 'We typically reply in a few minutes'
                  : chatStatus === 'away'
                    ? 'We\'ll be back shortly'
                    : 'Leave a message and we\'ll reply soon'
                }
              </p>
            </div>

            {/* Chat Messages Section - increased space for messages */}
            <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="flex flex-col items-center">
                    <Loader size={30} className="text-green-500 animate-spin mb-2" />
                    <p className="text-sm text-gray-500">Loading messages...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm flex items-start gap-2">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>
                    {error} <button className="underline" onClick={fetchChatHistory}>Try again</button>
                  </span>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8 flex flex-col items-center">
                  <MessageCircle size={40} className="text-gray-300 mb-3" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                <>
                  {messages.map((msg, index) => {
                    // Check if need to show date separator
                    const showDateSeparator = index === 0 || (
                      new Date(msg.timestamp).toDateString() !== 
                      new Date(messages[index - 1].timestamp).toDateString()
                    );
                    
                    return (
                      <React.Fragment key={msg._id || `msg-${index}`}>
                        {showDateSeparator && (
                          <div className="flex justify-center my-3">
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                              {new Date(msg.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        
                        <div className={`mb-3 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>   
                          <div 
                            className={`relative px-4 py-2 rounded-lg max-w-[85%] ${
                              msg.isUser
                                ? 'bg-green-600 text-white rounded-br-none'
                                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                            }`}
                          >
                            {!msg.isUser && (
                              <div className="absolute -left-1 -top-1 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center border border-green-200">
                                <User size={12} className="text-green-700" />
                              </div>
                            )}
                            
                            {/* Message content rendering - enhanced to handle links */}
                            {renderMessageContent(msg)}
                            
                            <div className={`text-[10px] mt-1 text-right ${
                              msg.isUser ? 'text-green-100' : 'text-gray-500'
                            }`}>
                              {formatTime(msg.timestamp)}
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start mb-3">
                      <div className="bg-gray-100 py-2 px-4 rounded-lg rounded-bl-none">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></span>
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-150"></span>
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-300"></span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Quick Questions Section - more compact */}
            <div className="border-t border-gray-200 bg-gray-50 p-2">
              <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <Info size={12} />
                <span>Quick Questions</span>
              </p>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => sendQuickQuestion(question)}
                    className="text-xs px-2 py-0.5 bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 rounded-full text-gray-700 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input Section - more compact */}
            <form onSubmit={sendMessage} className="border-t border-gray-200 p-2 bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 rounded-full px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent text-gray-900 text-sm"
                />
                <button
                  type="submit"
                  className="ml-1.5 bg-gradient-to-r from-green-600 to-green-700 text-white w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-50 hover:from-green-700 hover:to-green-800 transition-all"
                  disabled={!newMessage.trim()}
                >
                  <Send size={16} />
                </button>
              </div>
              
              {!currentUser && (
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1 justify-center">
                  <Link to="/login" className="text-green-700 underline">Log in</Link>
                  <span>for the best support experience</span>
                </p>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Simple response simulation based on message content
const getSimulatedResponse = (message) => {
  const lowerMsg = message.toLowerCase();
  
  // Helper function to create responses with action links
  const createResponse = (text, actionLink = null, actionText = null) => {
    return {
      text,
      action: actionLink ? { link: actionLink, text: actionText || 'Learn more' } : null
    };
  };
  
  // More specific pattern matching for common questions
  
  // Service hours - enhanced pattern matching
  if (lowerMsg.includes('hour') || 
      lowerMsg.includes('time') || 
      (lowerMsg.includes('when') && lowerMsg.includes('open')) ||
      (lowerMsg.includes('what') && lowerMsg.includes('hour')) ||
      lowerMsg.match(/when.*close/i) ||
      lowerMsg.match(/opening.*time/i)) {
    return createResponse(
      "Our service hours are from 9:00 AM to 8:00 PM, 7 days a week. Emergency services are available 24/7. You can book a service at any time through our app, and we'll schedule it during our operating hours.",
      "/service-hours",
      "View our service hours"
    );
  }
  
  // Services information - should only trigger when specifically asking about services
  if ((lowerMsg.includes('service') || lowerMsg.includes('services')) && 
      (lowerMsg.includes('what') || lowerMsg.includes('offer') || lowerMsg.includes('provide') || 
       lowerMsg.includes('available') || lowerMsg.includes('kind') || lowerMsg.includes('type'))) {
    return createResponse(
      "We provide multiple services including: AC Repair & Service, Plumbing Services, Electrical Work, Food Delivery, Grocery Delivery, Technician Service, Software Solutions, Medical Sample Collection, and Package Delivery. You can book any of these services through our application.",
      "/services", 
      "Browse our services"
    );
  }
  
  // Application and Service-specific responses
  if ((lowerMsg.includes('what') || lowerMsg.includes('tell')) && 
      (lowerMsg.includes('macha') || lowerMsg.includes('app'))) {
    if (lowerMsg.includes('do') || lowerMsg.includes('service') || lowerMsg.includes('provide')) {
      return createResponse(
        "MACHA is a comprehensive service application that connects users in Choutuppal and surrounding areas with essential services including AC repair & service, plumbing, electrical work, food delivery, grocery delivery, technician services, software solutions, medical sample collection, and package delivery.",
        "/services",
        "View all services"
      );
    }
    return createResponse(
      "MACHA is a service application that helps you find local services in Choutuppal and surrounding areas. We connect you with professionals for various needs including home services, deliveries, and technical support.",
      "/about",
      "Learn more about us"
    );
  }
  
  // Service area coverage - make this more specific to avoid collision with other patterns
  if (lowerMsg.includes('area') || lowerMsg.includes('location') || 
      lowerMsg.includes('where') || lowerMsg.includes('cover') || 
      lowerMsg.includes('serve') || 
      (lowerMsg.includes('which') && lowerMsg.includes('area'))) {
    return createResponse(
      "We serve Choutuppal and surrounding areas within a 15km radius. Our main areas include Choutuppal, Pedda Konduru, Bommalaramaram, Panthangi, Mallapuram, Yadagirigutta, Ramojipalle, and Pochampally. You can check the service area page on our website for the detailed coverage map.",
      "/#service-area",
      "View service area map"
    );
  }
  
  // Tracking orders/bookings
  if (lowerMsg.includes('track') || lowerMsg.includes('order') || lowerMsg.includes('booking') || lowerMsg.includes('status')) {
    return createResponse(
      "You can track your booking by logging into your account and visiting the dashboard, or by entering your tracking ID on our tracking page. Each booking receives a unique tracking ID via email that you can use to check real-time status updates.",
      "/bookings",
      "Go to my bookings"
    );
  }
  
  // Pricing information
  if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('fee') || 
      lowerMsg.includes('charge') || lowerMsg.includes('how much')) {
    return createResponse(
      "Our pricing varies based on the specific service and your location. You can get an exact quote by selecting your service and location during the booking process. We provide transparent pricing with no hidden fees. For standard services in Choutuppal proper, we offer competitive fixed rates.",
      "/services#pricing",
      "Check pricing details"
    );
  }
  
  // Cancellation and rescheduling
  if (lowerMsg.includes('cancel') || lowerMsg.includes('reschedule') || lowerMsg.includes('change booking')) {
    return createResponse(
      "You can cancel or reschedule your booking up to 2 hours before the appointment time without any charges. Please visit your dashboard or call our customer service for assistance. Any cancellation within 2 hours of the scheduled time may incur a small fee.",
      "/bookings", 
      "Manage your bookings"
    );
  }
  
  // Payment methods
  if (lowerMsg.includes('payment') || lowerMsg.includes('pay') || lowerMsg.includes('cash') || 
      lowerMsg.includes('online') || lowerMsg.includes('upi')) {
    return createResponse(
      "We accept multiple payment methods including cash on delivery, UPI (like Google Pay, PhonePe, Paytm), credit/debit cards, and net banking. You can choose your preferred payment method during checkout or at the time of service delivery.",
      "/faq#payment",
      "Payment options"
    );
  }
  
  // Account related
  if (lowerMsg.includes('account') || lowerMsg.includes('login') || lowerMsg.includes('register') || 
      lowerMsg.includes('sign up') || lowerMsg.includes('forgot password')) {
    if (lowerMsg.includes('forgot') || lowerMsg.includes('reset') || lowerMsg.includes('password')) {
      return createResponse(
        "You can reset your password by clicking on the 'Forgot Password' link on the login page. We'll send you an email with instructions to create a new password.",
        "/forgot-password",
        "Reset your password"
      );
    }
    return createResponse(
      "You can create an account by clicking on the Sign Up button on our homepage. For existing users, click Login and enter your credentials. Having an account allows you to track your bookings, save addresses, and get personalized service recommendations.",
      "/login",
      "Login / Register"
    );
  }
  
  // Technical support
  if ((lowerMsg.includes('app') || lowerMsg.includes('website') || lowerMsg.includes('site')) && 
      (lowerMsg.includes('not working') || lowerMsg.includes('trouble') || lowerMsg.includes('issue') || 
       lowerMsg.includes('problem') || lowerMsg.includes('bug') || lowerMsg.includes('error'))) {
    return createResponse(
      "I'm sorry to hear you're experiencing issues. Please try refreshing the page or restarting the app. If the problem persists, you can contact our technical support at support@macha.com or call us at +91 8008330905. Please provide details about the issue you're facing for faster resolution.",
      "/contact#support",
      "Contact technical support"
    );
  }
  
  // Booking process
  if (lowerMsg.includes('book') || lowerMsg.includes('how to book') || lowerMsg.includes('make appointment') || 
      lowerMsg.includes('schedule') || lowerMsg.includes('request service')) {
    return createResponse(
      "To book a service, follow these steps: 1) Select the service you need from our homepage or services menu, 2) Choose your location and preferred date/time, 3) Provide necessary details about your requirement, 4) Review and confirm your booking. You'll receive an email confirmation with your booking details and tracking ID.",
      "/book",
      "Book a service now"
    );
  }
  
  // Quality guarantees
  if (lowerMsg.includes('quality') || lowerMsg.includes('guarantee') || lowerMsg.includes('warranty') || 
      lowerMsg.includes('satisfaction') || lowerMsg.includes('refund')) {
    return createResponse(
      "We guarantee high-quality service delivery. If you're not satisfied with the service provided, please notify us within 24 hours and we'll resolve the issue at no extra cost. For certain services like AC repair and plumbing, we offer a 30-day service warranty.",
      "/faq#guarantee",
      "Our service guarantee"
    );
  }
  
  // About the team
  if (lowerMsg.includes('team') || lowerMsg.includes('staff') || lowerMsg.includes('employees') || 
      lowerMsg.includes('technicians') || lowerMsg.includes('professional')) {
    return createResponse(
      "Our team consists of verified, skilled professionals with expertise in their respective fields. All our service providers undergo background checks and are trained to provide excellent customer service. Our technicians have at least 3-5 years of experience in their specialized areas.",
      "/about#team",
      "Meet our team"
    );
  }
  
  // Contact information
  if (lowerMsg.includes('contact') || lowerMsg.includes('phone') || lowerMsg.includes('email') || 
      lowerMsg.includes('call') || lowerMsg.includes('reach') || lowerMsg.includes('talk to human')) {
    return createResponse(
      "You can contact our customer support team at +91 8008330905 or email us at support@macha.com. Our office is located in Choutuppal, and our support team is available from 8:00 AM to 9:00 PM every day.",
      "/contact",
      "Contact us"
    );
  }
  
  // Discounts and offers
  if (lowerMsg.includes('discount') || lowerMsg.includes('offer') || lowerMsg.includes('promo') || 
      lowerMsg.includes('coupon') || lowerMsg.includes('deal')) {
    return createResponse(
      "We regularly offer discounts and promotional offers. First-time users get a 10% discount on their initial booking. You can check our current promotions on the app homepage or subscribe to our newsletter to receive updates about special deals. You can also use promo code 'WELCOME10' for a 10% discount on your first order.",
      "/offers",
      "View current offers"
    );
  }
  
  // Emergency services
  if (lowerMsg.includes('emergency') || lowerMsg.includes('urgent') || lowerMsg.includes('immediate')) {
    return createResponse(
      "For emergency services, call our emergency helpline at +91 8008330909. We provide 24/7 emergency support for critical services like electrical issues, plumbing emergencies, and medical sample collection. Emergency services may have an additional charge depending on the time and urgency.",
      "/services#emergency",
      "Emergency services info"
    );
  }
  
  // Feedback and complaints
  if (lowerMsg.includes('feedback') || lowerMsg.includes('complain') || lowerMsg.includes('suggestion') || 
      lowerMsg.includes('review')) {
    return createResponse(
      "We value your feedback! You can provide feedback about our services through the app after service completion. For complaints or detailed feedback, please email us at feedback@macha.com. We take all customer suggestions seriously and continuously work to improve our services.",
      "/contact#feedback",
      "Submit feedback"
    );
  }
  
  // Membership or subscription
  if (lowerMsg.includes('membership') || lowerMsg.includes('subscription') || lowerMsg.includes('premium')) {
    return createResponse(
      "We offer a MACHA Premium membership that provides benefits like priority service, free delivery, and special discounts. The membership costs ₹499 per year and gives you access to exclusive offers. You can sign up for membership from your account page.",
      "/premium",
      "Learn about Premium"
    );
  }
  
  // COVID-19 safety
  if (lowerMsg.includes('covid') || lowerMsg.includes('safety') || lowerMsg.includes('sanitize') || 
      lowerMsg.includes('mask') || lowerMsg.includes('protocol')) {
    return createResponse(
      "We take COVID-19 safety protocols very seriously. All our service providers follow strict hygiene practices, including regular sanitization, wearing masks, and maintaining social distance when possible. If you have specific safety concerns, you can mention them in your service request.",
      "/safety-protocols",
      "Our safety measures"
    );
  }

  // Specific services information
  if (lowerMsg.includes('ac') || lowerMsg.includes('air conditioning') || lowerMsg.includes('air conditioner')) {
    return createResponse(
      "Our AC services include installation, repair, maintenance, gas refilling, and complete servicing. Our trained technicians can work with all brands and models of air conditioners. Regular AC servicing can help improve efficiency and extend the life of your unit.",
      "/services/ac-repair",
      "AC repair services"
    );
  }

  if (lowerMsg.includes('plumb') || lowerMsg.includes('pipe') || lowerMsg.includes('water leak') || 
      lowerMsg.includes('bathroom') || lowerMsg.includes('tap')) {
    return createResponse(
      "Our plumbing services include fixing leaks, unclogging drains, installing new fixtures, repairing water heaters, and addressing any water supply issues. Our plumbers are equipped to handle both emergency repairs and scheduled maintenance.",
      "/services/plumbing",
      "Plumbing services"
    );
  }

  if (lowerMsg.includes('electric') || lowerMsg.includes('wiring') || lowerMsg.includes('power') || 
      lowerMsg.includes('switch') || lowerMsg.includes('outlet')) {
    return createResponse(
      "Our electrical services cover everything from minor repairs like fixing switches and outlets to major work like rewiring and electrical panel upgrades. Our licensed electricians ensure all work is done safely and up to code.",
      "/services/electrical",
      "Electrical services"
    );
  }

  if (lowerMsg.includes('food') || lowerMsg.includes('deliver') || lowerMsg.includes('restaurant') || 
      lowerMsg.includes('meal') || lowerMsg.includes('order food')) {
    return createResponse(
      "Our food delivery service brings meals from local restaurants directly to your doorstep. Simply browse restaurants, select your items, and place your order through our app. We typically deliver within 30-45 minutes depending on your location.",
      "/services/food-delivery",
      "Order food now"
    );
  }

  // Greetings
  if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey') || 
      lowerMsg.includes('greetings') || lowerMsg === 'hola' || lowerMsg.includes('namaste')) {
    return createResponse(
      `Hello there! Welcome to MACHA Support. I'm your virtual assistant. How can I help you today? You can ask me about our services, booking process, service areas, or any other questions about MACHA.`
    );
  }

  // Thank you responses
  if (lowerMsg.includes('thank') || lowerMsg.includes('thanks') || lowerMsg.includes('thx')) {
    return createResponse(
      "You're welcome! I'm glad I could help. Is there anything else you'd like to know about our services? Feel free to ask anytime you have questions."
    );
  }
  
  // Goodbye responses
  if (lowerMsg.includes('bye') || lowerMsg.includes('goodbye') || lowerMsg.includes('see you')) {
    return createResponse(
      "Thank you for chatting with MACHA Support! If you have any more questions later, feel free to message us again. Have a great day!"
    );
  }
  
  // Default response if no specific keywords are matched
  return createResponse(
    "Thank you for your message! I'm MACHA's virtual assistant. I can answer questions about our services, booking process, coverage area, pricing, and more. Please feel free to ask specific questions, and I'll do my best to assist you."
  );
};

// Enhance the message component to better handle links
const renderMessageContent = (msg) => {
  return (
    <div className="text-sm whitespace-pre-wrap">
      {msg.message}
      
      {/* Action links with improved handling */}
      {!msg.isUser && (
        <div className="mt-2">
          {/* Show action link if explicitly provided */}
          {msg.action && (
            <Link 
              to={msg.action.link} 
              className={`text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1 w-fit ${
                msg.isUser ? 'text-white bg-white/20' : 'text-blue-600 hover:bg-gray-200'
              }`}
            >
              <span>{msg.action.text}</span>
              <ArrowRight size={10} />
            </Link>
          )}
          
          {/* Dynamically determine appropriate links when no explicit action is provided */}
          {!msg.action && msg.message.toLowerCase().includes('track') && 
           msg.message.toLowerCase().includes('booking') && (
            <Link 
              to="/bookings" 
              className={`text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1 w-fit text-blue-600 hover:bg-gray-200`}
            >
              <span>Go to bookings</span>
              <ArrowRight size={10} />
            </Link>
          )}
          
          {!msg.action && msg.message.toLowerCase().includes('service') && 
           msg.message.toLowerCase().includes('hour') && (
            <Link 
              to="/service-hours" 
              className={`text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1 w-fit text-blue-600 hover:bg-gray-200`}
            >
              <span>View service hours</span>
              <ArrowRight size={10} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default LiveChat;