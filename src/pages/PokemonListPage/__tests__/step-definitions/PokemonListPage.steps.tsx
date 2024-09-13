import { shallow, ShallowWrapper } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { FlatList } from 'react-native';
import IPokemon from '../../../../interfaces/IPokemon';
import ApiResponsePagination from '../../../../interfaces/api/ApiResponse';
import { IPokemonResponse } from '../../../../interfaces/services/pokemonServices';
import PokemonServices from '../../../../services/PokemonServices';
import PokemonListPage from '../../PokemonListPage';
import SearchPokemonInput from '../../components/SearchPokemonInput';
import { getPokemonDetailTestData, getPokemonsTestData } from './testData';

const props = {
  navigation: {
    navigate: jest.fn(),
  } as any,
};

const feature = loadFeature(
  './src/pages/PokemonListPage/__tests__/features/PokemonListPage.feature'
);

const runAllPromises = () => new Promise(setImmediate);

let mockGetPokemonsSpy: jest.SpyInstance<
  Promise<ApiResponsePagination<IPokemonResponse[]>>,
  [offset?: number | undefined, limit?: number | undefined]
>;

let mockGetPokemonDetailSpy: jest.SpyInstance<
  Promise<IPokemon>,
  [pokemonId: string | number]
>;

const mockGetPokemons = jest.fn().mockResolvedValue(getPokemonsTestData);
const mockGetPokemonDetail = jest
  .fn()
  .mockResolvedValue(getPokemonDetailTestData);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();

    mockGetPokemonsSpy = jest
      .spyOn(PokemonServices, 'getPokemons')
      .mockImplementation(mockGetPokemons);

    mockGetPokemonDetailSpy = jest
      .spyOn(PokemonServices, 'getPokemonDetail')
      .mockImplementation(mockGetPokemonDetail);
  });

  afterEach(() => {
    mockGetPokemons.mockClear();
    mockGetPokemonDetail.mockClear();
  });

  test('Render Pokemon List', ({ given, when, then }) => {
    let PokemonListPageWrapper: ShallowWrapper;
    let instance: PokemonListPage;

    given('I am on the PokemonList Page', () => {
      PokemonListPageWrapper = shallow(<PokemonListPage {...props} />);
    });

    when('I successfully load PokemonList Page', () => {
      instance = PokemonListPageWrapper.instance() as PokemonListPage;
    });

    then('I should see search Input', () => {
      const searchInput = PokemonListPageWrapper.find(SearchPokemonInput);

      expect(searchInput).toBeDefined();
    });

    then('App should start to fetch pokemon data', () => {
      expect(mockGetPokemons).toHaveBeenCalledTimes(1);
      expect(mockGetPokemonDetail).toHaveBeenCalledTimes(
        getPokemonsTestData.results.length
      );
    });

    then('I should see the list of pokemon', async () => {
      await runAllPromises();
      expect(instance.state.pokemons).toHaveLength(
        getPokemonsTestData.results.length
      );
    });
  });

  test('Pokemon List infinite scroll', ({ given, when, then }) => {
    let PokemonListPageWrapper: ShallowWrapper;
    let instance: PokemonListPage;

    given('I am on the PokemonListPage with pokemon list loaded', async () => {
      PokemonListPageWrapper = shallow(<PokemonListPage {...props} />);
      instance = PokemonListPageWrapper.instance() as PokemonListPage;
      await runAllPromises();
    });

    when('I scroll down', async () => {
      PokemonListPageWrapper.find(FlatList)
        .props()
        .onEndReached?.({ distanceFromEnd: 0 });
      await runAllPromises();
    });

    then('it should load more pokemon', () => {
      expect(mockGetPokemons).toHaveBeenCalledTimes(2);
      instance = PokemonListPageWrapper.instance() as PokemonListPage;
    });

    then(
      'I should see it the more pokemon is loaded on the screen',
      async () => {
        await runAllPromises();
        expect(instance.state.pokemons).toHaveLength(
          getPokemonsTestData.results.length * 2
        );
      }
    );
  });

  test('Search Pokemon List', ({ given, when, then }) => {
    let PokemonListPageWrapper: ShallowWrapper;
    let instance: PokemonListPage;

    given('I am on the PokemonListPage with pokemon list', async () => {
      PokemonListPageWrapper = shallow(<PokemonListPage {...props} />);
      instance = PokemonListPageWrapper.instance() as PokemonListPage;
      await runAllPromises();
    });

    when('I search Pokemon by name', async () => {
      instance.searchPokemon(getPokemonDetailTestData.name);
      PokemonListPageWrapper.update();
    });

    then(
      'I should only see the pokemon that contains the keyword in the search Input',
      () => {
        expect(instance.state.filteredPokemons.length).toBeGreaterThan(0);
      }
    );
  });
});
