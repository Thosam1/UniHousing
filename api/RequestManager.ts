import { PROD_MODE } from "../utils/util";
import axios from "axios";

export const BASE_URL =
  (PROD_MODE ? "" : window.location.origin + "/server") + "/api/v1/";

export const POST = "POST";
export const GET = "GET";
export const DELETE = "DELETE";

export const JSON_TYPE = "application/json; charset=utf-8";
export const TEXT_TYPE = "text/plain; charset=utf-8";

export function axiosErrorHandler(error: any) {
  if (axios.isAxiosError(error)) {
    console.log("error message: ", error.message);
    // 👇️ error: AxiosError<any, any>
    return error.message;
  } else {
    console.log("unexpected error: ", error);
    return "An unexpected error occurred";
  }
}

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': JSON_TYPE,
    'Content-Type': JSON_TYPE
  }
});

// //interface for the Helper
// interface Params {
//   baseUrl: string;
//   headers: any;
//   method: string;
// }

// //helper config
// const postConfig: Params = {
//   baseUrl: BASE_URL,
//   headers: {
//       "Authorization": "",
//           },
//   method: 'post'
// }

// //helper function to be exported
// export  const postAPI = async (url: string, data: any): Promise<any> =>{
//   return await axios({
//       ...postConfig,
//       url: `${postConfig.baseUrl}/${url}`,
//       data
//   }).then ( (response) => {
//       console.log(response)
//       return {
//           status: response.status,
//           data: response.data
//       }
//   }).catch((error) =>{
//       console.log(error)
//       return {
//           status: error.status,
//           data: error.response
//       }
//   })
// }

// //config for get request note that the method as changed to get this is very important
// const getConfig : Params = {
//   baseUrl: BASE_URL,
//       headers: {
//           "Authorization": ""
//       },
//   method: 'get'
// }

// export const getAPI = async (url: string, data: any): Promise<any> =>{
//   return await axios({
//       ...getConfig,
//       url: `${getConfig.baseUrl}/${url}/${data}`,
//   }).then ( (response) => {
//       console.log(response)
//       return {
//           status: response.status,
//           data: response.data
//       }
//   }).catch((error) =>{
//       console.log(error)
//       return {
//           status: error.status,
//           data: error.response
//       }
//   })
// }

