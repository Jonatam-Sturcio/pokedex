import { TipoPokemon } from '../models/tipo-pokemon';
import { converterParaTitleCase } from './converter-para-title-case';

export function mapearTipoPokemon(obj: any): TipoPokemon {
  return { nome: converterParaTitleCase(obj.type.name) };
}
