import { Axios, AxiosRequestConfig, AxiosResponse } from 'axios';
type SuccessResponse<T> = {
  result: T;
  message: string;
  success: string;
};

const axios = new Axios({
  headers: {
    'Content-Type': 'application/json',
  },
  transformResponse: [data => JSON.parse(data)],
  transformRequest: [data => JSON.stringify(data)],
});

const AxiosPost = <O>(url: string, data?: any) => {
  return axios.post<SuccessResponse<O>, AxiosResponse<SuccessResponse<O>>>(url, data);
};

const AxiosGet = <O>(url: string, config?: AxiosRequestConfig) =>
  axios.get<SuccessResponse<O>, AxiosResponse<SuccessResponse<O>>>(url, config);

export { AxiosGet, AxiosPost };
