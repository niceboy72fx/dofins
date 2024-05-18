import { urlMap } from "../urls";
import RequestUtil from "./requestUtil";
import StorageUtil from "./storage";

export default class NavUtil {
  static logout() {
    const { prefix, endpoints } = urlMap.auth;
    const refreshToken = StorageUtil.getStorageObj("refresh-token");
    RequestUtil.apiCallWithRefreshToken(
      prefix + endpoints.logOut,
      { refresh_token: refreshToken },
      "POST"
    )
      .then((req) => {
        localStorage.clear();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }
}
