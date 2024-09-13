import React from 'react';
import { shallow } from 'enzyme';
import HomeController from '../../ComponentController';


global.fetch = jest.fn() as jest.Mock;

interface Props {}
interface State {}

class TestController extends HomeController<Props> {
  render() {
    return <div>Test Component</div>;
  }
}

describe('HomeController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with the correct state', () => {
    const wrapper = shallow(<TestController />);

    expect(wrapper.state()).toEqual({
      pokemonList: [],
      filteredPokemonList: [],
      loading: true,
      loadingMore: false,
      offset: 0,
      searchQuery: '',
    });
  });

  it('should fetch pokemon data correctly', async () => {
    const mockData = {
      results: [{ url: 'https://pokeapi.co/api/v2/pokemon/1/' }, { url: 'https://pokeapi.co/api/v2/pokemon/2/' }],
    };

    const mockPokemonDetails = [
      { id: 1, sprites: { front_default: 'http://example.com/image1.png' } },
      { id: 2, sprites: { front_default: 'http://example.com/image2.png' } },
    ];

    (global.fetch as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(mockData) })) // Mock the first fetch call
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(mockPokemonDetails[0]) })) // Mock the details fetch call
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(mockPokemonDetails[1]) })); // Mock the second details fetch call

    const wrapper = shallow(<TestController />);
    const instance = wrapper.instance() as TestController;
    const setStateSpy = jest.spyOn(instance, 'setState');

    await instance.fetchPokemonData(0);

    expect(setStateSpy).toHaveBeenCalledWith(expect.objectContaining({
      pokemonList: expect.arrayContaining([
        expect.objectContaining({ id: 1, name: 'pokemon-1' }), // Adjust according to your implementation
        expect.objectContaining({ id: 2, name: 'pokemon-2' }) // Adjust according to your implementation
      ]),
      filteredPokemonList: expect.arrayContaining([
        expect.objectContaining({ id: 1, name: 'pokemon-1' }), // Adjust according to your implementation
        expect.objectContaining({ id: 2, name: 'pokemon-2' }) // Adjust according to your implementation
      ]),
      loading: false,
      loadingMore: false,
    }));
  });

  it('should handle load more correctly', async () => {
    const mockData = {
      results: [{ url: 'https://pokeapi.co/api/v2/pokemon/3/' }],
    };

    const mockPokemonDetails = [
      { id: 3, sprites: { front_default: 'http://example.com/image3.png' } },
    ];

    (global.fetch as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(mockData) })) // Mock the fetch call
      .mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(mockPokemonDetails[0]) })); // Mock the details fetch call

    const wrapper = shallow(<TestController />);
    const instance = wrapper.instance() as TestController;
    const setStateSpy = jest.spyOn(instance, 'setState');

    await instance.fetchPokemonData(0); // Initial fetch
    instance.handleLoadMore();

    expect(setStateSpy).toHaveBeenCalledWith(expect.objectContaining({ offset: 20 }));
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('should handle search correctly', () => {
    const pokemonList = [
      { id: 1, name: 'Pikachu', imageUrl: 'http://example.com/image1.png', url: 'http://example.com/pikachu' },
      { id: 2, name: 'Bulbasaur', imageUrl: 'http://example.com/image2.png', url: 'http://example.com/bulbasaur' },
    ];

    const wrapper = shallow(<TestController />);
    const instance = wrapper.instance() as TestController;
    const setStateSpy = jest.spyOn(instance, 'setState');

    // Set initial state
    instance.setState({ pokemonList });

    instance.handleSearch('Pikachu');

    expect(setStateSpy).toHaveBeenCalledWith(expect.objectContaining({
      filteredPokemonList: expect.arrayContaining([
        expect.objectContaining({ name: 'Pikachu' })
      ])
    }));
  });
});
