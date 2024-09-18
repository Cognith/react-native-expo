import { Pokemon, PokemonStat, PokemonType } from "./types";

const pokemonTransformer = (pokemon: any) => {
  let pokemonTypes: PokemonType[] = [];
  pokemon.types.map((item: any) => {
    pokemonTypes.push({ name: item.type.name });
  });

  let pokemonStats: PokemonStat[] = [];
  pokemonStats = formattingStats(pokemon.stats);

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

const formattingStats = (stats: any) => {
  let newStats: PokemonStat[] = [];
  stats.map((item: any) => {
    if (item.stat.name === "hp") {
      newStats.push({
        baseStat: item.base_stat,
        name: "HP",
      });
    } else {
      let formattedName = item.stat.name.replace("-", " ");

      const words = formattedName.split(" ");
      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }

      newStats.push({
        baseStat: item.base_stat,
        name: words.join(" "),
      });
    }
  });

  return newStats;
};

export { pokemonTransformer };
