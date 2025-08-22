import axios, { type AxiosError } from 'axios';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

interface OnUnauthenticated {
  (): void;
}

interface OnRequestSuccess {
  (config: import('axios').InternalAxiosRequestConfig): import('axios').InternalAxiosRequestConfig;
}

interface OnResponseSuccess {
  (response: import('axios').AxiosResponse): import('axios').AxiosResponse;
}

interface OnResponseError {
  (err: AxiosError): Promise<never>;
}

const setupAxiosInterceptors = (onUnauthenticated: OnUnauthenticated): void => {
  const onRequestSuccess: OnRequestSuccess = config => {
    return config;
  };
  const onResponseSuccess: OnResponseSuccess = response => response;
  const onResponseError: OnResponseError = (err: AxiosError) => {
    const status = (err as any).status || (err.response ? err.response.status : 0);
    if (status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
