import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";

export interface Navigation {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<{ params: { pokemon: Pokemon } }, "params">;
}

export interface Pokemon {
  id: number;
  formattedId: string;
  name: string;
  url: string;
  image: string;
  types: PokemonType[] | [];
  stats: PokemonStat[] | [];
}

export interface PokemonType {
  name: string | "";
}

export interface PokemonStat {
  name: string;
  baseStat: number;
}
