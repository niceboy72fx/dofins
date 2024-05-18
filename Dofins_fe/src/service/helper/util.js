import axios from "axios";
import RequestUtil from "./requestUtil";

export default class Util {
  static responseInterceptor() {
    axios.defaults.withCredentials = false;
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.defaults.xsrfCookieName = "csrftoken";
  }

  static getValueFromEvent(e) {
    const { target } = e;
    return target.value || "";
  }

  static formatNumber(num) {
    if (num === undefined) {
      return "Market's close";
    }
    const formattedAmount = num.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedAmount;
  }

  static async authenticate() {
    const urls = "https://www.fireant.vn/api";

    const headers = { "Content-Type": "application/json" };
    const body = JSON.stringify({
      email: "dolphindofin@gmail.com",
      password: "Nvtrung@81",
    });
    try {
      const response = await fetch(urls + "/Data/Login/Login", {
        method: "POST",
        headers,
        body,
      });
      const responseData = await response.json();
      return responseData.Token; // assuming the token is directly accessible without 'get' method
    } catch (error) {
      console.error("Error:", error);
    }
  }

  static checkWeekends(dates) {
    return dates.filter((date) => {
      const day = new Date(date).getDay();
      return day === 0 || day === 6;
    });
  }

  static checkWeekendsRealtime(dates) {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (day === 0 || day === 6) {
      const inMorningRange =
        hours === 9 || hours === 10 || (hours === 11 && minutes <= 30);

      const inAfternoonRange =
        hours === 13 || hours === 14 || (hours === 15 && minutes === 0);

      return inMorningRange || inAfternoonRange;
    }

    return false;
  }

  static async fetchHistoricalStock(stock, token) {
    const urls = "https://www.fireant.vn/api";

    const headers = {
      JWTToken: token,
    };

    const now = new Date();

    // Extract year, month, and day
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    // Combine into the desired format
    const formattedDate = `${year}-${month}-${day}`;

    if (this.checkWeekends([formattedDate])) {
      return [];
    } else {
      try {
        const response = await fetch(
          urls +
            "/Excel/Company/HistoricalQuotes/" +
            stock +
            `/${formattedDate}/${formattedDate}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        return await response.json();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  static handleStockRealtime(setFilteredMessages) {
    let websocket;
    let reconnectInterval;

    if (this.checkWeekendsRealtime()) {
      setFilteredMessages([]);
      return "None";
    }

    const connectWebSocket = () => {
      websocket = new WebSocket("ws://localhost:4000/fireAnt");

      websocket.onopen = () => {
        console.log("Connected to WebSocket server");
        if (reconnectInterval) {
          clearInterval(reconnectInterval);
          reconnectInterval = null;
        }
      };

      websocket.onmessage = (event) => {
        const msgJson = JSON.parse(event.data);
        const listOfDicts = msgJson.UpdateQuote;

        if (listOfDicts) {
          setFilteredMessages((prevMessages) => [
            ...prevMessages,
            ...listOfDicts,
          ]);
        }
      };

      websocket.onclose = (event) => {
        console.error(
          `WebSocket closed with code: ${event.code}. Reconnecting in 5 seconds...`
        );
        if (!reconnectInterval) {
          reconnectInterval = setInterval(connectWebSocket, 5000);
        }
      };

      websocket.onerror = (error) => {
        console.error(`WebSocket error: ${error.message}`);
        websocket.close();
      };
    };

    connectWebSocket();

    return () => {
      if (websocket) {
        websocket.close();
      }
      if (reconnectInterval) {
        clearInterval(reconnectInterval);
      }
    };
  }
}
