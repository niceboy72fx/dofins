import axios from "axios";
import StorageUtil from "./storage";
import { BASE_URL } from "../../const";

export default class RequestUtil {
  static getJsonPayload(data) {
    return {
      data: data,
      "Content-Type": "application/json",
    };
  }

  static getFormDataPayload(data) {
    const formData = new FormData();
    for (const key in data) {
      const value = data[key];
      formData.set(key, value);
    }
    return {
      data: formData,
      "Content-Type": "",
    };
  }

  static fileInObject(data) {
    return !!Object.values(data).filter((item) => item instanceof Blob).length;
  }

  static async request(url, params = {}, method = "GET") {
    const token = StorageUtil.getToken();
    const config = {
      method,
      baseURL: BASE_URL,
      url,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      },
      data: params,
    };
    const data = await axios(config);
    return data;
  }

  static async requestWithoutToken(url, params = {}, method = "GET") {
    const config = {
      method,
      baseURL: BASE_URL,
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: params,
    };
    const data = await axios(config);
    return data;
  }

  static async apiCallWithRefreshToken(url, params = {}, method = "GET") {
    const emptyError = {
      response: {
        data: {},
      },
    };
    try {
      return await this.request(url, params, method);
    } catch (err) {
      const refreshUrl = "api/v1/auth/token/refresh/";
      const checkUrl = "api/v1/auth/token/verify/";
      if (err.response.status === 401) {
        try {
          const refreshTokenResponse = await this.request(
            refreshUrl,
            { refresh_token: StorageUtil.getRefreshToken() },
            "POST"
          );
          const token = refreshTokenResponse.data.token;
          StorageUtil.setRefreshToken(token);
        } catch (err) {
          this.request(checkUrl).catch(() => {
            return Promise.reject(emptyError);
          });
        }
      }
      return Promise.reject(emptyError);
    }
  }
}
