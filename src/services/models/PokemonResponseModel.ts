export interface PokemonsResponseModel {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDataLinkModel[];
}

export interface PokemonDataLinkModel {
  name: string;
  url: string;
}
