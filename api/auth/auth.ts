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
  return axiosClient.post("account/login", body);
  // try {
  //   const { data } = await axios.post<loginResponse>(
  //     BASE_URL + "account/login",
  //     { email: email, password: password, rememberMe: rememberMe },
  //     {
  //       headers: {
  //         "Content-Type": JSON_TYPE,
  //         Accept: JSON_TYPE,
  //       },
  //     }
  //   );

  //   console.log(JSON.stringify(data, null, 1));

  //   return data;
  // } catch (error) {
  //   return axiosErrorHandler(error);
  // }
}

export async function loginJWT(email: string, jwt_token: string) {
  const body = JSON.stringify({ email: email, jwt_token: jwt_token });
  return axiosClient.post("account/login", body);
}

export async function logout(user_id: string) {
  // delete jwt token locally so next time it is prompted
  const body = JSON.stringify({ email: user_id });
  return axiosClient.post("account/logout", body);
}

export async function register(
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  const body = JSON.stringify({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
  });
  return axiosClient.post("account/register", body);
}

export async function verifyEmail(email: string, code: string) {
  const body = JSON.stringify({ email: email, code: code });
  return axiosClient.post("account/verify-email", body);
}

export async function resendVerificationEmail(email: string) {
  const body = JSON.stringify({ email: email });
  return axiosClient.post("account/resend-verification-code-email", body);
}

export async function forgotPassword(email: string) {
  // sends a code from the backend to this email address
  const body = JSON.stringify({ email: email });
  return axiosClient.post("account/forgot-password", body);
}

export async function resendForgotPassword(email: string) {
  // resends a code from the backend to this email address
  const body = JSON.stringify({ email: email });
  return axiosClient.post(
    "account/resend-verification-code-password-email",
    body
  );
}

export async function verifyForgotPassword(email: string, code: string) {
  const body = JSON.stringify({ email: email, code: code });
  return axiosClient.post("account/verify-forgot-password", body);
}
