// buat fungsi untuk cek duplikasi data kategori

import { ConflictException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export const conflict = async (
  // skala prioritas (wajib di atas, dan field optional di bagian bawah)
  nama: string, // untuk dto WAJIB
  prisma: PrismaService['kategori'], //WAJIB
  message: string, //WAJIB
  id?: number, // untuk paramater create dibuat optional // OPTIONAL
) => {
  // buat variable untuk filter nama
  // const nama_filter = createKategoriDto.nama.toUpperCase();
  const nama_filter = nama.trim().replace(/\s/g, '').toLowerCase();

  // cek apakah nama kategori sudah ada
  const exist = await prisma.findFirst({
    where: {
      // ternary operator
      // NOT: id ? { id: id } : undefined, // untuk create membuat nilai id menjadi null
      nama_filter: nama_filter,
      // spread operator
      ...(id ? { NOT: { id: id } } : undefined), // rekomendasi untuk pengganti NOT
    },
  });

  // jika nama kategori ditemukan
  if (exist) {
    // tampilkan response
    throw new ConflictException({
      succsess: false,
      message: message,
      metadata: {
        status: HttpStatus.CONFLICT,
      },
    });
  }

  return nama_filter;
};
