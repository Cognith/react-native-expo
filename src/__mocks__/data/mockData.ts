import { PokemonDataLinkModel, PokemonsResponseModel } from "../../services/models";
import { PokemonData } from "../../types";

export const mockPokemonResponse = (results: PokemonDataLinkModel[]): PokemonsResponseModel => ({
  count: 20,
  results: results,
  next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
  previous: null,
});

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
  url: `https://pokeapi.co/api/v2/pokemon/${index + 1}/`,
}));

export const mockPokemonListUnique = (url: string, withError = false): Promise<PokemonData> => {
  const match = url.match(/\/(\d+)\//); // Extract ID from the URL
  const id = match ? match[1] : '1'; // Default to '1'

  if (withError) {
    // Simulate a failure for a specific ID, e.g., ID '10'
    if (id === '10') {
      return Promise.reject(new Error('Failed to fetch data'));
    }
  }

  return Promise.resolve<PokemonData>({
    id: parseInt(id, 10).toString(),
    name: `pokemon-${id}`,
    height: 7,
    weight: 70,
    image: `https://example.com/pokemon/${id}.png`,
    stats: [
      { key: 'stat1', value: 25 },
      { key: 'stat2', value: 45 },
    ],
    abilities: ['ability1', 'ability2'],
    types: ['type1', 'type2'],
  });
};

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
