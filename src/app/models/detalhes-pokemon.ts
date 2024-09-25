import { TipoPokemon } from './tipo-pokemon';

export interface DetalhesPokemon {
  id: number;
  nome: string;
  sprites: string[];
  tipos: TipoPokemon[];
  altura: number;
  peso: number;
}
