import {
  HttpException,
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
  create(createKategoriDto: CreateKategoriDto) {
    return 'This action adds a new kategori';
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

  findOne(id: number) {
    return `This action returns a #${id} kategori`;
  }

  update(id: number, updateKategoriDto: UpdateKategoriDto) {
    return `This action updates a #${id} kategori`;
  }

  remove(id: number) {
    return `This action removes a #${id} kategori`;
  }
}
