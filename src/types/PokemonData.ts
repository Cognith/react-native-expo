import { KeyValue } from ".";

export interface PokemonData {
  id: string;
  name: string;
  height: number;
  weight: number;
  image: string;
  stats: KeyValue[];
  abilities: string[];
  types: string[];
}
