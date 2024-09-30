import { TipoPokemon } from './tipo-pokemon';

export interface Pokemon {
  id: number;
  nome: string;
  urlSprite: string;
  tipos: TipoPokemon[];
  favorito: boolean;
}
