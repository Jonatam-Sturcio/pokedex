import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { converterParaTitleCase } from '../../util/converter-para-title-case';
import { RouterLink } from '@angular/router';
import { mapearTipoPokemon } from '../../util/mapear-tipo-pokemon';
import { CardPokemonComponent } from './card-pokemon/card-pokemon.component';
import { BuscaComponent } from '../busca/busca.component';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    RouterLink,
    CardPokemonComponent,
    BuscaComponent,
    NgIf,
  ],
  templateUrl: './listagem.component.html',
})
export class ListagemComponent implements OnInit {
  public pokemons: Pokemon[];
  public pokemonsBackup: Pokemon[];
  private offsetPaginacao: number;
  public buscaRealizada: boolean = false;

  constructor(private PokeApiService: PokemonApiService) {
    this.pokemons = [];
    this.pokemonsBackup = [];
    this.offsetPaginacao = 0;
  }

  public ngOnInit(): void {
    this.obterPokemons();
  }

  public buscarMaisResultados(): void {
    this.offsetPaginacao += 20;

    this.obterPokemons();
  }

  public filtarPokemons(textoFiltro: string): void {
    this.buscaRealizada = true;

    this.pokemons = this.pokemons.filter((p) => {
      return p.nome.toLowerCase().includes(textoFiltro);
    });
  }

  private obterPokemons() {
    this.PokeApiService.selecionarTodos(this.offsetPaginacao).subscribe(
      (res) => {
        const arrayResultados = res.results as any[];
        const requests = arrayResultados.map((resultado) =>
          this.PokeApiService.selecionarDetalhesPorUrl(resultado.url)
        );
        if (this.pokemons.length > 1)
          forkJoin(requests).subscribe((detailedPokemons: any[]) => {
            this.pokemonsBackup = detailedPokemons.map((objDetalhes) =>
              this.mapearPokemon(objDetalhes)
            );
          });
        else
          forkJoin(requests).subscribe((detailedPokemons: any[]) => {
            this.pokemons = detailedPokemons.map((objDetalhes) =>
              this.mapearPokemon(objDetalhes)
            );
          });
        this.pokemons.sort((p) => p.id);
      }
    );
    this.pokemons.push(...this.pokemonsBackup);
  }

  public limparFiltro() {
    this.buscaRealizada = false;

    this.pokemons = [];
    this.obterPokemons();
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
