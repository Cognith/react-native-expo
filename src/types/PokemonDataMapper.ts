import { PokemonData } from ".";

export interface PokemonDataMapper {
  map(data: any): PokemonData;
}
