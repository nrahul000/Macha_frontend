import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get all notifications
export const getNotifications = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${API_BASE_URL}/admin/notifications`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Mark notification as read
export const markAsRead = async (notificationId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `${API_BASE_URL}/admin/notifications/${notificationId}/read`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// Mark all notifications as read
export const markAllAsRead = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(
      `${API_BASE_URL}/admin/notifications/mark-all-read`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};

// Register for push notifications (browser notifications)
export const requestNotificationPermission = () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notifications');
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted');
        return true;
      }
    });
  }
  
  return false;
};

// Show browser notification
export const showBrowserNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/favicon.ico', // Replace with your favicon path
      ...options
    });
    
    // Handle notification click
    notification.onclick = function() {
      window.focus();
      if (options.url) {
        window.location.href = options.url;
      }
      this.close();
    };
    
    return notification;
  }
  
  return null;
};

// Setup WebSocket for real-time notifications - commented out until backend implementation
// export const setupNotificationSocket = (onMessage) => {
//   const token = localStorage.getItem('token');
//   const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:5000';
//   
//   const ws = new WebSocket(`${wsUrl}/notifications?token=${token}`);
//   
//   ws.onopen = () => {
//     console.log('WebSocket connection established');
//   };
//   
//   ws.onmessage = (event) => {
//     try {
//       const data = JSON.parse(event.data);
//       if (data.type === 'notification') {
//         onMessage(data);
//         
//         // Show browser notification
//         showBrowserNotification('MACHA Admin', {
//           body: data.message,
//           url: data.actionUrl
//         });
//       }
//     } catch (error) {
//       console.error('Error processing WebSocket message:', error);
//     }
//   };
//   
//   ws.onclose = () => {
//     console.log('WebSocket connection closed');
//     // Attempt to reconnect after a delay
//     setTimeout(() => setupNotificationSocket(onMessage), 3000);
//   };
//   
//   ws.onerror = (error) => {
//     console.error('WebSocket error:', error);
//   };
//   
//   return ws;
// };

export default {
  getNotifications,
  markAsRead,
  markAllAsRead,
  requestNotificationPermission,
  showBrowserNotification,
  // setupNotificationSocket
};
