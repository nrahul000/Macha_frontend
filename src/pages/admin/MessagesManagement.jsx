import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle, MessageSquare, Send, User } from 'lucide-react';
import axios from 'axios';

const MessagesManagement = () => {
  const [messages, setMessages] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchChatUsers();
  }, []);

  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat);
    }
  }, [activeChat]);

  const fetchChatUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`${API_BASE_URL}/admin/messages/chats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setChatUsers(response.data.chats);
      if (response.data.chats.length > 0) {
        setActiveChat(response.data.chats[0].userId);
      }
    } catch (err) {
      console.error('Error fetching chat users:', err);
      setError('Failed to load chat users');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`${API_BASE_URL}/admin/messages/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setMessages(response.data.messages);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeChat) return;
    
    try {
      const token = localStorage.getItem('token');
      
      await axios.post(`${API_BASE_URL}/admin/messages`, {
        text: newMessage,
        recipientId: activeChat
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Optimistically update UI
      const now = new Date();
      setMessages([...messages, {
        _id: now.getTime().toString(),
        text: newMessage,
        sender: 'admin',
        createdAt: now.toISOString()
      }]);
      
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message');
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const filteredChatUsers = chatUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-170px)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
        <button 
          onClick={() => fetchChatUsers()}
          className="p-2 bg-white rounded-lg border hover:bg-gray-50"
          title="Refresh"
        >
          <RefreshCw size={20} />
        </button>
      </div>
      
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Users List */}
        <div className="col-span-12 md:col-span-4 lg:col-span-3 bg-white rounded-lg shadow h-full overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {loading && chatUsers.length === 0 ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : error ? (
              <div className="p-4 text-red-500 flex items-center justify-center gap-2">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            ) : filteredChatUsers.length > 0 ? (
              filteredChatUsers.map(user => (
                <div 
                  key={user.userId}
                  onClick={() => setActiveChat(user.userId)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                    activeChat === user.userId 
                      ? 'bg-green-50 border border-green-200' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full ${
                    user.unread > 0 ? 'bg-green-500' : 'bg-gray-200'
                  } flex items-center justify-center text-white font-medium`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{user.name}</h3>
                      <span className="text-xs text-gray-500">{formatTime(user.lastMessageTime)}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{user.lastMessage}</p>
                  </div>
                  {user.unread > 0 && (
                    <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">
                      {user.unread}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No conversations found
              </div>
            )}
          </div>
        </div>
        
        {/* Chat Window */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9 bg-white rounded-lg shadow h-full flex flex-col overflow-hidden">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-medium">
                    {chatUsers.find(u => u.userId === activeChat)?.name || 'User'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Last active: {formatDate(chatUsers.find(u => u.userId === activeChat)?.lastActive || new Date())}
                  </p>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {loading && messages.length === 0 ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                  </div>
                ) : messages.length > 0 ? (
                  messages.map(msg => (
                    <div 
                      key={msg._id}
                      className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.sender === 'admin'
                            ? 'bg-green-500 text-white rounded-br-none'
                            : 'bg-white border rounded-bl-none'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 text-right ${
                          msg.sender === 'admin' ? 'text-green-100' : 'text-gray-400'
                        }`}>
                          {formatTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <MessageSquare size={48} className="mb-2 text-gray-300" />
                    <p>No messages yet</p>
                    <p className="text-sm">Send a message to start the conversation</p>
                  </div>
                )}
              </div>
              
              {/* Message Input */}
              <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                >
                  <Send size={18} />
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <MessageSquare size={64} className="mb-4 text-gray-300" />
              <p className="text-xl font-medium">No conversation selected</p>
              <p className="text-sm">Select a user from the list to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesManagement;
