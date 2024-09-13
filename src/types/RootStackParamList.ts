import { PokemonData } from ".";

export type RootStackParamList = {
  Home: undefined;
  Details: { pokemon: PokemonData; };
};
