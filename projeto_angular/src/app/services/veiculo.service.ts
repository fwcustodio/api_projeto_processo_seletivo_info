import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo } from '../models/veiculo.model';

const baseUrl = 'http://localhost:3000/v1/veiculos';
const TOKEN_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY'; // Token secreto

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(baseUrl, {
      headers: { token: TOKEN_SECRET },
    });
  }

  get(id: any): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${baseUrl}/${id}`, {
      headers: { token: TOKEN_SECRET },
    });
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data, {
      headers: { token: TOKEN_SECRET },
    });
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data, {
      headers: { token: TOKEN_SECRET },
    });
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, {
      headers: { token: TOKEN_SECRET },
    });
  }

  findSearch(query: any): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${baseUrl}/search/${query}`, {
      headers: { token: TOKEN_SECRET },
    });
  }
}
