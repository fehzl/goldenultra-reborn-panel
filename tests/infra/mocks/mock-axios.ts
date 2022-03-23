import axios from 'axios';
import { faker } from '@faker-js/faker';

const object = { keyA: `valueA`, keyB: 42 };

export const mockHttpResponse = (): any => ({
  data: faker.random.objectElement(object),
  status: faker.datatype.number(),
});

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse());
  return mockedAxios;
};
