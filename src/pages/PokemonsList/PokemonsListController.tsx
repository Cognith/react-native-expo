import { Component } from 'react';
import { Navigation, PokemonData } from '../../types';
import PokemonService from '../../services/PokemonService';
import { debounce } from '../../utils/debounce';

// Props
interface Props extends Navigation<'Home'> {}

// State
export interface PokemonsListState {
  pokemons: PokemonData[];
  limit: number;
  offset: number;
  isLoading: boolean;
  error: null | string;
  next: string | null; // Determine if more data is available
  search: string; // Stores the current input value
  debouncedSearch: string; // Stores the debounced value
}

export default class PokemonsListController extends Component<
  Props,
  PokemonsListState
> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pokemons: [],
      limit: 20,
      offset: 0,
      isLoading: true,
      error: null,
      next: null,
      search: '',
      debouncedSearch: '',
    };
  }

  // Debounced search handler
  debounceSearch = debounce((text: string) => {
    this.setState({ debouncedSearch: text });
  }, 500);

  componentDidMount = async () => {
    this.fetchPokemons();
  };

  // Fetch list of Pokemons
  fetchPokemons = async () => {
    const { limit, offset, next } = this.state;

    // Stop fetching if next is null (no more pages to load)
    if (next === null && offset !== 0) return;

    try {
      this.setState({ isLoading: true });

      const pokemonsList = await PokemonService.getPokemonsList(limit, offset);

      // Fetch details for each Pokemon
      const pokemonsListWithDetails = await Promise.allSettled(
        pokemonsList.results.map(async (pokemon) => {
          try {
            return PokemonService.getPokemonDetails(pokemon.url);
          } catch (error) {
            return null;
          }
        }),
      );

      // Filter out failed data. Get the successfully fetched data only.
      const successfulPokemonData = pokemonsListWithDetails
        .filter(
          (result): result is PromiseFulfilledResult<PokemonData> =>
            result.status === 'fulfilled' && result.value !== null,
        )
        .map((result) => result.value);

      this.setState((prevState) => ({
        pokemons: [...prevState.pokemons, ...successfulPokemonData],
        offset: prevState.offset + limit,
        next: pokemonsList.next,
        isLoading: false,
      }));
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
    }
  };

  fetchMorePokemon = () => {
    if (!this.state.isLoading && this.state.next !== null) {
      this.fetchPokemons();
    }
  };

  handleSearch = (text: string) => {
    this.setState({ search: text });
    this.debounceSearch(text); // Call the debounced search function
  };

  filteredPokemonList = () => {
    const { debouncedSearch, pokemons } = this.state;

    if (debouncedSearch === '') return pokemons;

    return pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        pokemon.id.toString().includes(debouncedSearch),
    );
  };
}
