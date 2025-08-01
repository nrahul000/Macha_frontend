let websocket = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;
const reconnectDelay = 3000;
let forcedOffline = false; // Track if we've decided to stop attempting connections

// Store event listeners
const eventListeners = {
  message: [],
  notification: [],
  chatMessage: [],
  statusUpdate: [],
  error: [],
  connection: []
};

const websocketService = {
  connect() {
    try {
      // If we've determined the backend is offline, don't keep trying
      if (forcedOffline) {
        this.triggerEvent('connection', { status: 'unavailable', reason: 'Backend unavailable' });
        return null;
      }

      const token = localStorage.getItem('token');
      
      // Skip WebSocket setup if no token is available
      if (!token) {
        console.warn('No authentication token available for WebSocket connection');
        this.triggerEvent('connection', { status: 'unauthorized', reason: 'No auth token' });
        return null;
      }

      // Instead of checking backend availability which causes connection errors,
      // simply start the connection process directly
      this.initiateWebSocketConnection(token);
      
      return websocket;
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      this.triggerEvent('connection', { status: 'error', error });
      return null;
    }
  },
  
  initiateWebSocketConnection(token) {
    // Close existing connection if any
    if (websocket && websocket.readyState !== WebSocket.CLOSED) {
      websocket.close(1000, 'Reconnecting');
    }
    
    // Get WebSocket URL from environment or use default
    let WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:5000/ws';
    
    // Check if we're using HTTPS, if so, use secure WebSocket
    if (window.location.protocol === 'https:') {
      WS_URL = WS_URL.replace('ws://', 'wss://');
    }
    
    console.info('Connecting to WebSocket at:', WS_URL);
    
    try {
      websocket = new WebSocket(`${WS_URL}?token=${token}`);
      
      // Set a connection timeout
      const connectionTimeout = setTimeout(() => {
        if (websocket && websocket.readyState !== WebSocket.OPEN) {
          console.warn('WebSocket connection attempt timed out');
          websocket.close();
        }
      }, 5000); // 5 second timeout

      websocket.onopen = () => {
        clearTimeout(connectionTimeout);
        console.info('WebSocket connected');
        reconnectAttempts = 0;
        forcedOffline = false;
        this.triggerEvent('connection', { status: 'connected' });
      };

      websocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Route messages based on their type
          if (data.type) {
            this.triggerEvent(data.type, data);
          }
          
          // Always trigger the generic message event as well
          this.triggerEvent('message', data);
        } catch (err) {
          console.error('Error processing WebSocket message:', err);
        }
      };

      websocket.onclose = (e) => {
        clearTimeout(connectionTimeout);
        console.info('WebSocket disconnected:', e.reason);
        this.triggerEvent('connection', { 
          status: 'disconnected', 
          code: e.code, 
          reason: e.reason 
        });
        
        // Attempt to reconnect unless the connection was closed intentionally
        // or we've reached max reconnect attempts
        if (e.code !== 1000 && reconnectAttempts < maxReconnectAttempts && !forcedOffline) {
          reconnectAttempts++;
          console.info(`Reconnecting... (Attempt ${reconnectAttempts}/${maxReconnectAttempts})`);
          setTimeout(() => this.connect(), reconnectDelay * reconnectAttempts);
        }
        
        // If we've hit the max reconnect attempts, stop trying and mark as offline
        if (reconnectAttempts >= maxReconnectAttempts) {
          console.warn('Maximum reconnection attempts reached, marking backend as unavailable');
          forcedOffline = true;
          this.triggerEvent('connection', { 
            status: 'unavailable', 
            reason: 'Maximum reconnection attempts reached' 
          });
        }
      };

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
        // Don't set forcedOffline here - let the onclose handler take care of reconnection logic
        this.triggerEvent('error', { error });
      };
    } catch (error) {
      console.error('Error creating WebSocket:', error);
      this.triggerEvent('error', { error });
    }
  },
  
  disconnect() {
    if (websocket) {
      websocket.close(1000, 'User initiated disconnect');
      websocket = null;
    }
  },
  
  send(data) {
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(data));
      return true;
    } else if (websocket && websocket.readyState === WebSocket.CONNECTING) {
      // If socket is connecting, queue the message by setting a short timeout
      setTimeout(() => this.send(data), 500);
      return false;
    } else if (!forcedOffline) {
      // Only try to reconnect if we haven't determined the backend is offline
      console.warn('WebSocket is not connected. Attempting to connect...');
      this.connect();
      // Queue the send operation after a delay to allow connection to establish
      setTimeout(() => this.send(data), 1000);
      return false;
    }
    // If we've determined backend is offline, fail silently
    return false;
  },
  
  isConnected() {
    return websocket && websocket.readyState === WebSocket.OPEN;
  },

  // Event system
  on(eventType, callback) {
    if (!eventListeners[eventType]) {
      eventListeners[eventType] = [];
    }
    eventListeners[eventType].push(callback);
    
    // Return an unsubscribe function
    return () => {
      this.off(eventType, callback);
    };
  },
  
  off(eventType, callback) {
    if (eventListeners[eventType]) {
      eventListeners[eventType] = eventListeners[eventType].filter(cb => cb !== callback);
    }
  },
  
  triggerEvent(eventType, data) {
    if (eventListeners[eventType]) {
      eventListeners[eventType].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error executing ${eventType} event handler:`, error);
        }
      });
    }
  },
  
  // Specific message senders with error handling
  sendChatMessage(message) {
    return this.send({
      type: 'chatMessage',
      message
    });
  },
  
  requestStatusUpdate() {
    return this.send({
      type: 'requestStatus'
    });
  },
  
  markMessageAsRead(messageId) {
    return this.send({
      type: 'markRead',
      messageId
    });
  },
  
  joinRoom(roomId) {
    return this.send({
      type: 'joinRoom',
      roomId
    });
  },
  
  leaveRoom(roomId) {
    return this.send({
      type: 'leaveRoom',
      roomId
    });
  }
};

export default websocketService;
