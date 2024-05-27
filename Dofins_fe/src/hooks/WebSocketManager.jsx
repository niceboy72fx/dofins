// useWebSocket.js
import { useState, useEffect, useRef } from 'react';
import WebSocketManager from "../service/helper/webSocketUtil";

const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);
  const reconnectIntervalRef = useRef(null);
  const isFirstMessage = useRef(true);

  useEffect(() => {
    const connectWebSocket = () => {
      wsRef.current = new WebSocket(url);

      wsRef.current.onopen = () => {
        console.log('Connected to WebSocket server');
        if (reconnectIntervalRef.current) {
          clearInterval(reconnectIntervalRef.current);
        }
      };

      wsRef.current.onmessage = (event) => {
        const msgJson = JSON.parse(event.data);
        const listOfDicts = msgJson.UpdateQuote;

        if (listOfDicts) {
          setMessages((prevMessages) => {
            return listOfDicts;
          });
         
        }
      };

      wsRef.current.onclose = (event) => {
        console.error(`WebSocket closed with code: ${event.code}. Reconnecting in 5 seconds...`);
        if (!reconnectIntervalRef.current) {
          reconnectIntervalRef.current = setInterval(connectWebSocket, 5000);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error(`WebSocket error: ${error.message}`);
        wsRef.current.close();
      };
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectIntervalRef.current) {
        clearInterval(reconnectIntervalRef.current);
      }
    };
  }, [url]);

  return messages;
};

export default useWebSocket;
