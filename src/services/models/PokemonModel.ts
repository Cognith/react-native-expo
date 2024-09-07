export interface PokemonModel {
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSpriteModel,
  stats: PokemonStatModel[],
  abilities: PokemonAbilityModel[],
  types: PokemonTypeModel[],
}

interface PokemonSpriteModel {
  back_default: string,
  back_shiny: string,
  front_default: string,
  front_shiny: string,
}

interface PokemonStatModel {
  base_stat: number;
  stat: {
    name: string;
  },
}

interface PokemonAbilityModel {
  ability: {
    name: string;
  },
}

interface PokemonTypeModel {
  type: {
    name: string;
  },
}
