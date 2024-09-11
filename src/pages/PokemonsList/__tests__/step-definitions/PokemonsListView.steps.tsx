import { shallow, ShallowWrapper } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import PokemonsListView from '../../PokemonsListView';

jest.mock('../../../../services/PokemonService', () => ({
  getPokemonsList: jest.fn().mockResolvedValue({
    results: [{ url: 'https://pokeapi.co/api/v2/pokemon/1' }],
    next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  }),
  getPokemonDetails: jest.fn().mockResolvedValue({
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
  }),
}));

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
  let PokemonsListViewWrapper: ShallowWrapper;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('User navigating to Pokemon List Page', ({ given, when, then }) => {
    let instance: PokemonsListView;

    given('User on the Pokémon List page', () => {
      PokemonsListViewWrapper = shallow(<PokemonsListView {...props} />);
    });

    when('User fully loaded the Pokémon List page', async () => {
      instance = PokemonsListViewWrapper.instance() as PokemonsListView;
      await instance.componentDidMount();
      PokemonsListViewWrapper.update();
    });

    then('User should see list page', () => {
      const listPage = PokemonsListViewWrapper.find(
        '[data-test-id="list-page"]',
      );
      expect(listPage.exists()).toBe(true);
    });

    then('User should see loading', () => {
      const loader = PokemonsListViewWrapper.find(
        '[data-test-id="loading-indicator"]',
      );
      expect(loader.exists()).toBe(true);
    });
  });
});
