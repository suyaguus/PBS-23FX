import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { PrismaService } from 'src/prisma.service';
import { notExistKategori } from 'src/common/utils/notExist.utils';

@Injectable()
export class KategoriService {
  // buat constructor untuk prisma service
  constructor(private readonly prisma: PrismaService) {}

  // simpan data kategori
  async create(createKategoriDto: CreateKategoriDto) {
    // buat variable untuk filter nama
    // const nama_filter = createKategoriDto.nama.toUpperCase();
    const nama_filter = createKategoriDto.nama
      .trim()
      .replace(/\s/g, '')
      .toLowerCase();

    // cek apakah data nama kategori sudah ada
    const exist = await this.prisma.kategori.findFirst({
      where: {
        nama_filter: nama_filter,
      },
    });

    // jika nama kategori ditemukan
    if (exist) {
      // tampilkan response
      throw new ConflictException({
        succsess: false,
        message: process.env.FAILED_SAVE_MESSAGE,
        metadata: {
          status: HttpStatus.CONFLICT,
        },
      });
    }

    // jika nama kategori tidak ditemukan

    // simpan data kategori
    await this.prisma.kategori.create({
      data: {
        nama: createKategoriDto.nama,
        nama_filter: nama_filter,
      },
    });

    // tampilkan respone
    return {
      success: true,
      message: process.env.SUCCESS_SAVE_MESSAGE,
      metadata: {
        status: HttpStatus.CREATED,
      },
    };
  }

  async findAll() {
    // return `This action returns all kategori`;
    // tampilkan data kategori
    const data = await this.prisma.kategori.findMany();
    // jika data kategori kosong / tidak ada
    if (data.length === 0) {
      // throw new HttpException(
      //   {
      //     success: false,
      //     message: `Data Kategori Tidak Ditemukan`,
      //     metadata: {
      //       status: HttpStatus.NOT_FOUND,
      //       total_data: data.length,
      //     },
      //   },
      //   HttpStatus.NOT_FOUND,
      // );
      throw new NotFoundException({
        success: false,
        message: process.env.NOT_FOUND_MESSAGE,
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: data.length,
        },
      });
    }

    // jika data kategori ada
    return {
      success: true,
      message: process.env.SUCCESS_FIND_MESSAGE,
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data: data,
    };
  }

  // fungsi untuk detail data
  async findOne(id: number) {
    // return `This action returns a #${id} kategori`;

    try {
      // tampilkan data kategori berdasarkan id
      // const data = await this.prisma.kategori.findUnique({
      //   where: {
      //     id: id,
      //   },
      // });

      // jika data kategori tidak ditemukan
      // if (!data) {
      //   throw new NotFoundException({
      //     success: false,
      //     message: process.env.NOT_FOUND_MESSAGE,
      //     metadata: {
      //       status: HttpStatus.NOT_FOUND,
      //     },
      //   });
      // }

      // panggil fungsi not Exist
      const data = await notExistKategori(id, this.prisma.kategori);

      // jika data ketegori ditemukan
      return {
        success: true,
        message: process.env.SUCCESS_FIND_MESSAGE,
        metadata: {
          status: HttpStatus.OK,
        },
        data: data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: process.env.BAD_REQUEST_MESSAGE_SLUG,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  // fungsi untuk ubah data
  async update(id: number, updateKategoriDto: UpdateKategoriDto) {
    // return `This action updates a #${id} kategori`;

    try {
      // tampilkan data kategori berdasarkan id
      // const data = await this.prisma.kategori.findUnique({
      //   where: {
      //     id: id,
      //   },
      // });

      // jika data kategori tidak ditemukan
      // if (!data) {
      //   throw new NotFoundException({
      //     success: false,
      //     message: process.env.NOT_FOUND_MESSAGE,
      //     metadata: {
      //       status: HttpStatus.NOT_FOUND,
      //     },
      //   });
      // }

      // panggil fungsi not Exist
      await notExistKategori(id, this.prisma.kategori);

      // buat variable untuk filter nama
      // const nama_filter = createKategoriDto.nama.toUpperCase();
      const nama_filter = (updateKategoriDto.nama ?? '')
        .trim()
        .replace(/\s/g, '')
        .toLowerCase();

      // cek apakah nama kategori sudah ada
      const exist = await this.prisma.kategori.findFirst({
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
          message: process.env.FAILED_UPDATE_MESSAGE,
          metadata: {
            status: HttpStatus.CONFLICT,
          },
        });
      }

      // ubah data kategori berdasarkan id
      await this.prisma.kategori.update({
        where: { id: id },
        data: {
          nama: updateKategoriDto.nama,
          nama_filter: nama_filter,
        },
      });

      return {
        success: true,
        message: process.env.SUCCESS_UPDATE_MESSAGE,
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      // if (error instanceof NotFoundException) {
      //   throw error;
      // }

      // if (error instanceof ConflictException) {
      //   throw error;
      // }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: process.env.BAD_REQUEST_MESSAGE_SLUG,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  async remove(id: number) {
    // return `This action removes a #${id} kategori`;

    try {
      // tampilkan data kategori berdasarkan id
      // const data = await this.prisma.kategori.findUnique({
      //   where: {
      //     id: id,
      //   },
      // });

      // jika data kategori tidak ditemukan
      // if (!data) {
      //   throw new NotFoundException({
      //     success: false,
      //     message: process.env.NOT_FOUND_MESSAGE,
      //     metadata: {
      //       status: HttpStatus.NOT_FOUND,
      //     },
      //   });
      // }

      // panggil fungsi not Exist
      await notExistKategori(id, this.prisma.kategori);

      // jika data ketegori ditemukan

      // jika data ketegori ditemukan
      // hapus data kategori
      await this.prisma.kategori.delete({
        where: { id: id },
      });

      return {
        success: true,
        message: process.env.SUCCESS_DELETE_MESSAGE,
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException({
        success: false,
        message: process.env.BAD_REQUEST_MESSAGE_SLUG,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }
}
