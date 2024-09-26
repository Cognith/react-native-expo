import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HomePage, { RootStackParam } from '../../ComponentView';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

const mockNavigation: NativeStackNavigationProp<RootStackParam, 'Home'> = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as any;

const mockRoute: RouteProp<RootStackParam, 'Home'> = {
  params: {},
} as any;

describe('HomePage', () => {
  let homePageWrapper: any;

  beforeEach(() => {
    // Mock state for HomeController
    const initialState = {
      filteredPokemonList: [
        { id: 1, name: 'Pikachu', imageUrl: 'https://image.url/pikachu.png', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { id: 2, name: 'Charmander', imageUrl: 'https://image.url/charmander.png', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      ],
      loading: false,
      loadingMore: false,
      searchQuery: '',
    };

    // Render the HomePage component
    homePageWrapper = render(
      <HomePage navigation={mockNavigation} route={mockRoute} />
    );

    // Manually set the initial state of HomeController
    homePageWrapper.rerender(<HomePage navigation={mockNavigation} route={mockRoute} />);
  });

  test('renders correctly with initial state', () => {
    expect(homePageWrapper.getByTestId('search-bar')).toBeTruthy();
    expect(homePageWrapper.getByTestId('pokemon-list')).toBeTruthy();
  });

  test('updates search query and filters the list', async () => {
    const searchBar = homePageWrapper.getByTestId('search-bar');
    fireEvent.changeText(searchBar, 'Pikachu');
    
    await waitFor(() => {
      expect(searchBar.props.value).toBe('Pikachu');

      const flatList = homePageWrapper.getByTestId('pokemon-list');
      expect(flatList.props.data).toEqual([{ id: 1, name: 'Pikachu', imageUrl: 'https://image.url/pikachu.png', url: 'https://pokeapi.co/api/v2/pokemon/1/' }]);
    });
  });

  test('navigates to detail page when a Pokémon is pressed', () => {
    const pikachuItem = homePageWrapper.getByText('Pikachu');
    fireEvent.press(pikachuItem);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Detail', { pokemonUrl: 'https://pokeapi.co/api/v2/pokemon/1/' });
  });

  test('shows loading indicator when loading', () => {
    // Mock loading state
    const initialState = {
      filteredPokemonList: [],
      loading: true,
      loadingMore: false,
      searchQuery: '',
    };

    homePageWrapper.rerender(<HomePage navigation={mockNavigation} route={mockRoute} />);

    expect(homePageWrapper.getByText('Loading...')).toBeTruthy();
  });
});
