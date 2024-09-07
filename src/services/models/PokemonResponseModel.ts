export interface PokemonsResponseModel {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDataLinkModel[];
}

interface PokemonDataLinkModel {
  name: string;
  url: string;
}
