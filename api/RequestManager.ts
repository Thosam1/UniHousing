import { PROD_MODE } from "../utils/util";
import axios from "axios";

export const BASE_URL =
  (PROD_MODE ? "" : window.location.origin + "/server") + "/api/v1/";

export const POST = "POST";
export const GET = "GET";
export const DELETE = "DELETE";

export const JSON_TYPE = "application/json; charset=utf-8";
export const TEXT_TYPE = "text/plain; charset=utf-8";

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': JSON_TYPE,
    'Content-Type': JSON_TYPE
  }
});
