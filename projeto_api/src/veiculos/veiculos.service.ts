import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Veiculo } from './entities/veiculo.entity';

@Injectable()
export class VeiculosService {
  constructor(
    @InjectRepository(Veiculo)
    private VeiculoRepository: Repository<Veiculo>,
  ) {}

  async create(VeiculoDto: CreateVeiculoDto) {
    try {
      return await this.VeiculoRepository.save(VeiculoDto);
    } catch (e) {
      switch (e.code) {
        case 'SQLITE_CONSTRAINT': // Unique violation error code
          let ErrorMessage = e.toString();

          if (ErrorMessage.indexOf('placa') > -1) {
            throw new BadRequestException('Veículo com esta placa já existe.');
          }
          if (ErrorMessage.indexOf('chassi') > -1) {
            throw new BadRequestException('Veículo com este chassi já existe.');
          }
          if (ErrorMessage.indexOf('renavam') > -1) {
            throw new BadRequestException(
              'Veículo com este renavam já existe.',
            );
          }
          break;
        default:
          console.log('Error : ' + e);
          throw new BadRequestException(`Erro ao cadastrar veículo: ${e}`);
      }
    }
  }

  findAll(query: string | undefined) {
    if (query) {
      let QueryNumerica = null;
      try {
        QueryNumerica = parseInt(query);
      } catch (e) {
        QueryNumerica = null;
      }

      return this.VeiculoRepository.find({
        where: [
          { placa: Like(`%${query}%`) },
          { marca: Like(`%${query}%`) },
          { modelo: Like(`%${query}%`) },
          { chassi: Like(`%${query}%`) },
          { renavam: Like(`%${query}%`) },
          QueryNumerica && { ano: QueryNumerica },
        ],
      });
    } else {
      return this.VeiculoRepository.find();
    }
  }

  findOne(id: number) {
    return this.VeiculoRepository.findOneBy({ id });
  }

  update(id: number, updateVeiculoDto: UpdateVeiculoDto) {
    return this.VeiculoRepository.update(id, updateVeiculoDto);
  }

  remove(id: number) {
    return this.VeiculoRepository.delete(id);
  }
}
