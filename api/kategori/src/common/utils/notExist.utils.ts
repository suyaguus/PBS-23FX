// buat fungsi untuk cek data kategori
// (jika tidak ditemukqan datanya)

import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

export const notExistKategori = async (
  id: number,
  prisma: PrismaService['kategori'],
) => {
  // tampilkan data kategori berdasarkan id
  const data = await prisma.findUnique({
    where: {
      id: id,
    },
  });

  // jika data kategori tidak ditemukan
  if (!data) {
    throw new NotFoundException({
      success: false,
      message: process.env.NOT_FOUND_MESSAGE,
      metadata: {
        status: HttpStatus.NOT_FOUND,
      },
    });
  }

  return data;
};
