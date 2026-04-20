import { Injectable } from '@nestjs/common';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';
import axios from 'axios';
import { kategori_api } from '../common/axios/kategori-inteceptor.axios';

// buat interface untuk data kategori
export interface Kategori {
  id: number;
  nama: string;
  nama_filter: string;
}

@Injectable()
export class KategoriService {
  // buat variable untuk endpoint milik kategori
  private readonly api_url = 'http://localhost:3001/api/kategori';

  create(createKategoriDto: CreateKategoriDto) {
    return 'This action adds a new kategori';
  }

  // fungsi untuk ambil data kategori
  // findAll kategori (3001)
  async findAll(): Promise<Kategori[]> {
    // return `This action returns suyagus`;
    const response = await axios.get<Kategori[]>(this.api_url);
    // const response = await kategori_api.get<Kategori[]>('/'); import dari interceptor

    return response.data;
  }

  async findOne(id: number): Promise<Kategori> {
    // return `This action returns a #${id} kategori`;
    // const response = await axios.get<Kategori>(`${this.api_url}/${id}`);
    const response = await kategori_api.get<Kategori>(`/${id}`);

    return response.data;
  }

  update(id: number, updateKategoriDto: UpdateKategoriDto) {
    return `This action updates a #${id} kategori`;
  }

  remove(id: number) {
    return `This action removes a #${id} kategori`;
  }
}
