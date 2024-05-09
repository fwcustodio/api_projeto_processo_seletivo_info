import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculosService } from './veiculos.service';
import { VeiculosController } from './veiculos.controller';
import { Veiculo } from './entities/veiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Veiculo])],
  controllers: [VeiculosController],
  providers: [VeiculosService],
})
export class VeiculosModule {}
