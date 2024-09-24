import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokemonApiService } from './services/pokemon-api.service';
import { Pokemon } from './models/pokemon';
import { NgClass, NgForOf } from '@angular/common';
import { converterParaTitleCase } from './util/converter-para-title-case';
import { TipoPokemon } from './models/tipo-pokemon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, NgForOf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public pokemons: Pokemon[];

  public coresBackgroundTipo: any = {
    Normal: 'fundo-tipo-normal',
    Fire: 'fundo-tipo-fogo',
    Water: 'fundo-tipo-agua',
    Electric: 'fundo-tipo-eletrico',
    Ice: 'fundo-tipo-gelo',
    Grass: 'fundo-tipo-grama',
    Bug: 'fundo-tipo-inseto',
    Poison: 'fundo-tipo-veneno',
    Flying: 'fundo-tipo-voador',
    Ground: 'fundo-tipo-terra',
    Rock: 'fundo-tipo-pedra',
    Fighting: 'fundo-tipo-lutador',
    Psychic: 'fundo-tipo-psiquico',
    Ghost: 'fundo-tipo-fantasma',
    Dark: 'fundo-tipo-sombrio',
    Fairy: 'fundo-tipo-fada',
    Steel: 'fundo-tipo-aco',
  };

  constructor(private PokeApiService: PokemonApiService) {
    this.pokemons = [];
  }

  ngOnInit(): void {
    this.PokeApiService.selecionarTodos().subscribe((res) => {
      const arrayResultados = res.results as any[];

      for (let resultado of arrayResultados) {
        this.PokeApiService.selecionarDetalhesPorUrl(resultado.url).subscribe(
          (objDetalhes: any) => {
            const pokemon = this.mapearPokemon(objDetalhes);

            this.pokemons.push(pokemon);
          }
        );
      }
    });
  }
  private mapearPokemon(obj: any): Pokemon {
    return {
      nome: converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.other['official-artwork'].front_default,
      tipos: obj.types.map(this.mapearTipoPokemon),
    };
  }

  private mapearTipoPokemon(obj: any): TipoPokemon {
    return { nome: converterParaTitleCase(obj.type.name) };
  }
}
