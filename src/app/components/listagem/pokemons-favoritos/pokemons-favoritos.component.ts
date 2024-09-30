import { NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Pokemon } from '../../../models/pokemon';

@Component({
  selector: 'app-pokemons-favoritos',
  standalone: true,
  imports: [NgIf, NgForOf, RouterLink],
  templateUrl: './pokemons-favoritos.component.html',
  styleUrl: './pokemons-favoritos.component.scss',
})
export class PokemonsFavoritosComponent {
  @Input({ required: true }) pokemonsFavoritos!: Pokemon[];
}
