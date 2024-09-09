import { Component } from 'react';
import { Navigation, PokemonData } from '../../types';
import PokemonService from '../../services/PokemonService';

// Props
interface Props {
  navigation: Navigation['navigation'];
}

// State
interface State {
  pokemons: PokemonData[];
  limit: number;
  offset: number;
  isLoading: boolean;
  error: null | string;
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
    };
  }

  componentDidMount = async () => {
    this.fetchPokemons();
  };

  // Fetch list of Pokemons
  fetchPokemons = async () => {
    const { limit, offset } = this.state;

    try {
      this.setState({ isLoading: true });

      const pokemonsList = await PokemonService.getPokemonsList(limit, offset);

      // Fetch details for each Pokemon
      const pokemonsListWithDetails = await Promise.all(
        pokemonsList.results.map((pokemon) =>
          PokemonService.getPokemonDetails(pokemon.url),
        ),
      );

      this.setState((prevState) => ({
        pokemons: [...prevState.pokemons, ...pokemonsListWithDetails],
        offset: prevState.offset + limit,
        isLoading: false,
      }));
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false,
      });
    }
  };
}
