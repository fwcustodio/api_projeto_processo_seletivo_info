import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Veiculo {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true, type: 'varchar' })
  placa: string;

  @Column({ unique: true, type: 'varchar' })
  chassi: string;

  @Column({ unique: true, type: 'varchar' })
  renavam: string;

  @Column({ type: 'varchar' })
  modelo: string;

  @Column({ type: 'varchar' })
  marca: string;

  @Column({ type: 'int' })
  ano: number;
}
