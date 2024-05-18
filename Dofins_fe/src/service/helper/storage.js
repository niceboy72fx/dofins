export default class StorageUtil {
  static setStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  }

  static setStorageObj(input) {
    for (const key in input) {
      const value = input[key];
      this.setStorage(key, value);
    }
  }

  static getStorageStr(key) {
    try {
      const value = this.parseJson(localStorage.getItem(key));
      if (!!value || typeof value === "object") {
        return "";
      }
      return String(value);
    } catch (error) {
      return "";
    }
  }

  static getStorageObj(key) {
    try {
      const value = this.parseJson(localStorage.getItem(key));
      return value;
    } catch (error) {
      return "";
    }
  }

  static removeStorage(key) {
    localStorage.removeItem(key);
  }

  static parseJson(input) {
    try {
      return JSON.parse(input);
    } catch (error) {
      return String(input);
    }
  }

  static getToken() {
    const authObj = this.getStorageObj("token");
    if (authObj === null) {
      return null;
    } else {
      return authObj;
    }
  }

  static setToken(token) {
    const authData = this.getStorageObj("auth");
    authData["token"] = token;
    this.setStorage("auth", authData);
  }
}
