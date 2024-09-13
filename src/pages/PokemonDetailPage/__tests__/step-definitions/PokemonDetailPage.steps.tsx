import { mount, ReactWrapper } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { Linking } from 'react-native';
import IPokemon from '../../../../interfaces/IPokemon';
import { testData } from '../../../../services/mockData';
import PokemonServices from '../../../../services/PokemonServices';
import PokemonDetailPage from '../../PokemonDetailPage';

jest.mock('@expo/vector-icons/Ionicons', () => () => <></>);

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
// jest.mock('@expo/vector-icons/Ionicons', () => 'Icon');

const mockGetPokemonDetail = jest.fn((id) => Promise.resolve(testData(id)));

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
    mockGetPokemonDetailSpy = jest
      .spyOn(PokemonServices, 'getPokemonDetail')
      .mockImplementation(mockGetPokemonDetail);
  });

  afterEach(() => {
    mockGetPokemonDetail.mockClear();
    jest.clearAllMocks();
  });

  test('Render Pokemon Detail', ({ given, when, then }) => {
    let PokemonDetailPageWrapper: ReactWrapper;
    let instance: PokemonDetailPage;

    given('I am on the PokemonDetail Page', () => {
      PokemonDetailPageWrapper = mount(<PokemonDetailPage {...props} />);
    });

    when('I successfully load PokemonDetail Page', async () => {
      instance = PokemonDetailPageWrapper.instance() as PokemonDetailPage;
      await runAllPromises();
    });

    then('App should start to fetch pokemon detail data', () => {
      expect(mockGetPokemonDetail).toHaveBeenCalledWith(props.route.params.id);
      expect(mockGetPokemonDetail).not.toHaveBeenCalledWith('2');
      expect(mockGetPokemonDetail).toHaveBeenCalledTimes(1);
      PokemonDetailPageWrapper.update();
    });

    then('I should see the pokemon detail', () => {
      // console.log(PokemonDetailPageWrapper.debug());
      const pokemonName = PokemonDetailPageWrapper.findWhere(
        (node) => node.prop('testID') === 'pokemon_name'
      ).text();
      expect(pokemonName).toBe('Charmander');
    });
  });

  test('Should Go to url on press generation with link icon', ({
    given,
    when,
    then,
  }) => {
    let PokemonDetailPageWrapper: ReactWrapper;
    let instance: PokemonDetailPage;
    const mockOpenUrl = jest.fn();
    jest.spyOn(Linking, 'openURL').mockImplementation(mockOpenUrl);
    const url = testData(1).generationUrl;

    given(
      'I am on the PokemonDetail Page with pokemon detail loaded and generation url link exist',
      async () => {
        PokemonDetailPageWrapper = mount(<PokemonDetailPage {...props} />);
        instance = PokemonDetailPageWrapper.instance() as PokemonDetailPage;
        await runAllPromises();
      }
    );

    when('press on link icon', async () => {
      await instance.goToLink(url)();
      await runAllPromises();
    });

    then('should go to url', () => {
      expect(mockOpenUrl).toHaveBeenCalledWith(url);
    });
  });
});
