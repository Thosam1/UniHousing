import axios from "axios";
import {
  axiosErrorHandler,
  BASE_URL,
  JSON_TYPE,
  TEXT_TYPE,
} from "../RequestManager";

type loginResponse = {
  jwt_token: string;
};

export async function login(
  email: string,
  password: string,
  rememberMe: string
) {
  try {
    const { data } = await axios.post<loginResponse>(
      BASE_URL + "account/login",
      { email: email, password: password, rememberMe: rememberMe },
      {
        headers: {
          "Content-Type": JSON_TYPE,
          Accept: JSON_TYPE,
        },
      }
    );

    console.log(JSON.stringify(data, null, 1));

    return data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
}

export async function loginJWT(email: string, jwt_token: string) {
  try {
    const { data } = await axios.post<loginResponse>(
      BASE_URL + "account/login",
      { email: email, jwt_token: jwt_token },
      {
        headers: {
          "Content-Type": JSON_TYPE,
          Accept: JSON_TYPE,
        },
      }
    );

    console.log(JSON.stringify(data, null, 1));

    return data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
}

type logoutResponse = {
  jwt_token: string;
};
export async function logout(user_id: string) {
  // delete jwt token locally so next time it is prompted
  try {
    const { data } = await axios.post<logoutResponse>(
      BASE_URL + "account/logout",
      { user_id: user_id },
      {
        headers: {
          "Content-Type": JSON_TYPE,
          Accept: JSON_TYPE,
        },
      }
    );

    console.log(JSON.stringify(data, null, 1));

    return data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
}

type registerResponse = {
  success: boolean; // (email sent with verification code)
};
export async function register(
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  try {
    const { data } = await axios.post<registerResponse>(
      BASE_URL + "account/register",
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },
      {
        headers: {
          "Content-Type": JSON_TYPE,
          Accept: JSON_TYPE,
        },
      }
    );

    console.log(JSON.stringify(data, null, 1));

    return data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
}

export async function verifyEmail(email: string, code: string) {
  try {
    const { data } = await axios.post<registerResponse>(
      BASE_URL + "account/verify-email",
      { email: email, code: code },
      {
        headers: {
          "Content-Type": JSON_TYPE,
          Accept: JSON_TYPE,
        },
      }
    );

    console.log(JSON.stringify(data, null, 1));

    return data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
}

export async function resendVerificationEmail(email: string) {
  try {
    const { data } = await axios.post<registerResponse>(
      BASE_URL + "account/resend-verification-code-email",
      { email: email },
      {
        headers: {
          "Content-Type": JSON_TYPE,
          Accept: JSON_TYPE,
        },
      }
    );

    console.log(JSON.stringify(data, null, 1));

    return data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
}

export async function forgotPassword(email: string) {
  // sends a code from the backend to this email address
  try {
    const { data } = await axios.post<registerResponse>(
      BASE_URL + "account/forgot-password",
      { email: email },
      {
        headers: {
          "Content-Type": JSON_TYPE,
          Accept: JSON_TYPE,
        },
      }
    );

    console.log(JSON.stringify(data, null, 1));

    return data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
}

export async function resendForgotPassword(email: string) {
  // resends a code from the backend to this email address
  try {
    const { data } = await axios.post<registerResponse>(
      BASE_URL + "account/resend-verification-code-password-email",
      { email: email },
      {
        headers: {
          "Content-Type": JSON_TYPE,
          Accept: JSON_TYPE,
        },
      }
    );

    console.log(JSON.stringify(data, null, 1));

    return data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
}

export async function verifyForgotPassword(email: string, code: string) {
  try {
    const { data } = await axios.post<registerResponse>(
      BASE_URL + "account/verify-forgot-password",
      { email: email, code: code },
      {
        headers: {
          "Content-Type": JSON_TYPE,
          Accept: JSON_TYPE,
        },
      }
    );

    console.log(JSON.stringify(data, null, 1));

    return data;
  } catch (error) {
    return axiosErrorHandler(error);
  }
}
