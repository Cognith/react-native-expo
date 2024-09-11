import { PokemonData } from "../../types";

const mockPokemonData: PokemonData = {
  id: '0001',
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  stats: [
    {
      key: 'hp',
      value: 45,
    },
    {
      key: 'attack',
      value: 49,
    },
    {
      key: 'defense',
      value: 49,
    },
    {
      key: 'special-attack',
      value: 65,
    },
    {
      key: 'special-defense',
      value: 65,
    },
    {
      key: 'speed',
      value: 45,
    },
  ],
  abilities: ['overgrow', 'chlorophyll'],
  types: ['grass', 'poison'],
};

export default mockPokemonData;
