import { AxiosHttpClientAdapter } from '@/infra/http/axios-http-client-adapter';
import axios from 'axios';
import { mockHttpRequest } from '../../data/mocks';
import { mockAxios } from '../mocks';

jest.mock(`axios`);

type sutTypes = {
  sut: AxiosHttpClientAdapter;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): sutTypes => {
  const sut = new AxiosHttpClientAdapter();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe(`Axios Http Client Adapter`, () => {
  it(`Call Axios with correct values`, async () => {
    const request = mockHttpRequest();
    const { sut, mockedAxios } = makeSut();

    await sut.request(request);

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      method: request.method,
      data: request.body,
    });
  });
});
