import axios from "axios";

import { axiosClient } from "../RequestManager";

type loginResponse = {
  jwt_token: string;
};

export async function login(
  email: string,
  password: string,
  rememberMe: string
) {
  const body = JSON.stringify({
    email: email,
    password: password,
    rememberMe: rememberMe,
  });
  return axiosClient.post("auth/login", body);
}

export async function loginJWT(email: string, jwt_token: string) {
  const body = JSON.stringify({ email: email, jwt_token: jwt_token });
  return axiosClient.post("auth/login", body);
}

export async function logout(user_id: string) {
  // delete jwt token locally so next time it is prompted
  const body = JSON.stringify({ email: user_id });
  return axiosClient.post("auth/logout", body);
}

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
  return axiosClient.post("users/register", body);
}

export async function verifyEmail(email: string, code: string) {
  const body = JSON.stringify({ email: email, code: code });
  return axiosClient.post("users/verify/:id/:verificationCode", body);
}

// export async function resendVerificationEmail(email: string) {
//   const body = JSON.stringify({ email: email });
//   return axiosClient.post("auth/resend-verification-code-email", body);
// }

export async function forgotPassword(email: string) {
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

export async function verifyForgotPassword(email: string, code: string) {
  const body = JSON.stringify({ email: email, code: code });
  return axiosClient.post("users/resetpassword/:id/:passwordResetCode", body);
}


