import { atom } from "recoil";

export const notifications = atom({
  key: "notifications",
  default: {
    open: true,
    vertical: "top",
    horizontal: "center",
    message: "Login success!",
    severity: "success",
  },
});

export const popUp = atom({
  key: "popUp",
  default: {
    open: false,
    data: {},
  },
});


export const searchPopUp = atom({
  key: "searchPopUp",
  default: {
    open: false,
    data: {},
  },
});