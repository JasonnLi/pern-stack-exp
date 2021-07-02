import axios, { AxiosInstance, AxiosResponse } from "axios";

export default class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });
  }

  async GET<TResponse>(url: string): Promise<AxiosResponse<TResponse>> {
    return this.client.get(url);
  }

  async POST<TResponse, TBody = {}>(
    url: string,
    body: TBody
  ): Promise<AxiosResponse<TResponse>> {
    return this.client.post(url, body);
  }

  async PUT<TResponse, TBody = {}>(
    url: string,
    body: TBody
  ): Promise<AxiosResponse<TResponse>> {
    return this.client.put(url, body);
  }

  async DEL<TResponse>(url: string): Promise<AxiosResponse<TResponse>> {
    return this.client.delete(url);
  }
}
