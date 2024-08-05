import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosController } from './veiculos.controller';
import { VeiculosService } from './veiculos.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

describe('VeiculosController', () => {
  let controller: VeiculosController;
  let service: VeiculosService;

  const mockVeiculosService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeiculosController],
      providers: [
        {
          provide: VeiculosService,
          useValue: mockVeiculosService,
        },
      ],
    }).compile();

    controller = module.get<VeiculosController>(VeiculosController);
    service = module.get<VeiculosService>(VeiculosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

    mockVeiculosService.create.mockResolvedValue(createVeiculoDto);

    const result = await controller.create(createVeiculoDto);
    expect(result).toEqual(createVeiculoDto);
    expect(mockVeiculosService.create).toHaveBeenCalledWith(createVeiculoDto);
  });

  it('should return all vehicles', async () => {
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
    mockVeiculosService.findAll.mockResolvedValue(veiculos);

    const result = await controller.findAll();
    expect(result).toEqual(veiculos);
    expect(mockVeiculosService.findAll).toHaveBeenCalledWith(null);
  });

  it('should return a vehicle by id', async () => {
    const veiculo = {
      placa: 'ABC1234',
      chassi: '123456789',
      renavam: '987654321',
      modelo: 'Modelo Teste',
      marca: 'Marca Teste',
      ano: 2020,
    };
    mockVeiculosService.findOne.mockResolvedValue(veiculo);

    const result = await controller.findOne('1');
    expect(result).toEqual(veiculo);
    expect(mockVeiculosService.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a vehicle', async () => {
    const updateVeiculoDto: UpdateVeiculoDto = { modelo: 'Modelo Atualizado' };
    const updatedVeiculo = { id: 1, ...updateVeiculoDto };
    mockVeiculosService.update.mockResolvedValue(updatedVeiculo);

    const result = await controller.update('1', updateVeiculoDto);
    expect(result).toEqual(updatedVeiculo);
    expect(mockVeiculosService.update).toHaveBeenCalledWith(
      1,
      updateVeiculoDto,
    );
  });

  it('should delete a vehicle', async () => {
    mockVeiculosService.remove.mockResolvedValue({ affected: 1 });

    const result = await controller.remove('1');
    expect(result).toEqual({ affected: 1 });
    expect(mockVeiculosService.remove).toHaveBeenCalledWith(1);
  });

  it('should search vehicles by query', async () => {
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
    mockVeiculosService.findAll.mockResolvedValue(veiculos);

    const result = await controller.findAllSearch('ABC');
    expect(result).toEqual(veiculos);
    expect(mockVeiculosService.findAll).toHaveBeenCalledWith('ABC');
  });
});
