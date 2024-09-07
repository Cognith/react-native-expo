export interface PokemonData {
  name: string;
  height: number;
  weight: number;
  image: string;
  stats: {
    title: string,
    value: number,
  }[];
  abilities: string[];
  types: string[];
}
