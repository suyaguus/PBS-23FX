// buat variable untuk endpoint API kategori

import { HttpException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { response } from 'express';

export const kategori_api = axios.create({
  baseURL: 'http://localhost:3001/api/kategori',
  timeout: 1000,
});

// buat interceptor untuk kategori_api
kategori_api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string }>) => {
    // buat variable untuk response
    const status = error.response?.status;

    // pesan
    const message = error.response?.data?.message;

    // jika status error (terdfinisi)
    if (status && message) {
      throw new HttpException(message, status);
    }

    // jika status tidak terdefinisi
    throw new HttpException('Kategori Service Error', 500);
  },
);
