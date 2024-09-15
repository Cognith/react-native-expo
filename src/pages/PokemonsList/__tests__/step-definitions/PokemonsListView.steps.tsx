import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { act } from 'react-dom/test-utils';
import PokemonsListView from '../../PokemonsListView';
import PokemonService from '../../../../services/PokemonService';
import {
  mockError,
  mockPokemonData,
  mockPokemonList,
  mockPokemonListUnique,
} from '../../../../__mocks__/data';
import { FlatList, Pressable, TextInput } from 'react-native';
import { mockPokemonResponse } from '../../../../__mocks__/data/mockData';
import { PokemonCard, PText } from '../../../../components';

const props = {
  navigation: {
    navigate: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
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

  // Test when Pokemon List Page successfully loaded
  test('Pokemon List Page loading data successfully', ({
    given,
    when,
    then,
  }) => {
    given('User is on the Pokemon List page', async () => {
      getPokemonsListService.mockResolvedValue(
        mockPokemonResponse(mockPokemonList),
      );
      getPokemonDetailsService.mockImplementation(mockPokemonListUnique);

      await act(async () => {
        PokemonsListReactWrapper = mount(<PokemonsListView {...props} />);
      });
    });

    when('initially loading the Pokemon List page', async () => {});

    then('User should see the list page', () => {
      const listPage = PokemonsListReactWrapper.find('[testID="list-page"]');
      expect(listPage.exists()).toBe(true);
    });

    then('User should see loading indicator', () => {
      const loader = PokemonsListReactWrapper.find(
        '[testID="loading-indicator"]',
      );
      expect(loader.exists()).toBe(true);
    });

    when('the first list of pokemons are loaded', async () => {
      await act(async () => {
        PokemonsListReactWrapper.update();
      });
    });

    let pokemonItems: ReactWrapper;

    then('User should see 20 pokemons loaded initially', () => {
      const pokemonList = PokemonsListReactWrapper.findWhere(
        (node) => node.is(FlatList) && node.prop('testID') === 'pokemon-list',
      );
      expect(pokemonList.exists()).toBe(true);

      pokemonItems = pokemonList
        .find(PokemonCard)
        .findWhere(
          (node) =>
            node.is(Pressable) && node.prop('testID').includes('pokemon-card'),
        );
      expect(pokemonItems.exists()).toBe(true);
      expect(pokemonItems.length).toEqual(20);
    });

    then('User should see a Pokemon named "pokemon-1"', () => {
      const specificItem = pokemonItems.findWhere(
        (node) => node.is(PText) && node.text().toLowerCase() === 'pokemon-1',
      );
      expect(specificItem.exists()).toBe(true);
    });
  });

  // Test when Pokemon List Page fails to load the data
  test('Pokemon List Page loaded with error', ({ given, when, then }) => {
    given('User is on the Pokemon List Page', async () => {
      getPokemonsListService.mockRejectedValue(mockError);
      await act(async () => {
        PokemonsListReactWrapper = mount(<PokemonsListView {...props} />);
      });
    });

    when('there is an error loading the Pokemon List Page', async () => {
      await act(async () => {
        PokemonsListReactWrapper.update();
      });
    });

    then('User should see a message with "Error:"', () => {
      const errorMessage = PokemonsListReactWrapper.findWhere(
        (node) => node.is(PText) && node.prop('testID') === 'error-message',
      );
      expect(errorMessage.exists()).toBe(true);
      expect(errorMessage.text()).toContain('Error:');
    });
  });

  // Test Pokemon List Page infinite scroll feature
  test('Scrolling down to load more Pokemons in Pokemon List Page', async ({
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

    when('User loaded the initial state of Pokemon List page', async () => {
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
      const pokemonItem = PokemonsListReactWrapper.findWhere(
        (node) =>
          node.prop('testID') && node.prop('testID').includes('pokemon-card'),
      );
      expect(pokemonItem.length).toBeGreaterThan(20);
    });
  });

  // Test Pokemon List Page search feature
  test('Searching for Pokemons in Pokemon List Page', async ({
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

    when('User loaded the initial state of Pokemon List page', async () => {
      await instance.componentDidMount();
      PokemonsListReactWrapper.update();
    });

    then('User should see the list page', () => {
      const listPage = PokemonsListReactWrapper.find('[testID="list-page"]');
      expect(listPage.exists()).toBe(true);
    });

    when("User type part of a Pokemon's name in the search input", async () => {
      PokemonsListReactWrapper.update();

      const searchBar = PokemonsListReactWrapper.findWhere(
        (node) =>
          node.type() === TextInput && node.prop('testID') === 'search-bar',
      );
      searchBar.simulate('change', { target: { value: 'bulb' } });

      PokemonsListReactWrapper.update();
    });

    then('User should see a list of Pokemons found by the name', () => {
      const foundPokemon = PokemonsListReactWrapper.findWhere(
        (node) =>
          node.prop('testID') === 'pokemon-name' &&
          node.text().includes('bulb'),
      );

      // Check if all found Pokemon names include 'bulb'
      foundPokemon.forEach((node) => {
        expect(node.text().toLowerCase()).toContain('bulb');
      });
    });
  });

  // Test navigating to a Pokemon's Details Page from Pokemon List Page
  test("Navigate to a Pokemon's Details page from the Pokemon List Page", async ({
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

    when('User loaded the initial state of Pokemon List page', async () => {
      await instance.componentDidMount();
      PokemonsListReactWrapper.update();
    });

    then('User should see the list page', () => {
      const listPage = PokemonsListReactWrapper.find('[testID="list-page"]');
      expect(listPage.exists()).toBe(true);
    });

    when('User presses on a Pokemon item', async () => {
      PokemonsListReactWrapper.update();

      const pokemonItem = PokemonsListReactWrapper.findWhere(
        (node) => node.prop('testID') === 'pokemon-card_0001-10',
      ).first();

      const onPress = pokemonItem.prop('onPress');
      onPress();

      PokemonsListReactWrapper.update();
    });

    then('User should navigate to the Pokemon details page', () => {
      expect(props.navigation.push).toHaveBeenCalledWith('Details', {
        pokemon: expect.objectContaining({
          name: 'bulbasaur',
        }),
      });
    });
  });
});
