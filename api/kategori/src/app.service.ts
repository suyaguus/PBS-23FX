import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcome(): string {
    return 'Selamat datang di API Kategori!';
  }
}
// logic untuk service utama aplikasi, bisa digunakan untuk menyimpan fungsi-fungsi umum yang dibutuhkan di seluruh aplikasi.
