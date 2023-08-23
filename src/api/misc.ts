import { AxiosError } from 'axios';

export const isAxiosNetworkError = (error: unknown) => {
  if (error instanceof AxiosError) {
    return error.code === 'ERR_NETWORK';
  } else {
    return false;
  }
};
