import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
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
import { PokemonsListState } from '../../PokemonsListController';
import { isLoading } from 'expo-font';

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

  let PokemonsListShallowWrapper: ShallowWrapper;
  let PokemonsListReactWrapper: ReactWrapper;
  let instance: PokemonsListView;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('User navigating to Pokemon List Page', ({ given, when, then }) => {
    given('User is on the Pokémon List page', () => {
      getPokemonsListService.mockResolvedValue({
        count: 20,
        results: mockPokemonList,
        next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
        previous: null,
      });
      getPokemonDetailsService.mockResolvedValue(mockPokemonData);

      PokemonsListShallowWrapper = shallow(<PokemonsListView {...props} />);
      instance = PokemonsListShallowWrapper.instance() as PokemonsListView;
    });

    when('User loaded the initial state of Pokémon List page', async () => {});

    then('User should see the list page', () => {
      const listPage = PokemonsListShallowWrapper.find('[testID="list-page"]');
      expect(listPage.exists()).toBe(true);
    });

    then('User should see loading indicator', () => {
      const loader = PokemonsListShallowWrapper.find(
        '[testID="loading-indicator"]',
      );
      expect(loader.exists()).toBe(true);
    });

    when('User is waiting for pokemons to load', async () => {
      PokemonsListShallowWrapper.update();
    });

    then('User will see 20 pokemons loaded initially', () => {
      const pokemonList = PokemonsListShallowWrapper.findWhere(
        (node) =>
          node.type() === FlatList && node.prop('testID') === 'pokemon-list',
      );

      // Access the data prop passed to FlatList
      const pokemonItemData = pokemonList.prop('data') as PokemonData[];
      expect(pokemonItemData.length).toEqual(20);
    });

    then('User should see a Pokemon named "Bulbasaur"', () => {
      const pokemonList = PokemonsListShallowWrapper.findWhere(
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

  test('User navigating to Pokemon List Page with error', ({
    given,
    when,
    then,
  }) => {
    given('User is on the Pokemon List Page', () => {
      getPokemonsListService.mockRejectedValue(mockError);
      PokemonsListShallowWrapper = shallow(<PokemonsListView {...props} />);
      instance = PokemonsListShallowWrapper.instance() as PokemonsListView;
    });

    when('there is an error loading the Pokemon List Page', async () => {
      await instance.fetchPokemons();
      PokemonsListShallowWrapper.update();
    });

    then('User should see a message "Error:"', () => {
      const errorMessage = PokemonsListShallowWrapper.find(
        '[testID="error-message"]',
      );
      expect(errorMessage.dive().text()).toContain('Error:');
    });
  });

  test('User navigating to Pokemon List Page and scroll down to load more Pokemons', async ({
    given,
    when,
    then,
  }) => {
    given('User is on the Pokemon List Page', async () => {
      getPokemonsListService.mockResolvedValue({
        count: 20,
        results: mockPokemonList,
        next: 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0',
        previous: null,
      });
      getPokemonDetailsService.mockResolvedValue(mockPokemonData);

      PokemonsListReactWrapper = mount(<PokemonsListView {...props} />);
      instance = PokemonsListReactWrapper.instance() as PokemonsListView;
    });

    when('User loaded the initial state of Pokémon List page', async () => {
      await instance.componentDidMount();
      PokemonsListReactWrapper.update();
    });

    then('User should see the list page', () => {
      const listPage = PokemonsListReactWrapper.find('[testID="list-page"]');
      expect(listPage.exists()).toBe(true);
    });

    when(
      'User sees initial pokemons loaded and scroll down quickly to the end of the list',
      async () => {
        PokemonsListReactWrapper.update();

        const pokemonList = PokemonsListReactWrapper.findWhere(
          (node) =>
            node.type() === FlatList && node.prop('testID') === 'pokemon-list',
        );
        await pokemonList.prop('onEndReached')();

        PokemonsListReactWrapper.update();
      },
    );

    then('User should see a loading indicator at the end of the list', () => {
      const footerLoader = PokemonsListReactWrapper.find(
        '[testID="load-more-indicator"]',
      );
      expect(footerLoader.exists()).toBe(true);
    });

    when('User is waiting for more pokemons to load', async () => {
      PokemonsListReactWrapper.update();
    });

    then('User should see more Pokemons loaded', () => {
      const pokemonItem = PokemonsListReactWrapper.find(
        '[testID="pokemon-item"]',
      );
      expect(pokemonItem.length).toBeGreaterThan(20);
    });
  });
});
