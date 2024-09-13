import { shallow, ShallowWrapper } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { SafeAreaView } from 'react-native-safe-area-context';
import IPokemon from '../../../../interfaces/IPokemon';
import PokemonServices from '../../../../services/PokemonServices';
import PokemonDetailPage from '../../PokemonDetailPage';
import { testData } from './testData';

const props = {
  navigation: {
    navigate: jest.fn(),
  } as any,
  route: {
    params: { id: 1 },
  } as any,
};

const feature = loadFeature(
  './src/pages/PokemonDetailPage/__tests__/features/PokemonDetailPage.feature'
);

const runAllPromises = () => new Promise(setImmediate);

let mockGetPokemonDetailSpy: jest.SpyInstance<
  Promise<IPokemon>,
  [pokemonId: string | number]
>;

const mockGetPokemonDetail = jest.fn().mockResolvedValue(testData);
jest.mock('@expo/vector-icons/Ionicons', () => 'Icon');
defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    mockGetPokemonDetailSpy = jest
      .spyOn(PokemonServices, 'getPokemonDetail')
      .mockImplementation(mockGetPokemonDetail);
  });

  afterEach(() => {
    mockGetPokemonDetail.mockClear();
  });

  test('Render Pokemon Detail', ({ given, when, then }) => {
    let PokemonDetailPageWrapper: ShallowWrapper;
    let instance: PokemonDetailPage;

    given('I am on the PokemonDetail Page', () => {
      PokemonDetailPageWrapper = shallow(<PokemonDetailPage {...props} />);
    });

    when('I successfully load PokemonDetail Page', async () => {
      instance = PokemonDetailPageWrapper.instance() as PokemonDetailPage;
      await runAllPromises();
    });

    then('App should start to fetch pokemon detail data', () => {
      expect(mockGetPokemonDetail).toHaveBeenCalledWith(props.route.params.id);
      expect(mockGetPokemonDetail).not.toHaveBeenCalledWith('2');
      expect(mockGetPokemonDetail).toHaveBeenCalledTimes(1);
    });

    then('I should see the pokemon detail', () => {
      expect(
        PokemonDetailPageWrapper.find(SafeAreaView)
          .find('[data-test-id="pokemon_name"]')
          ?.text()
      ).toBe('');
    });
  });
});
