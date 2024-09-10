import { Pokemon, PokemonStat, PokemonType } from "./types";

export const pokemonTransformer = (pokemon: any) => {
  let pokemonTypes: PokemonType[] = [];
  pokemon.types.map((item: any) => {
    pokemonTypes.push({ name: item.type.name });
  });

  let pokemonStats: PokemonStat[] = [];
  pokemon.stats.map((item: any) => {
    pokemonStats.push({
      name: item.stat.name,
      baseStat: item.base_stat,
    });
  });

  const newPokemon: Pokemon = {
    id: pokemon.id,
    formattedId: pokemon.id.toString().padStart(4, "0"),
    name: pokemon.name,
    url: pokemon.species.url,
    image: pokemon.sprites.front_shiny,
    types: pokemonTypes,
    stats: pokemonStats,
  };

  return newPokemon;
};
