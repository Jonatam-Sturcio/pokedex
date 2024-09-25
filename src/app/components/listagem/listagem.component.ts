import { NgClass, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { converterParaTitleCase } from '../../util/converter-para-title-case';
import { TipoPokemon } from '../../models/tipo-pokemon';
import { RouterLink } from '@angular/router';
import { mapearTipoPokemon } from '../../util/mapear-tipo-pokemon';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [NgForOf, NgClass, RouterLink],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss',
})
export class ListagemComponent implements OnInit {
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

      let i = 0;
      for (let resultado of arrayResultados) {
        this.PokeApiService.selecionarDetalhesPorUrl(resultado.url).subscribe(
          (objDetalhes: any) => {
            const pokemon = this.mapearPokemon(objDetalhes);

            this.pokemons.push(pokemon);

            if (i == arrayResultados.length) this.pokemons.sort((p) => p.id);
          }
        );
      }
    });
  }
  private mapearPokemon(obj: any): Pokemon {
    return {
      id: obj.id,
      nome: converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.other['official-artwork'].front_default,
      tipos: obj.types.map(mapearTipoPokemon),
    };
  }
}
