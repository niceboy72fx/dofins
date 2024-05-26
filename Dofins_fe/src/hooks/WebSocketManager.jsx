// useWebSocket.js
import { useState, useEffect, useRef } from 'react';
import WebSocketManager from "../service/helper/webSocketUtil";

const useWebSocket = (url) => {
    const [messages, setMessages] = useState([]);
    const websocketManagerRef = useRef(null);

    useEffect(() => {
        websocketManagerRef.current = new WebSocketManager(url, setMessages);
        websocketManagerRef.current.connect();
        return () => {
            websocketManagerRef.current.close();
        };
    }, [url]);

    return messages;
};

export default useWebSocket;
