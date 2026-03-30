import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import { PrismaService } from 'src/prisma.service';

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
        message: `Data Ketegori gagal disimpan (Nama Kategori ${createKategoriDto.nama} Sudah ada)`,
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
      message: `Data Kategori Berhasil Disimpan`,
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
        message: `Data Kategori Tidak Ditemukan`,
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: data.length,
        },
      });
    }

    // jika data kategori ada
    return {
      success: true,
      message: `Data Berhasil ditarik`,
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
      const data = await this.prisma.kategori.findUnique({
        where: {
          id: id,
        },
      });

      // jika data kategori tidak ditemukan
      if (!data) {
        throw new NotFoundException({
          success: false,
          message: `Data Kategori Tidak Ditemukan!`,
          metadata: {
            status: HttpStatus.NOT_FOUND,
          },
        });
      }

      // jika data ketegori ditemukan
      return {
        success: true,
        message: `Data Berhasil ditarik`,
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
        message: `Parameter/Slug ID Harus Angka!`,
        metadata: {
          status: HttpStatus.BAD_REQUEST,
        },
      });
    }
  }

  update(id: number, updateKategoriDto: UpdateKategoriDto) {
    return `This action updates a #${id} kategori`;
  }

  remove(id: number) {
    return `This action removes a #${id} kategori`;
  }
}
