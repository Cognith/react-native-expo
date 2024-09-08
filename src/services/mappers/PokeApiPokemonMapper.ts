import { PokemonData, PokemonDataMapper } from "../../types";
import { PokemonModel } from "../models";

export class PokeApiPokemonMapper implements PokemonDataMapper {
  map(data: PokemonModel): PokemonData {
    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      image: data.sprites.front_default,
      stats: data.stats.map(stat => ({
        title: stat.stat.name,
        value: stat.base_stat,
      })),
      abilities: data.abilities.map(ability => ability.ability.name),
      types: data.types.map(type => type.type.name),
    };
  }

}
