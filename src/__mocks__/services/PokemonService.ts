const mockGetPokemonsList = jest.fn();
const mockGetPokemonDetails = jest.fn();

const PokemonService = {
  getPokemonsList: mockGetPokemonsList,
  getPokemonDetails: mockGetPokemonDetails,
};

export default PokemonService;
