import { shallow, ShallowWrapper } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import PokemonDetailsView from '../../PokemonDetailsView';
import { mockPokemonData } from '../../../../__mocks__/data';

const props = {
  navigation: {
    navigate: jest.fn(),
  } as any,
  route: {
    params: {
      pokemon: mockPokemonData,
    },
  } as any,
};

const feature = loadFeature(
  './src/pages/PokemonDetails/__tests__/features/PokemonDetailsView.feature',
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('Render Pokemon Details', ({ given, when, then }) => {
    let PokemonDetailsViewWrapper: ShallowWrapper;
    let instance: PokemonDetailsView;

    given('I am on the Pokemon Details Page', () => {
      PokemonDetailsViewWrapper = shallow(<PokemonDetailsView {...props} />);
    });

    when('I successfully load Pokemon Details Page', async () => {
      instance = PokemonDetailsViewWrapper.instance() as PokemonDetailsView;
    });

    then('I should see the details of a Pokemon', () => {
      const pokemonDetails = PokemonDetailsViewWrapper.find(
        '[testID="pokemon-details"]',
      );

      expect(pokemonDetails).toBeDefined();
    });
  });
});
