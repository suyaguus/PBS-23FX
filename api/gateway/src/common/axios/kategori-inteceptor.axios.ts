// buat variable untuk endpoint API kategori

import axios from 'axios';

export const kategori_api = axios.create({
  baseURL: 'http://localhost:3001/api/kategori',
  timeout: 1000,
});

// buat interceptor untuk kategori_api

