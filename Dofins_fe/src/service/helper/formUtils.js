import RequestUtil from "./requestUtil";

export default class FormUtil {
  static submitForm(url, payload, method = "POST") {
    return new Promise((resolve, reject) => {
      RequestUtil.apiCallWithRefreshToken(url, payload, method)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
