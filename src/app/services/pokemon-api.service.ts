import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private readonly url = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  public selecionarTodos(offset: number = 0): Observable<any> {
    const urlCompleto = `${this.url}?offset=${offset}`;
    return this.http.get(urlCompleto);
  }

  public selecionarDetalhesPorUrl(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
  public selecionarDetalhesPorId(id: number) {
    const urlCompleto = `${this.url}/${id}`;

    return this.http.get<any>(urlCompleto);
  }
}
