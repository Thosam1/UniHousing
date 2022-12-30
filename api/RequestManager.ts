import { PROD_MODE } from "../utils/util";
import axios from "axios";
import { useAppSelector } from "../features/hooks";
import { selectAccessToken } from "../features/auth/authSlice";

const serverHostName = "localhost"; // "172.23.208.1"
const serverPort = "3000"; // todo change for production

export const BASE_URL = PROD_MODE
  ? ""
  : `http://${serverHostName}:${serverPort}/api/`; // "http://localhost:3000/api/");

export const POST = "POST";
export const GET = "GET";
export const DELETE = "DELETE";

export const JSON_TYPE = "application/json; charset=utf-8";
export const TEXT_TYPE = "text/plain; charset=utf-8";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: JSON_TYPE,
    "Content-Type": JSON_TYPE,
  },
});

// // for JWT -> interceptors
// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": JSON_TYPE,
//     Authorization: `Bearer FUCK`, //${localStorage.getItem("accessToken")}` // problem because of const, doesn't update after signIn !
//   },
//   // withCredentials: true
// });
