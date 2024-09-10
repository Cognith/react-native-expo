import { Component } from 'react';
import { Navigation, PokemonData } from '../../types';
import PokemonService from '../../services/PokemonService';
import { debounce } from '../../utils/debounce';

// Props
interface Props extends Navigation<'Home'> {}

// State
interface State {
  pokemons: PokemonData[];
  limit: number;
  offset: number;
  isLoading: boolean;
  error: null | string;
  search: string;
  next: string | null; // Determine if more data is available
}

export default class PokemonsListController extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      pokemons: [],
      limit: 20,
      offset: 0,
      isLoading: false,
      error: null,
      search: '',
      next: null,
    };

    this.debounceSearch = debounce(this.handleSearch, 300);
  }

  // Debounced search handler
  debounceSearch: (text: string) => void;

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
      const pokemonsListWithDetails = await Promise.all(
        pokemonsList.results.map(async (pokemon) => {
          try {
            return PokemonService.getPokemonDetails(pokemon.url);
          } catch (error) {
            return null;
          }
        }),
      );

      // Filter out failed data.
      const filteredPokemons = pokemonsListWithDetails.filter(
        (pokemon): pokemon is PokemonData => pokemon !== null,
      );

      this.setState((prevState) => ({
        pokemons: [...prevState.pokemons, ...filteredPokemons],
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
  };

  filteredPokemonList = () => {
    const { search, pokemons } = this.state;

    return pokemons.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
        pokemon.id.toString().includes(search),
    );
  };
}
