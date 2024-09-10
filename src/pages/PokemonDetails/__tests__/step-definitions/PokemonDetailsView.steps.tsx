import { shallow, ShallowWrapper } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import PokemonDetailsView from '../../PokemonDetailsView';
import { PokemonData } from '../../../../types';

// Mocking PokemonData
const mockPokemonData: PokemonData = {
  id: '0001',
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  stats: [
    {
      key: 'hp',
      value: 45,
    },
    {
      key: 'attack',
      value: 49,
    },
    {
      key: 'defense',
      value: 49,
    },
    {
      key: 'special-attack',
      value: 65,
    },
    {
      key: 'special-defense',
      value: 65,
    },
    {
      key: 'speed',
      value: 45,
    },
  ],
  abilities: ['overgrow', 'chlorophyll'],
  types: ['grass', 'poison'],
};

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
      const helloWorldText = PokemonDetailsViewWrapper.find(
        '[data-test-id="pokemon-details"]',
      );

      expect(helloWorldText).toBeDefined();
    });
  });
});
