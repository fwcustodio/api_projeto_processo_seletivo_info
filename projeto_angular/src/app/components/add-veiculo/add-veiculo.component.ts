import { Component } from '@angular/core';
import { Veiculo } from '../../models/veiculo.model';
import { VeiculoService } from '../../services/veiculo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-veiculo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-veiculo.component.html',
  styleUrl: './add-veiculo.component.scss',
})
export class AddVeiculoComponent {
  veiculo: Veiculo = {
    placa: '',
    chassi: '',
    renavam: '',
    modelo: '',
    marca: '',
    ano: 2000,
  };
  submitted = false;

  constructor(private veiculoService: VeiculoService) {}

  saveVeiculo(): void {
    const data = {
      placa: this.veiculo.placa,
      marca: this.veiculo.marca,
      modelo: this.veiculo.modelo,
      chassi: this.veiculo.chassi,
      renavam: this.veiculo.renavam,
      ano: this.veiculo.ano,
    };

    this.veiculoService.create(data).subscribe({
      next: (res) => {
        alert('Veículo cadastrado com sucesso!');
        console.log(res);
        this.submitted = true;
      },
      error: (e) => {
        let Error = e.error;
        let MSG = Error.message;
        alert('Erro ao cadastrar veículo! ' + JSON.stringify(MSG));
      },
    });
  }

  newVeiculo(): void {
    this.submitted = false;
    this.veiculo = {
      placa: '',
      marca: '',
      modelo: '',
      chassi: '',
      renavam: '',
      ano: 2000,
    };
  }
}
