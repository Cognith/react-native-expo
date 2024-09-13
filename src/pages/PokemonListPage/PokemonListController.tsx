import { Component } from 'react';
import IPokemon from '../../interfaces/IPokemon';
import PokemonServices from '../../services/PokemonServices';
import { Navigation } from '../../types';

interface PokemonListControllerProps {
  navigation: Navigation['navigation'];
}

interface PokemonListControllerState {
  pokemons: IPokemon[];
  filteredPokemons: IPokemon[];
  searchFilter: string;
  isLoading: boolean;
  offsets: number;
  hasNextPage: boolean;
}

export default class PokemonListController extends Component<
  PokemonListControllerProps,
  PokemonListControllerState
> {
  constructor(props: PokemonListControllerProps) {
    super(props);

    this.state = { ...this.initialState };
  }

  initialState = {
    isLoading: false,
    searchFilter: '',
    filteredPokemons: [],
    pokemons: [],
    offsets: 0,
    hasNextPage: true,
  };

  componentDidMount(): void {
    this.fetchPokemonList();
  }

  fetchPokemonList = async () => {
    if (this.state.isLoading) {
      return;
    }

    let pokemons: IPokemon[] = [];
    let offsets = this.state.offsets;
    let hasNextPage = this.state.hasNextPage;

    this.setState({
      isLoading: true,
    });

    try {
      const { results, next } = await PokemonServices.getPokemons(offsets);
      const pokemonIds: string[] = results
        .map<string>((pokemon) => {
          const match = pokemon.url.match(/\/pokemon\/(\d+)\//);
          return match?.[1] || '';
        })
        .filter((i) => !!i);

      const pokemonsPromises = pokemonIds.map((id) =>
        PokemonServices.getPokemonDetail(id)
      );
      pokemons = await Promise.all(pokemonsPromises);

      offsets += 20;
      hasNextPage = !!next;
    } catch (err) {
      console.log('error fetchPokemonList');
    } finally {
      this.setState((prev) => {
        const _pokemons = [...prev.pokemons, ...pokemons];
        return {
          isLoading: false,
          pokemons: _pokemons,
          filteredPokemons: !prev.searchFilter
            ? _pokemons
            : this.filterByPokemonName(_pokemons, prev.searchFilter),
          offsets,
          hasNextPage,
        };
      });
    }
  };

  onRefreshList = () => {
    this.setState({ ...this.initialState }, () => {
      this.fetchPokemonList();
    });
  };

  searchPokemon = (text: string) => {
    this.setState((prev) => ({
      searchFilter: text,
      filteredPokemons: [...this.filterByPokemonName(prev.pokemons, text)],
    }));
  };

  filterByPokemonName = (pokemons: IPokemon[], keyword: string) => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toUpperCase().includes(keyword.toUpperCase())
    );
  };

  goToPokemonDetailPage = (id: number) => () => {
    this.props.navigation.navigate('PokemonDetail', { id });
  };
}
