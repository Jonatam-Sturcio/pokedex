import { TipoPokemon } from './tipo-pokemon';

export interface Pokemon {
  nome: string;
  urlSprite: string;
  tipos: TipoPokemon[];
}
