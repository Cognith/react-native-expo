export interface PokemonsDataModel {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDataLinkModel[];
}

export interface PokemonDataLinkModel {
  name: string;
  url: string;
}

export interface PokemonModel {
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSpriteModel[],
  stats: PokemonStatModel[],
  abilities: PokemonAbilityModel[],
  types: PokemonTypeModel[],
}

export interface PokemonSpriteModel {
  back_default: string,
  back_shiny: string,
  front_default: string,
  front_shiny: string,
}

export interface PokemonStatModel {
  base_stat: string;
  stat: {
    name: string;
  },
}

export interface PokemonAbilityModel {
  ability: {
    name: string;
  },
}

export interface PokemonTypeModel {
  type: {
    name: string;
  },
}
