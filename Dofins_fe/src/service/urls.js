export const urlMap = {
  auth: {
    prefix: "auth/",
    endpoints: {
      login: "login/",
      register: "register/",
      verifyEmail: "verify-email/",
      logOut: "logout/",
    },
  },
  token: {
    prefix: "auth/token/",
    endpoints: {
      refreshToken: "refresh/",
      checkToken: "verify/",
    },
  },
  otp: {
    prefix: "verify/otp",
    endpoints: {
      sendResetPwdOtp: "send-reset-pwd-otp",
      resendOtp: "resend-otp",
      checkOtp: "check-otp",
    },
  },
  profile: {
    prefix: "account/",
    endpoints: {
      profile: "profile",
    },
  },
  stock: {
    prefix: "data/",
    endpoints: {
      display: "display",
      shortList: "dofin_selected",
    },
  },
};
