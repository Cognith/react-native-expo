import { mount, ReactWrapper, ShallowWrapper } from 'enzyme';
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
import { PokemonsListState } from '../../PokemonsListController';

const props = {
  navigation: {
    navigate: jest.fn(),
    push: jest.fn(),
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

  let PokemonsListReactWrapper: ReactWrapper;
  let instance: PokemonsListView;
  let state: PokemonsListState;

  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  /**
   * Test when Pokemon List Page successfully loaded
   */
  test('Pokemon List Page loading data successfully', ({
    given,
    when,
    then,
  }) => {
    given('User is on the Pokemon List page', async () => {
      getPokemonsListService.mockResolvedValue(
        mockPokemonResponse(mockPokemonList(20), 20),
      );
      getPokemonDetailsService.mockImplementation(mockPokemonListUnique);

      PokemonsListReactWrapper = mount(<PokemonsListView {...props} />);
    });

    when('initially loading the Pokemon List page', async () => {});

    then('User should see the list page screen', () => {
      const listPage = PokemonsListReactWrapper.find('[testID="list-page"]');
      expect(listPage.exists()).toBe(true);
    });

    then('User should see the loading indicator', () => {
      const loader = PokemonsListReactWrapper.find(
        '[testID="loading-indicator"]',
      );
      expect(loader.exists()).toBe(true);
    });

    when('the first list of pokemons are loaded', async () => {
      PokemonsListReactWrapper.update();
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

  /**
   * Test when Pokemon List Page fails to load the data with error
   */
  test('Pokemon List Page loaded with known error', ({ given, when, then }) => {
    given('User is on the Pokemon List Page', async () => {
      getPokemonsListService.mockRejectedValue(new Error('Some known error'));
      PokemonsListReactWrapper = mount(<PokemonsListView {...props} />);
    });

    let errorMessage: ReactWrapper;

    when('there is an error loading the Pokemon List Page', async () => {
      PokemonsListReactWrapper.update();
    });

    then('User should see a message with "Error:"', () => {
      errorMessage = PokemonsListReactWrapper.findWhere(
        (node) => node.is(PText) && node.prop('testID') === 'error-message',
      );
      expect(errorMessage.exists()).toBe(true);
      expect(errorMessage.text()).toContain('Error:');
    });

    then('User should see "Some known error" message for a known error', () => {
      expect(errorMessage.text()).toContain('Some known error');
    });
  });

  /**
   * Test when Pokemon List Page fails to load the data with unknown error
   */
  test('Pokemon List Page loaded with unknown error', ({
    given,
    when,
    then,
  }) => {
    given('User is on the Pokemon List Page', async () => {
      getPokemonsListService.mockRejectedValue(mockError);
      PokemonsListReactWrapper = mount(<PokemonsListView {...props} />);
    });

    let errorMessage: ReactWrapper;

    when(
      'there is an unknown error loading the Pokemon List Page',
      async () => {
        PokemonsListReactWrapper.update();
      },
    );

    then('User should see a message with "Error:"', () => {
      errorMessage = PokemonsListReactWrapper.findWhere(
        (node) => node.is(PText) && node.prop('testID') === 'error-message',
      );
      expect(errorMessage.exists()).toBe(true);
      expect(errorMessage.text()).toContain('Error:');
    });

    then('User should see "Unknown error" message for an unknown error', () => {
      expect(errorMessage.text()).toContain('Unknown error');
    });
  });

  /**
   * Test Pokemon List Page infinite scroll feature
   */
  test('Scrolling down to load more Pokemons in Pokemon List Page', async ({
    given,
    when,
    then,
  }) => {
    given('User is on the Pokemon List Page', async () => {
      getPokemonsListService.mockResolvedValue(
        mockPokemonResponse(mockPokemonList(20), 20),
      );
      getPokemonDetailsService.mockImplementation(mockPokemonListUnique);

      PokemonsListReactWrapper = mount(<PokemonsListView {...props} />);

      // Bypass the loading state
      await act(async () => {
        PokemonsListReactWrapper.update();
      });
    });

    when('the first list of pokemons are loaded', async () => {
      PokemonsListReactWrapper.update();
    });

    let pokemonList: ReactWrapper;
    let pokemonItems: ReactWrapper;

    then('User should see 20 pokemons loaded initially', () => {
      pokemonList = PokemonsListReactWrapper.findWhere(
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

    when('User scrolls down quickly to the end of the list', async () => {
      const onEndReached = pokemonList.prop('onEndReached') as () => void;
      onEndReached();
      PokemonsListReactWrapper.update();
    });

    then('User should see a loading indicator at the end of the list', () => {
      const footerLoader = PokemonsListReactWrapper.find(
        '[testID="load-more-indicator"]',
      );
      expect(footerLoader.exists()).toBe(true);
    });

    when('more pokemons have successfully loaded', async () => {
      PokemonsListReactWrapper.update();
    });

    then('User should see more Pokemons loaded', () => {
      pokemonItems = PokemonsListReactWrapper.findWhere(
        (node) =>
          node.prop('testID') && node.prop('testID').includes('pokemon-card'),
      );
      expect(pokemonItems.length).toBeGreaterThan(20);
      expect(pokemonItems.length).toEqual(40);
    });

    when(
      'there are no more pokemons to load after scrolling again',
      async () => {
        const onEndReached = pokemonList.prop('onEndReached') as () => void;
        onEndReached();

        await act(async () => {
          PokemonsListReactWrapper.update();
        });
      },
    );

    then(
      'User should not see a loading indicator at the end of the list',
      () => {
        PokemonsListReactWrapper.update();

        const footerLoader = PokemonsListReactWrapper.find(
          '[testID="load-more-indicator"]',
        );
        expect(footerLoader.exists()).toBe(false);
        expect(pokemonItems.length).toEqual(40);
      },
    );
  });

  /**
   * Test Pokemon List Page search feature
   */
  test('Searching for Pokemons in Pokemon List Page', async ({
    given,
    when,
    then,
  }) => {
    given('User is on the Pokemon List Page', async () => {
      getPokemonsListService.mockResolvedValue(
        mockPokemonResponse(mockPokemonList(20), 20),
      );
      getPokemonDetailsService.mockImplementation(mockPokemonListUnique);

      PokemonsListReactWrapper = mount(<PokemonsListView {...props} />);

      // Bypass the loading state
      await act(async () => {
        PokemonsListReactWrapper.update();
      });
    });

    when('the first list of pokemons are loaded', async () => {
      PokemonsListReactWrapper.update();
    });

    let pokemonList: ReactWrapper;
    let pokemonItems: ReactWrapper;

    then('User should see 20 pokemons loaded initially', () => {
      pokemonList = PokemonsListReactWrapper.findWhere(
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

    let searchKeyword = 'mon-5';

    when("User type part of a Pokemon's name in the search input", async () => {
      const searchBar = PokemonsListReactWrapper.findWhere(
        (node) => node.is(TextInput) && node.prop('testID') === 'search-bar',
      );

      searchBar.props().onChangeText(searchKeyword);

      await act(async () => {
        // Fast-forward debounce timer
        jest.advanceTimersByTime(500);
        PokemonsListReactWrapper.update();
      });
    });

    then('User should see a list of Pokemons found by the name', () => {
      const foundPokemons = PokemonsListReactWrapper.findWhere(
        (node) => node.is(PText) && node.prop('testID') === 'pokemon-name',
      );

      // Check if all found Pokemon names include the searched keyword
      foundPokemons.every((node) => {
        expect(node.text().toLowerCase()).toContain(searchKeyword);
      });
    });

    when(
      'User search for unavailable Pokemon in the search input',
      async () => {
        const searchBar = PokemonsListReactWrapper.findWhere(
          (node) => node.is(TextInput) && node.prop('testID') === 'search-bar',
        );

        searchBar.props().onChangeText('xxxxx');

        await act(async () => {
          // Fast-forward debounce timer
          jest.advanceTimersByTime(500);
          PokemonsListReactWrapper.update();
        });
      },
    );

    then('User should see "No Pokemon is found" message', async () => {
      PokemonsListReactWrapper.update();

      const emptyMessage = PokemonsListReactWrapper.find(
        '[testID="empty-view"]',
      );
      expect(emptyMessage.exists()).toBe(true);
      expect(emptyMessage.text()).toBe('No Pokemon is found');
    });
  });

  /**
   * Test navigating to a Pokemon's Details Page from Pokemon List Page
   */
  test("Navigate to a Pokemon's Details page from the Pokemon List Page", async ({
    given,
    when,
    then,
  }) => {
    given('User is on the Pokemon List Page', async () => {
      getPokemonsListService.mockResolvedValue(
        mockPokemonResponse(mockPokemonList(20), 20),
      );
      getPokemonDetailsService.mockImplementation(mockPokemonListUnique);

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
      'User presses on a Pokemon item with the name "pokemon-5"',
      async () => {
        PokemonsListReactWrapper.update();

        const pokemonItem = PokemonsListReactWrapper.findWhere(
          (node) => node.prop('testID') === 'pokemon-card_5',
        ).first();

        const onPress = pokemonItem.prop('onPress');
        onPress();

        PokemonsListReactWrapper.update();
      },
    );

    then('User should navigate to the Pokemon details page', () => {
      expect(props.navigation.push).toHaveBeenCalledWith('Details', {
        pokemon: expect.objectContaining({
          name: 'pokemon-5',
        }),
      });
    });
  });

  /**
   * Test when Pokemon List Page successfully loaded the data but with one error
   */
  test('Pokemon List Page successfully loaded data but with one error', async ({
    given,
    when,
    then,
  }) => {
    given('User is on the Pokemon List Page', async () => {
      getPokemonsListService.mockResolvedValue(
        mockPokemonResponse(mockPokemonList(20), 20),
      );

      // Simulate failure for Pokemon with ID 10
      getPokemonDetailsService.mockImplementation((url) =>
        mockPokemonListUnique(url, url.includes('/10/')),
      );

      PokemonsListReactWrapper = mount(<PokemonsListView {...props} />);

      // Bypass the loading state
      await act(async () => {
        PokemonsListReactWrapper.update();
      });
    });

    when('the pokemons are loaded except one', async () => {
      PokemonsListReactWrapper.update();
    });

    let pokemonList: ReactWrapper;
    let pokemonItems: ReactWrapper;

    then('User should see 19 pokemons loaded successfully', () => {
      pokemonList = PokemonsListReactWrapper.findWhere(
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
      expect(pokemonItems.length).toEqual(19);
    });
  });

  /**
   * Unit test Pokemon List Page when there is no more pages to load
   */
  test('Render Pokemon List Page with no more pages to load', ({
    given,
    when,
    then,
  }) => {
    given(
      'User has scrolled through all available pokemon and no more pages are available',
      async () => {
        getPokemonsListService.mockResolvedValue(
          mockPokemonResponse(mockPokemonList(40), 40, false),
        );
        getPokemonDetailsService.mockImplementation(mockPokemonListUnique);

        PokemonsListReactWrapper = mount(<PokemonsListView {...props} />);
        instance = PokemonsListReactWrapper.instance() as PokemonsListView;

        PokemonsListReactWrapper.setState({ offset: 20 });
      },
    );

    when('User attempts to load more pokemon', async () => {
      await act(async () => {
        instance.fetchPokemons();
      });

      PokemonsListReactWrapper.update();
    });

    then(
      'No additional pokemon should be fetched and loading should not continue',
      () => {
        state = PokemonsListReactWrapper.state() as PokemonsListState;

        expect(state.pokemons.length).toBe(40);
        expect(state.isLoading).toBe(false);
      },
    );
  });
});
