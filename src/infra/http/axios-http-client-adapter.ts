import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';
import axios, { AxiosResponse } from 'axios';

export class AxiosHttpClientAdapter implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosHttpClientResponse: AxiosResponse;
    try {
      axiosHttpClientResponse = await axios.request({
        url: data.url,
        method: data.method,
        headers: data.headers,
        data: data.body,
        params: data.params,
      });
    } catch (error: any) {
      axiosHttpClientResponse = error.response;
    }
    return {
      httpCode: axiosHttpClientResponse.status,
      message: axiosHttpClientResponse.data.message,
      body: axiosHttpClientResponse.data.body,
    };
  }
}
