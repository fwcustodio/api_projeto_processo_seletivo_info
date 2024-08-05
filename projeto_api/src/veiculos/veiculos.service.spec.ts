import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VeiculosService } from './veiculos.service';
import { Veiculo } from './entities/veiculo.entity';
import { Repository } from 'typeorm';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

describe('VeiculosService', () => {
  let service: VeiculosService;
  let repository: Repository<Veiculo>;

  const mockVeiculoRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VeiculosService,
        {
          provide: getRepositoryToken(Veiculo),
          useValue: mockVeiculoRepository,
        },
      ],
    }).compile();

    service = module.get<VeiculosService>(VeiculosService);
    repository = module.get<Repository<Veiculo>>(getRepositoryToken(Veiculo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a vehicle', async () => {
    const createVeiculoDto: CreateVeiculoDto = {
      placa: 'ABC1234',
      chassi: '123456789',
      renavam: '987654321',
      modelo: 'Modelo Teste',
      marca: 'Marca Teste',
      ano: 2020,
    };

    mockVeiculoRepository.save.mockResolvedValue(createVeiculoDto);

    const result = await service.create(createVeiculoDto);
    expect(result).toEqual(createVeiculoDto);
    expect(mockVeiculoRepository.save).toHaveBeenCalledWith(createVeiculoDto);
  });

  it('should find all vehicles', async () => {
    const veiculos = [
      {
        placa: 'ABC1234',
        chassi: '123456789',
        renavam: '987654321',
        modelo: 'Modelo Teste',
        marca: 'Marca Teste',
        ano: 2020,
      },
    ];
    mockVeiculoRepository.find.mockResolvedValue(veiculos);

    const result = await service.findAll(undefined);
    expect(result).toEqual(veiculos);
    expect(mockVeiculoRepository.find).toHaveBeenCalled();
  });

  it('should find a vehicle by id', async () => {
    const veiculo = {
      placa: 'ABC1234',
      chassi: '123456789',
      renavam: '987654321',
      modelo: 'Modelo Teste',
      marca: 'Marca Teste',
      ano: 2020,
    };
    mockVeiculoRepository.findOneBy.mockResolvedValue(veiculo);

    const result = await service.findOne(1);
    expect(result).toEqual(veiculo);
    expect(mockVeiculoRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should update a vehicle', async () => {
    const updateVeiculoDto: UpdateVeiculoDto = { modelo: 'Modelo Atualizado' };
    mockVeiculoRepository.update.mockResolvedValue({ affected: 1 });

    const result = await service.update(1, updateVeiculoDto);
    expect(result).toEqual({ affected: 1 });
    expect(mockVeiculoRepository.update).toHaveBeenCalledWith(
      1,
      updateVeiculoDto,
    );
  });

  it('should delete a vehicle', async () => {
    mockVeiculoRepository.delete.mockResolvedValue({ affected: 1 });

    const result = await service.remove(1);
    expect(result).toEqual({ affected: 1 });
    expect(mockVeiculoRepository.delete).toHaveBeenCalledWith(1);
  });
});
