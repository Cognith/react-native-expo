import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SafeAreaView } from 'react-native';
import { defineFeature, loadFeature } from 'jest-cucumber';
import HomePage, { RootStackParam } from '../../ComponentView';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

const feature = loadFeature('./__tests__/features/HomePage.feature');

defineFeature(feature, (test) => {
  let HomePageWrapper: any;

  const mockNavigation: NativeStackNavigationProp<RootStackParam, 'Home'> = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  } as any;

  const mockRoute: RouteProp<RootStackParam, 'Home'> = {
    params: {
      searchQuery: '',
      filteredPokemonList: [{ id: 1, name: 'Pikachu', imageUrl: 'https://image.url', url: 'https://url' }]
    }
  } as any;

  beforeEach(() => {
    HomePageWrapper = render(
      <SafeAreaView>
        <HomePage navigation={mockNavigation} route={mockRoute} />
      </SafeAreaView>
    );
  });

  test('User interacts with the search bar and the list updates accordingly', ({ given, when, then }) => {
    given('I am on the Home Page', () => {
      expect(HomePageWrapper.getByTestId('home-component')).toBeTruthy();
    });

    when('I change the search query to "Pikachu"', () => {
      const searchBar = HomePageWrapper.getByTestId('search-bar');
      fireEvent.changeText(searchBar, 'Pikachu');
      HomePageWrapper.update();
    });

    then('The search query should be updated and the list should reflect the search results', () => {
      const searchBarValue = HomePageWrapper.getByTestId('search-bar').props.value;
      expect(searchBarValue).toBe('Pikachu');

      const flatList = HomePageWrapper.getByTestId('pokemon-list');
      expect(flatList.props.data).toEqual([{ id: 1, name: 'Pikachu', imageUrl: 'https://image.url', url: 'https://url' }]);
    });
  });
});
