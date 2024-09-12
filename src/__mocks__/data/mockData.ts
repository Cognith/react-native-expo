import { PokemonData } from "../../types";

export const mockPokemonData: PokemonData = {
  id: '0001',
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  image:
    'https://',
  stats: [
    {
      key: 'hp',
      value: 45,
    },
  ],
  abilities: ['overgrow', 'chlorophyll'],
  types: ['grass', 'poison'],
};

export const mockPokemonList = Array.from({ length: 20 }, (_, index) => ({
  name: `pokemon-${index + 1}`,
  url: `https://`,
}));

export const mockError = {
  message: 'Request failed with status code 500',
  response: {
    status: 500,
    statusText: 'Internal Server Error',
    data: {
      message: 'Failed to fetch Pokemon list',
    },
  },
};
