import { Component, OnInit } from '@angular/core';
import { Veiculo } from '../../models/veiculo.model';
import { VeiculoService } from '../../services/veiculo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-veiculos-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './veiculos-list.component.html',
  styleUrl: './veiculos-list.component.scss',
})
export class VeiculosListComponent implements OnInit {
  veiculos?: Veiculo[];
  currentVeiculo: Veiculo = {};
  currentIndex = -1;
  query = '';

  constructor(private veiculoService: VeiculoService) {}

  ngOnInit(): void {
    this.retrieveVeiculos();
  }

  retrieveVeiculos(): void {
    this.veiculoService.getAll().subscribe({
      next: (data) => {
        this.veiculos = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveVeiculos();
    this.currentVeiculo = {};
    this.currentIndex = -1;
  }

  setActiveVeiculo(veiculo: Veiculo, index: number): void {
    this.currentVeiculo = veiculo;
    this.currentIndex = index;
  }

  search(): void {
    this.currentVeiculo = {};
    this.currentIndex = -1;

    if (!this.query || this.query == '') {
      this.retrieveVeiculos();
      return;
    }

    this.veiculoService.findSearch(this.query).subscribe({
      next: (data) => {
        this.veiculos = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  deleteVeiculo(Id: any): void {
    if (confirm('Are you sure to delete')) {
      this.veiculoService.delete(Id).subscribe({
        next: (res) => {
          alert('Veículo excluido com sucesso!');
          console.log(res);

          this.refreshList();
        },
        error: (e) => {
          let Error = e.error;
          let MSG = Error.message;
          alert('Erro ao excluir veículo! ' + JSON.stringify(MSG));
        },
      });
    }
  }
}
