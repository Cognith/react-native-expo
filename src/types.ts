import { NavigationProp, ParamListBase } from "@react-navigation/native";

export interface Navigation {
  navigation: NavigationProp<ParamListBase>;
}

export interface Pokemon {
  id: number;
  formattedId: string;
  name: string;
  url: string;
  image: string;
  types: PokemonType[];
}

export interface PokemonType {
  name: string;
}
