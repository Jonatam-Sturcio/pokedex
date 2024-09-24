import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokemonApiService } from './services/pokemon-api.service';
import { Pokemon } from './models/pokemon';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public pokemons: Pokemon[];

  constructor(private PokeApiService: PokemonApiService) {
    this.pokemons = [];
  }

  ngOnInit(): void {
    this.PokeApiService.selecionarTodos().subscribe((res) => {
      const arrayResultados = res.results as any[];

      this.pokemons = arrayResultados.map((obj) => {
        return {
          nome: this.converterParaTitleCase(obj.name),
        };
      });
    });
  }

  private converterParaTitleCase(texto: string): string {
    if (texto.length < 1) return texto;

    return (
      texto[0].toUpperCase() + texto.substring(1, texto.length).toLowerCase()
    );
  }
}
