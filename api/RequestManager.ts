import { PROD_MODE } from "../utils/util";
import axios from "axios"

export const BASE_URL = (PROD_MODE ? "" : window.location.origin + "/server") + "/api/v1/";

export const POST = "POST";
export const GET = "GET";
export const DELETE = "DELETE";

export const JSON_TYPE = "application/json; charset=utf-8";
export const TEXT_TYPE = "text/plain; charset=utf-8";

// export class RequestManager {
//     constructor() {

//     }

//     request = (method: string, path: string, contentType: string, body: string, onSuccess: Function, onFailure: Function, parseJson = true) => {
//         const xhr = new XMLHttpRequest();

//         xhr.open(method, BASE_URL + path);
//         if (contentType != null) {
//             xhr.setRequestHeader("Content-Type", contentType);
//         }

//         xhr.addEventListener("readystatechange", () => {
//             if (xhr.readyState === XMLHttpRequest.DONE) {
//                 if (xhr.status === 200) {
//                     onSuccess(parseJson ? JSON.parse(xhr.response) : xhr.response)
//                 } else if (xhr.status === 401) {
//                     if (window.location.pathname === "/") {
//                         window.location.href = "/login";
//                     } else {
//                         window.location.href = "/login?redirect=" + encodeURIComponent(window.location.pathname);
//                     }
//                 } else {
//                     console.warn(xhr.status, xhr.response);
//                     onFailure(xhr.status, xhr.responseText);
//                 }
//             }
//         });

//         (body == null) ? xhr.send() : xhr.send(body);
//     }
// }

export function axiosErrorHandler(error: any) {
    if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        // 👇️ error: AxiosError<any, any>
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
}
