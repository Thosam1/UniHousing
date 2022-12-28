import axios from "axios";

import { axiosClient, axiosPrivate } from "../RequestManager";

// type loginResponse = {
//   tokens: {
//     accessToken: string;
//     refreshToken: string;
//   }
// };

type loginResponse = {
  accessToken: string
}
export function login(
  email: string,
  password: string,
  rememberMe: boolean
) {
  const body = JSON.stringify({
    email: email,
    password: password,
    rememberMe: rememberMe,
  });
  // axiosClient.interceptors.request.use(
  //   config => {
  //     config.headers.authorization = `Bearer ${accessToken}`;
  //     return config;
  //   },
  //   error => {
  //     return Promise.reject(error);
  //   }    
  // );
  return axiosClient.post("sessions/login", body) //.then((res) => res.data);
}

// export function loginJWT(email: string, jwt_token: string) {
//   const body = JSON.stringify({ email: email, jwt_token: jwt_token });
//   return axiosClient.post("auth/login", body);
// }

// export function logout(user_id: string) {
//   // delete jwt token locally so next time it is prompted
//   const body = JSON.stringify({ email: user_id });
//   return axiosClient.post("auth/logout", body);
// }

export function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const body = JSON.stringify({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  });
  // todo security reason, would be better to encrypt the password before sending it
  return axiosClient.post("users/register", body);
}

export function verifyEmail(id: string, verificationCode: string) {
  return axiosClient.post(`users/verify/${id}/${verificationCode}`);
}

// export async function resendVerificationEmail(email: string) {
//   const body = JSON.stringify({ email: email });
//   return axiosClient.post("auth/resend-verification-code-email", body);
// }

export function forgotPassword(email: string) {
  // sends a code from the backend to this email address
  const body = JSON.stringify({ email: email });
  return axiosClient.post("users/forgotpassword", body);
}

// export async function resendForgotPassword(email: string) {
//   // resends a code from the backend to this email address
//   const body = JSON.stringify({ email: email });
//   return axiosClient.post(
//     "auth/resend-verification-code-password-email",
//     body
//   );
// }

export function resetForgotPassword(id: string, passwordResetCode: string, password: string, confirmPassword: string) {
  const body = JSON.stringify({ password: password, confirmPassword: confirmPassword });
  return axiosClient.post(`users/resetpassword/${id}/${passwordResetCode}`, body);
}


