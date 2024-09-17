import { shallow, ShallowWrapper } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import PokemonDetailsView from '../../PokemonDetailsView';
import { mockPokemonData } from '../../../../__mocks__/data';
import { TouchableOpacity } from 'react-native';

const props = {
  navigation: {
    navigate: jest.fn(),
    pop: jest.fn(),
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

  test('Render Pokemon Details Page', ({ given, when, then }) => {
    let PokemonDetailsViewWrapper: ShallowWrapper;
    let instance: PokemonDetailsView;

    given('User is on the Pokemon Details Page', () => {
      PokemonDetailsViewWrapper = shallow(<PokemonDetailsView {...props} />);
    });

    when('the Pokemon Details Page is loaded', async () => {
      instance = PokemonDetailsViewWrapper.instance() as PokemonDetailsView;
    });

    then('User should see the details of a Pokemon', () => {
      const pokemonDetails = PokemonDetailsViewWrapper.find(
        '[testID="pokemon-details"]',
      );

      expect(pokemonDetails).toBeDefined();
    });

    when('User presses on the "Back" arrow button', async () => {
      const backButton = PokemonDetailsViewWrapper.findWhere(
        (node) => node.is(TouchableOpacity) && node.prop('testID') === 'back',
      );

      const onPress = backButton.prop('onPress');
      onPress();

      PokemonDetailsViewWrapper.update();
    });

    then('User should navigate back to the Pokemon List Page', () => {
      expect(props.navigation.pop).toHaveBeenCalled();
    });
  });
});
