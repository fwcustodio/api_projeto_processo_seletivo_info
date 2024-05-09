import { IsNotEmpty, Length, Min, Max, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateVeiculoDto {
  @IsNotEmpty({ message: 'A Placa não pode ser vazia' })
  @Length(7, 7, { message: 'A Placa precisa ter 7 letras ou números' })
  @Transform(({ value }) => value.toUpperCase())
  placa: string;

  chassi: string;

  renavam: string;

  @IsNotEmpty({ message: 'O Modelo não pode ser vazio' })
  modelo: string;

  @IsNotEmpty({ message: 'A Marca não pode ser vazia' })
  marca: string;

  @IsNotEmpty({ message: 'O Ano não pode ser vazio' })
  @IsInt({ message: 'Insira um ano válido' })
  @Min(1900, { message: 'Insira um ano válido' })
  @Max(new Date().getFullYear(), {
    message: 'O Ano informado está além da data atual',
  })
  @Transform(({ value }) => parseInt(value))
  ano: number;
}
