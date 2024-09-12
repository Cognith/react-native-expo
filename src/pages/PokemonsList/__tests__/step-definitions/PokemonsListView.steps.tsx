import { shallow, ShallowWrapper } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import PokemonsListView from '../../PokemonsListView';
import PokemonService from '../../../../services/PokemonService';
import {
  mockError,
  mockPokemonData,
  mockPokemonList,
} from '../../../../__mocks__/data';
import { FlatList } from 'react-native';
import { PokemonData } from '../../../../types';

const props = {
  navigation: {
    navigate: jest.fn(),
  } as any,
  route: {
    params: {},
  } as any,
};

const feature = loadFeature(
  './src/pages/PokemonsList/__tests__/features/PokemonsListView.feature',
);

defineFeature(feature, (test) => {
  const getPokemonsListService = jest.spyOn(PokemonService, 'getPokemonsList');
  const getPokemonDetailsService = jest.spyOn(
    PokemonService,
    'getPokemonDetails',
  );

  let PokemonsListViewWrapper: ShallowWrapper;
  let instance: PokemonsListView;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('User navigating to Pokemon List Page', ({ given, when, then }) => {
    given('User on the Pokémon List page', () => {
      getPokemonsListService.mockResolvedValue({
        count: 20,
        results: mockPokemonList,
        next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
        previous: null,
      });
      getPokemonDetailsService.mockResolvedValue(mockPokemonData);

      PokemonsListViewWrapper = shallow(<PokemonsListView {...props} />);
      instance = PokemonsListViewWrapper.instance() as PokemonsListView;
    });

    when('User fully loaded the Pokémon List page', async () => {});

    then('User should see list page', () => {
      const listPage = PokemonsListViewWrapper.find('[testID="list-page"]');
      expect(listPage.exists()).toBe(true);
    });

    then('User should see loading', () => {
      const loader = PokemonsListViewWrapper.find(
        '[testID="loading-indicator"]',
      );
      expect(loader.exists()).toBe(true);
    });

    when('User is waiting for pokemons to load', async () => {
      PokemonsListViewWrapper.update();
    });

    then('User will see 20 pokemons loaded initially', () => {
      const pokemonList = PokemonsListViewWrapper.findWhere(
        (node) =>
          node.type() === FlatList && node.prop('testID') === 'pokemon-list',
      );

      // Access the data prop passed to FlatList
      const pokemonItemData = pokemonList.prop('data') as PokemonData[];
      expect(pokemonItemData.length).toEqual(20);
    });

    then('User should see a Pokemon named "Bulbasaur"', () => {
      const pokemonList = PokemonsListViewWrapper.findWhere(
        (node) =>
          node.type() === FlatList && node.prop('testID') === 'pokemon-list',
      );
      const pokemonItemData = pokemonList.prop('data') as PokemonData[];
      const hasBulbasaur = pokemonItemData.some(
        (pokemon) => pokemon.name === 'Bulbasaur'.toLowerCase(),
      );
      expect(hasBulbasaur).toBe(true);
    });
  });

  test('User navigating to Pokemon Home Page with error', ({
    given,
    when,
    then,
  }) => {
    given('User is on the Pokemon List Page', () => {
      getPokemonsListService.mockRejectedValue(mockError);
      PokemonsListViewWrapper = shallow(<PokemonsListView {...props} />);
    });

    when('there is an error loading the Pokemon List Page', async () => {
      await instance.fetchPokemons();
      PokemonsListViewWrapper.update();
    });

    then('User should see a message "Error:"', () => {
      const errorMessage = PokemonsListViewWrapper.find(
        '[testID="error-message"]',
      );
      expect(errorMessage.dive().text()).toContain('Error:');
    });
  });
});
