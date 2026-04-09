// buat fungsi untuk cek duplikasi data kategori

import { ConflictException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export const conflict = async (
  nama: string, // untuk dto
  id: number,
  prisma: PrismaService['kategori'],
  message: string,
) => {
  // buat variable untuk filter nama
  // const nama_filter = createKategoriDto.nama.toUpperCase();
  const nama_filter = nama.trim().replace(/\s/g, '').toLowerCase();

  // cek apakah nama kategori sudah ada
  const exist = await prisma.findFirst({
    where: {
      NOT: { id: id },
      nama_filter: nama_filter,
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
