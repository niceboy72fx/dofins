// WebSocketManager.js
class WebSocketManager {
  constructor(
    url,
    messageHandler,
    pingInterval = 30000,
    reconnectInterval = 5000
  ) {
    this.url = url;
    this.messageHandler = messageHandler;
    this.pingInterval = pingInterval;
    this.reconnectInterval = reconnectInterval;
    this.websocket = null;
    this.pingIntervalId = null;
    this.reconnectTimeout = null;
  }

  connect() {
    if (this.checkWeekendsRealtime()) {
      this.messageHandler([]);
      return;
    }

    this.websocket = new WebSocket(this.url);

    this.websocket.onopen = () => {
      console.log("Connected to WebSocket server");
      this.startPing();
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }
    };

    this.websocket.onmessage = (event) => {
      const msgJson = JSON.parse(event.data);
      const listOfDicts = msgJson.UpdateQuote;

      if (listOfDicts) {
        this.messageHandler((prevMessages) => [
          ...prevMessages,
          ...listOfDicts,
        ]);
      }
    };

    this.websocket.onclose = (event) => {
      console.error(
        `WebSocket closed with code: ${event.code}. Reconnecting in ${
          this.reconnectInterval / 1000
        } seconds...`
      );
      this.stopPing();
      this.scheduleReconnect();
    };

    this.websocket.onerror = (error) => {
      console.error(`WebSocket error: ${error.message}`);
      this.websocket.close();
    };
  }

  startPing() {
    this.pingIntervalId = setInterval(() => {
      if (this.websocket.readyState === WebSocket.OPEN) {
        this.websocket.send(JSON.stringify({ type: "ping" }));
      }
    }, this.pingInterval);
  }

  stopPing() {
    clearInterval(this.pingIntervalId);
  }

  scheduleReconnect() {
    if (!this.reconnectTimeout) {
      this.reconnectTimeout = setTimeout(() => {
        this.connect();
      }, this.reconnectInterval);
    }
  }

  close() {
    if (this.websocket) {
      this.websocket.close();
    }
    this.stopPing();
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
  }

  checkWeekendsRealtime() {
    const now = new Date();
    const day = now.getUTCDay();
    return day === 0 || day === 6; // Check if it's Saturday or Sunday
  }
}

export default WebSocketManager;
